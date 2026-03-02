import { BookOpen } from "lucide-react";
import { surahs, type Surah } from "@/data/quranData";

interface SurahListProps {
  onSelect: (surah: Surah) => void;
}

const SurahList = ({ onSelect }: SurahListProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="header-gradient px-4 py-8 text-primary-foreground text-center">
        <div className="flex justify-center mb-3">
          <div className="w-14 h-14 rounded-full bg-primary-foreground/15 flex items-center justify-center">
            <BookOpen className="w-7 h-7" />
          </div>
        </div>
        <h1 className="text-2xl font-bold font-quran mb-1">المصحف الميسّر</h1>
        <p className="text-sm opacity-80">اقرأ القرآن بيسر وسهولة</p>
      </div>

      {/* Surah list */}
      <div className="flex-1 px-4 py-4 max-w-lg mx-auto w-full">
        <div className="flex flex-col gap-2">
          {surahs.map((surah) => (
            <button
              key={surah.number}
              onClick={() => onSelect(surah)}
              className="surah-card rounded-xl px-4 py-3 flex items-center gap-4 text-right w-full"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-primary">{surah.number}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-quran text-lg font-bold text-foreground">
                  سورة {surah.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {surah.type} • {surah.versesCount} آيات
                </p>
              </div>
              <div className="text-muted-foreground/40 text-xl">❮</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SurahList;
