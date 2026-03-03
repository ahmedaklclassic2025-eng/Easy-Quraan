import { useState, useEffect } from "react";
import type { SurahInfo } from "@/lib/quranApi";
import { fetchAllSurahs } from "@/lib/quranApi";
import SurahList from "@/components/SurahList";
import QuranReader from "@/components/QuranReader";

const Index = () => {
  const [selectedSurah, setSelectedSurah] = useState<SurahInfo | null>(null);
  const [allSurahs, setAllSurahs] = useState<SurahInfo[]>([]);

  useEffect(() => {
    fetchAllSurahs().then(setAllSurahs).catch(() => {});
  }, []);

  const handleNavigateToSurah = (surahNumber: number) => {
    const surah = allSurahs.find((s) => s.number === surahNumber);
    if (surah) {
      setSelectedSurah(surah);
      window.scrollTo(0, 0);
    }
  };

  if (selectedSurah) {
    return (
      <QuranReader
        surahInfo={selectedSurah}
        allSurahs={allSurahs}
        onBack={() => setSelectedSurah(null)}
        onNavigateToSurah={handleNavigateToSurah}
      />
    );
  }

  return <SurahList onSelect={setSelectedSurah} surahs={allSurahs} />;
};

export default Index;
