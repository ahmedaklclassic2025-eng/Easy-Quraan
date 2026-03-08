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
  const [highlightAyah, setHighlightAyah] = useState<number | undefined>();

  useEffect(() => {
    fetchAllSurahs().then(setAllSurahs).catch(() => {});
  }, []);

  const handleNavigateToSurah = (surahNumber: number) => {
    const surah = allSurahs.find((s) => s.number === surahNumber);
    if (surah) {
      setHighlightAyah(undefined);
      setSelectedSurah(surah);
      window.scrollTo(0, 0);
    }
  };

  const handleNavigateToAyah = (surahNumber: number, ayahNumber: number) => {
    const surah = allSurahs.find((s) => s.number === surahNumber);
    if (surah) {
      setHighlightAyah(ayahNumber);
      setSelectedSurah(surah);
    }
  };

  if (showSearch) {
    return (
      <QuranSearch
        allSurahs={allSurahs}
        onNavigateToAyah={handleNavigateToAyah}
        onClose={() => setShowSearch(false)}
      />
    );
  }

  if (selectedSurah) {
    return (
      <QuranReader
        surahInfo={selectedSurah}
        allSurahs={allSurahs}
        onBack={() => { setSelectedSurah(null); setHighlightAyah(undefined); }}
        onNavigateToSurah={handleNavigateToSurah}
        highlightAyah={highlightAyah}
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
