import { useState } from "react";
import type { SurahInfo } from "@/lib/quranApi";
import SurahList from "@/components/SurahList";
import QuranReader from "@/components/QuranReader";

const Index = () => {
  const [selectedSurah, setSelectedSurah] = useState<SurahInfo | null>(null);

  if (selectedSurah) {
    return <QuranReader surahInfo={selectedSurah} onBack={() => setSelectedSurah(null)} />;
  }

  return <SurahList onSelect={setSelectedSurah} />;
};

export default Index;
