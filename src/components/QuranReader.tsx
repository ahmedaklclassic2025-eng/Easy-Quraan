import { useState, useEffect, useCallback, useRef } from "react";
import { Loader2, ChevronLeft } from "lucide-react";
import { fetchSurahText, fetchSurahTafsir, revelationTypeArabic, hasSajda, type SurahInfo, type AyahText } from "@/lib/quranApi";
import { toEasternArabic } from "@/lib/arabicNumerals";
import { saveReadingPosition } from "@/lib/readingPosition";
import SurahHeader from "./SurahHeader";
import TafsirPopup from "./TafsirPopup";
import AudioPlayer from "./AudioPlayer";

interface QuranReaderProps {
  surahInfo: SurahInfo;
  allSurahs: SurahInfo[];
  onBack: () => void;
  onNavigateToSurah: (surahNumber: number) => void;
  highlightAyah?: number;
}

const BASMALA = "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ";

function removeDiacritics(text: string): string {
  return text.replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7-\u06E8\u06EA-\u06ED]/g, "");
}

function stripBasmala(text: string): string {
  const plain = removeDiacritics(text);
  const match = plain.match(/^بسم\s+[ٱا]لله\s+[ٱا]لرحم[ـٰ]?ن\s+[ٱا]لرحيم\s*/);
  if (match) {
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

const QuranReader = ({ surahInfo, allSurahs, onBack, onNavigateToSurah, highlightAyah }: QuranReaderProps) => {
  const [fontSize, setFontSize] = useState(28);
  const [ayahs, setAyahs] = useState<AyahText[]>([]);
  const [tafsirMap, setTafsirMap] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAyah, setSelectedAyah] = useState<number | null>(null);
  const [activeAudioAyah, setActiveAudioAyah] = useState<number | null>(null);

  const handleZoomIn = useCallback(() => setFontSize((s) => Math.min(s + 4, 56)), []);
  const handleZoomOut = useCallback(() => setFontSize((s) => Math.max(s - 4, 16)), []);

  const nextSurah = allSurahs.find((s) => s.number === surahInfo.number + 1);

  useEffect(() => {
    saveReadingPosition({
      surahNumber: surahInfo.number,
      surahName: surahInfo.name,
      timestamp: Date.now(),
    });

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

  useEffect(() => {
    if (!loading && highlightAyah) {
      setTimeout(() => {
        const el = document.getElementById(`ayah-${highlightAyah}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 200);
    }
  }, [loading, highlightAyah]);

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
            {/* Basmala */}
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
                const displayText =
                  ayah.numberInSurah === 1 && surahInfo.number !== 1 && surahInfo.number !== 9
                    ? stripBasmala(ayah.text)
                    : ayah.text;
                const isSajda = hasSajda(ayah);
                return (
                  <span key={ayah.numberInSurah} id={`ayah-${ayah.numberInSurah}`}>
                    <span className={`${isSajda ? "sajda-text" : ""} ${ayah.numberInSurah === highlightAyah ? "bg-primary/15 rounded px-1" : ""}`}>{displayText}</span>{" "}
                    <span
                      className={`verse-marker ${isSajda ? "sajda-marker" : ""}`}
                      style={{ fontSize: fontSize * 0.7 }}
                      onClick={() => setSelectedAyah(ayah.numberInSurah)}
                      role="button"
                      tabIndex={0}
                      aria-label={`تفسير الآية ${ayah.numberInSurah}`}
                    >
                      ﴿{toEasternArabic(ayah.numberInSurah)}﴾
                    </span>
                    {isSajda && (
                      <span className="sajda-badge" style={{ fontSize: fontSize * 0.5 }}>
                        ۩ سجدة
                      </span>
                    )}
                    {" "}
                  </span>
                );
              })}
            </p>

            {/* Next Surah Separator */}
            {nextSurah && (
              <button
                onClick={() => onNavigateToSurah(nextSurah.number)}
                className="next-surah-separator group w-full mt-12 mb-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-1 h-px gold-divider" />
                  <span className="text-xs text-muted-foreground">❊</span>
                  <div className="flex-1 h-px gold-divider" />
                </div>
                <div className="flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-primary/5 border border-primary/20 transition-all duration-300 group-hover:bg-primary/10 group-hover:border-primary/40 group-active:scale-[0.98]">
                  <ChevronLeft className="w-4 h-4 text-primary transition-transform duration-300 group-hover:-translate-x-1" />
                  <span className="font-quran text-primary text-lg">
                    السورة التالية {nextSurah.name}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex-1 h-px gold-divider" />
                  <span className="text-xs text-muted-foreground">❊</span>
                  <div className="flex-1 h-px gold-divider" />
                </div>
              </button>
            )}
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
