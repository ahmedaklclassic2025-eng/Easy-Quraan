import { useState, useEffect, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { fetchSurahText, fetchSurahTafsir, revelationTypeArabic, type SurahInfo, type AyahText } from "@/lib/quranApi";
import { toEasternArabic } from "@/lib/arabicNumerals";
import SurahHeader from "./SurahHeader";
import TafsirPopup from "./TafsirPopup";

interface QuranReaderProps {
  surahInfo: SurahInfo;
  onBack: () => void;
}

const BASMALA = "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ";
function removeDiacritics(text: string): string {
  // Remove Arabic diacritics (tashkeel) - Unicode range 0610-061A, 064B-065F, 0670, 06D6-06DC, 06DF-06E4, 06E7-06E8, 06EA-06ED
  return text.replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7-\u06E8\u06EA-\u06ED]/g, "");
}

function stripBasmala(text: string): string {
  const plain = removeDiacritics(text);
  // Match "بسم الله الرحمن الرحيم" or "بسم ٱلله ٱلرحمن ٱلرحيم" without diacritics
  const match = plain.match(/^بسم\s+[ٱا]لله\s+[ٱا]لرحم[ـٰ]?ن\s+[ٱا]لرحيم\s*/);
  if (match) {
    // Find the same length in the original text
    // Count characters without diacritics to find position in original
    let plainIdx = 0;
    let origIdx = 0;
    const targetLen = match[0].length;
    while (plainIdx < targetLen && origIdx < text.length) {
      const ch = text[origIdx];
      origIdx++;
      if (!/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7-\u06E8\u06EA-\u06ED]/.test(ch)) {
        plainIdx++;
      }
    }
    return text.substring(origIdx).trim();
  }
  return text;
}

const QuranReader = ({ surahInfo, onBack }: QuranReaderProps) => {
  const [fontSize, setFontSize] = useState(28);
  const [ayahs, setAyahs] = useState<AyahText[]>([]);
  const [tafsirMap, setTafsirMap] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAyah, setSelectedAyah] = useState<number | null>(null);

  const handleZoomIn = useCallback(() => setFontSize((s) => Math.min(s + 4, 56)), []);
  const handleZoomOut = useCallback(() => setFontSize((s) => Math.max(s - 4, 16)), []);

  useEffect(() => {
    setLoading(true);
    setError(null);

    Promise.all([
      fetchSurahText(surahInfo.number),
      fetchSurahTafsir(surahInfo.number),
    ])
      .then(([textData, tafsirData]) => {
        setAyahs(textData.ayahs);
        const map: Record<number, string> = {};
        tafsirData.ayahs.forEach((a) => {
          map[a.numberInSurah] = a.text;
        });
        setTafsirMap(map);
      })
      .catch(() => setError("تعذر تحميل السورة. تحقق من اتصالك بالإنترنت."))
      .finally(() => setLoading(false));
  }, [surahInfo.number]);

  // The API already includes Basmala in the first ayah text, so no need to show it separately

  // For Al-Fatiha, first ayah IS the basmala, so we show all ayahs.
  // For other surahs, the basmala is separate, not counted as an ayah.

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SurahHeader
        name={surahInfo.name}
        revelationType={revelationTypeArabic(surahInfo.revelationType)}
        ayahCount={surahInfo.numberOfAyahs}
        onBack={onBack}
      />

      {/* Zoom controls */}
      <div className="sticky top-[68px] z-10 flex justify-center gap-3 py-2 bg-background/90 backdrop-blur-sm border-b border-border">
        <button
          onClick={handleZoomOut}
          className="w-9 h-9 rounded-full bg-secondary text-foreground flex items-center justify-center text-lg font-bold active:bg-muted transition-colors"
        >
          −
        </button>
        <span className="flex items-center text-xs text-muted-foreground min-w-[3rem] justify-center">
          {toEasternArabic(fontSize)}
        </span>
        <button
          onClick={handleZoomIn}
          className="w-9 h-9 rounded-full bg-secondary text-foreground flex items-center justify-center text-lg font-bold active:bg-muted transition-colors"
        >
          +
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 py-6 max-w-lg mx-auto w-full">
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {error && (
          <div className="text-center py-20 text-destructive">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>

            {/* Basmala: separate line for surahs other than Al-Fatiha (1) and At-Tawbah (9) */}
            {surahInfo.number !== 1 && surahInfo.number !== 9 && (
              <p
                className="font-quran quran-text-color text-center leading-loose mb-6"
                style={{ fontSize, lineHeight: 2.2 }}
              >
                {BASMALA}
              </p>
            )}

            <p
              className="font-quran quran-text-color text-justify leading-loose"
              style={{ fontSize, lineHeight: 2.2 }}
            >
              {ayahs.map((ayah) => {
                // Strip basmala from first ayah for surahs other than Al-Fatiha and At-Tawbah
                const displayText =
                  ayah.numberInSurah === 1 && surahInfo.number !== 1 && surahInfo.number !== 9
                    ? stripBasmala(ayah.text)
                    : ayah.text;
                return (
                  <span key={ayah.numberInSurah}>
                    <span>{displayText}</span>{" "}
                    <span
                      className="verse-marker"
                      style={{ fontSize: fontSize * 0.7 }}
                      onClick={() => setSelectedAyah(ayah.numberInSurah)}
                      role="button"
                      tabIndex={0}
                      aria-label={`تفسير الآية ${ayah.numberInSurah}`}
                    >
                      ﴿{toEasternArabic(ayah.numberInSurah)}﴾
                    </span>{" "}
                  </span>
                );
              })}
            </p>
          </>
        )}
      </div>

      <TafsirPopup
        verseNumber={selectedAyah}
        verseText={selectedAyah ? ayahs.find((a) => a.numberInSurah === selectedAyah)?.text || "" : ""}
        tafsirText={selectedAyah ? tafsirMap[selectedAyah] || "" : ""}
        surahName={surahInfo.name}
        onClose={() => setSelectedAyah(null)}
      />
    </div>
  );
};

export default QuranReader;
