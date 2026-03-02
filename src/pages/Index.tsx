import { useState } from "react";
import type { Surah } from "@/data/quranData";
import SurahList from "@/components/SurahList";
import QuranReader from "@/components/QuranReader";

const Index = () => {
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);

  if (selectedSurah) {
    return <QuranReader surah={selectedSurah} onBack={() => setSelectedSurah(null)} />;
  }

  return <SurahList onSelect={setSelectedSurah} />;
};

export default Index;
