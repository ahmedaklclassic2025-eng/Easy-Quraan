import { useState, useEffect } from "react";
import type { SurahInfo } from "@/lib/quranApi";
import { fetchAllSurahs } from "@/lib/quranApi";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar, SidebarMenuTrigger, type SidebarView } from "@/components/AppSidebar";
import SurahList from "@/components/SurahList";
import QuranReader from "@/components/QuranReader";
import QuranSearch from "@/components/QuranSearch";
import AdhkarPage from "@/components/AdhkarPage";
import DuaKhatmQuran from "@/components/DuaKhatmQuran";
import QuranicDuasPage from "@/components/QuranicDuasPage";
import TasbihPage from "@/components/TasbihPage";

type AppView = "home" | "reader" | "search" | SidebarView;

const Index = () => {
  const [view, setView] = useState<AppView>("home");
  const [selectedSurah, setSelectedSurah] = useState<SurahInfo | null>(null);
  const [allSurahs, setAllSurahs] = useState<SurahInfo[]>([]);
  const [highlightAyah, setHighlightAyah] = useState<number | undefined>();

  useEffect(() => {
    fetchAllSurahs().then(setAllSurahs).catch(() => {});
  }, []);

  const handleSelectSurah = (surah: SurahInfo) => {
    setHighlightAyah(undefined);
    setSelectedSurah(surah);
    setView("reader");
    window.scrollTo(0, 0);
  };

  const handleNavigateToSurah = (surahNumber: number) => {
    const surah = allSurahs.find((s) => s.number === surahNumber);
    if (surah) {
      setHighlightAyah(undefined);
      setSelectedSurah(surah);
      setView("reader");
      window.scrollTo(0, 0);
    }
  };

  const handleNavigateToAyah = (surahNumber: number, ayahNumber: number) => {
    const surah = allSurahs.find((s) => s.number === surahNumber);
    if (surah) {
      setHighlightAyah(ayahNumber);
      setSelectedSurah(surah);
      setView("reader");
    }
  };

  const goHome = () => {
    setView("home");
    setSelectedSurah(null);
    setHighlightAyah(undefined);
  };

  const handleSidebarNavigate = (sidebarView: SidebarView) => {
    setView(sidebarView);
  };

  const renderView = () => {
    switch (view) {
      case "search":
        return (
          <QuranSearch
            allSurahs={allSurahs}
            onNavigateToAyah={handleNavigateToAyah}
            onClose={() => setView("home")}
          />
        );
      case "reader":
        return selectedSurah ? (
          <QuranReader
            surahInfo={selectedSurah}
            allSurahs={allSurahs}
            onBack={goHome}
            onNavigateToSurah={handleNavigateToSurah}
            highlightAyah={highlightAyah}
          />
        ) : null;
      case "adhkar":
        return <AdhkarPage onBack={goHome} />;
      case "dua-khatm":
        return <DuaKhatmQuran onBack={goHome} />;
      case "quranic-duas":
        return <QuranicDuasPage onBack={goHome} />;
      case "tasbih":
        return <TasbihPage onBack={goHome} />;
      default:
        return (
          <SurahList
            onSelect={handleSelectSurah}
            surahs={allSurahs}
            onOpenSearch={() => setView("search")}
          />
        );
    }
  };

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen flex w-full">
        <AppSidebar onNavigate={handleSidebarNavigate} />
        <div className="flex-1 flex flex-col min-w-0">
          {renderView()}
        </div>
      </div>
      {/* Floating sidebar trigger */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors">
          <SidebarMenuTrigger />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
