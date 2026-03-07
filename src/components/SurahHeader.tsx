import { ChevronRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { toEasternArabic } from "@/lib/arabicNumerals";

interface SurahHeaderProps {
  name: string;
  revelationType: string;
  ayahCount: number;
  onBack: () => void;
}

const SurahHeader = ({ name, revelationType, ayahCount, onBack }: SurahHeaderProps) => {
  return (
    <div className="header-gradient sticky top-0 z-10 px-4 py-3 text-primary-foreground shadow-lg">
      <div className="flex items-center justify-between max-w-lg mx-auto">
        <button onClick={onBack} className="p-2 -m-2 active:opacity-70 transition-opacity">
          <ChevronRight className="w-6 h-6" />
        </button>
        <div className="text-center flex-1">
          <h1 className="text-xl font-bold font-quran">{name}</h1>
          <p className="text-xs opacity-80">{revelationType} • {toEasternArabic(ayahCount)} آيات</p>
        </div>
        <div className="w-10" />
      </div>
    </div>
  );
};

export default SurahHeader;
