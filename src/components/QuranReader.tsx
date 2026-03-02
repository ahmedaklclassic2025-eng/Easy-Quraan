import { useState, useCallback } from "react";
import type { Surah, Verse } from "@/data/quranData";
import SurahHeader from "./SurahHeader";
import TafsirPopup from "./TafsirPopup";
import { toEasternArabic } from "@/lib/arabicNumerals";

interface QuranReaderProps {
  surah: Surah;
  onBack: () => void;
}

const BASMALA = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";

const QuranReader = ({ surah, onBack }: QuranReaderProps) => {
  const [fontSize, setFontSize] = useState(28);
  const [selectedVerse, setSelectedVerse] = useState<Verse | null>(null);

  const handleZoomIn = useCallback(() => setFontSize((s) => Math.min(s + 4, 56)), []);
  const handleZoomOut = useCallback(() => setFontSize((s) => Math.max(s - 4, 16)), []);

  const showBasmala = surah.number !== 1 && surah.number !== 9;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SurahHeader surah={surah} onBack={onBack} />

      {/* Zoom controls */}
      <div className="sticky top-[68px] z-10 flex justify-center gap-3 py-2 bg-background/90 backdrop-blur-sm border-b border-border">
        <button
          onClick={handleZoomOut}
          className="w-9 h-9 rounded-full bg-secondary text-foreground flex items-center justify-center text-lg font-bold active:bg-muted transition-colors"
        >
          −
        </button>
        <span className="flex items-center text-xs text-muted-foreground min-w-[3rem] justify-center">
          {fontSize}px
        </span>
        <button
          onClick={handleZoomIn}
          className="w-9 h-9 rounded-full bg-secondary text-foreground flex items-center justify-center text-lg font-bold active:bg-muted transition-colors"
        >
          +
        </button>
      </div>

      {/* Quran text */}
      <div className="flex-1 px-5 py-6 max-w-lg mx-auto w-full">
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
          {surah.verses.map((verse) => (
            <span key={verse.number}>
              <span>{verse.text}</span>{" "}
              <span
                className="verse-marker"
                style={{ fontSize: fontSize * 0.7 }}
                onClick={() => setSelectedVerse(verse)}
                role="button"
                tabIndex={0}
                aria-label={`تفسير الآية ${verse.number}`}
              >
                ﴿{toEasternArabic(verse.number)}﴾
              </span>{" "}
            </span>
          ))}
        </p>
      </div>

      <TafsirPopup
        verse={selectedVerse}
        surahName={surah.name}
        onClose={() => setSelectedVerse(null)}
      />
    </div>
  );
};

export default QuranReader;
