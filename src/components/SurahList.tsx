import { useState, useEffect } from "react";
import { BookOpen, Loader2 } from "lucide-react";
import { fetchAllSurahs, revelationTypeArabic, type SurahInfo } from "@/lib/quranApi";
import { toEasternArabic } from "@/lib/arabicNumerals";

interface SurahListProps {
  onSelect: (surah: SurahInfo) => void;
  surahs?: SurahInfo[];
}

const SurahList = ({ onSelect, surahs: propSurahs }: SurahListProps) => {
  const [surahs, setSurahs] = useState<SurahInfo[]>(propSurahs || []);
  const [loading, setLoading] = useState(!propSurahs?.length);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (propSurahs?.length) {
      setSurahs(propSurahs);
      setLoading(false);
      return;
    }
    fetchAllSurahs()
      .then(setSurahs)
      .catch(() => setError("تعذر تحميل قائمة السور. تحقق من اتصالك بالإنترنت."))
      .finally(() => setLoading(false));
  }, [propSurahs]);

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

      {/* Content */}
      <div className="flex-1 px-4 py-4 max-w-lg mx-auto w-full">
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
          <div className="flex flex-col gap-2">
            {surahs.map((surah) => (
              <button
                key={surah.number}
                onClick={() => onSelect(surah)}
                className="surah-card rounded-xl px-4 py-3 flex items-center gap-4 text-right w-full"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-primary">{toEasternArabic(surah.number)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-quran text-lg font-bold text-foreground">
                    {surah.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {revelationTypeArabic(surah.revelationType)} • {toEasternArabic(surah.numberOfAyahs)} آيات
                  </p>
                </div>
                <div className="text-muted-foreground/40 text-xl">❮</div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SurahList;
