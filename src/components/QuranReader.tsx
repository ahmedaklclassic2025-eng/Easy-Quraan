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

  const showBasmala = surahInfo.number !== 1 && surahInfo.number !== 9;

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
            {showBasmala && (
              <p
                className="text-center font-quran quran-text-color mb-6"
                style={{ fontSize: fontSize - 2 }}
              >
                {BASMALA}
              </p>
            )}

            <p
              className="font-quran quran-text-color text-justify leading-loose"
              style={{ fontSize, lineHeight: 2.2 }}
            >
              {ayahs.map((ayah) => (
                <span key={ayah.numberInSurah}>
                  <span>{ayah.text}</span>{" "}
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
              ))}
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
