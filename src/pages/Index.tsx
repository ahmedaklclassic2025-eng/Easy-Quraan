import { useState, useEffect } from "react";
import type { SurahInfo } from "@/lib/quranApi";
import { fetchAllSurahs } from "@/lib/quranApi";
import SurahList from "@/components/SurahList";
import QuranReader from "@/components/QuranReader";
import QuranSearch from "@/components/QuranSearch";

const Index = () => {
  const [selectedSurah, setSelectedSurah] = useState<SurahInfo | null>(null);
  const [allSurahs, setAllSurahs] = useState<SurahInfo[]>([]);
  const [showSearch, setShowSearch] = useState(false);

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

  if (showSearch) {
    return (
      <QuranSearch
        allSurahs={allSurahs}
        onNavigateToAyah={handleNavigateToSurah}
        onClose={() => setShowSearch(false)}
      />
    );
  }

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

  return (
    <SurahList
      onSelect={setSelectedSurah}
      surahs={allSurahs}
      onOpenSearch={() => setShowSearch(true)}
    />
  );
};

export default Index;
