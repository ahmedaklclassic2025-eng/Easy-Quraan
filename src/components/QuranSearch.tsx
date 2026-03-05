import { useState, useCallback } from "react";
import { Search, Loader2, X } from "lucide-react";
import { toEasternArabic } from "@/lib/arabicNumerals";
import type { SurahInfo } from "@/lib/quranApi";

interface SearchResult {
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  text: string;
}

interface QuranSearchProps {
  allSurahs: SurahInfo[];
  onNavigateToAyah: (surahNumber: number) => void;
  onClose: () => void;
}

const BASE_URL = "https://api.alquran.cloud/v1";

const QuranSearch = ({ allSurahs, onNavigateToAyah, onClose }: QuranSearchProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = useCallback(async () => {
    const trimmed = query.trim();
    if (!trimmed || trimmed.length < 2) return;

    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`${BASE_URL}/search/${encodeURIComponent(trimmed)}/all/quran-uthmani`);
      if (!res.ok) throw new Error("Search failed");
      const json = await res.json();
      
      if (json.code === 200 && json.data?.matches) {
        const mapped: SearchResult[] = json.data.matches.map((m: any) => {
          const surah = allSurahs.find(s => s.number === m.surah.number);
          return {
            surahNumber: m.surah.number,
            surahName: surah?.name || m.surah.name,
            ayahNumber: m.numberInSurah,
            text: m.text,
          };
        });
        setResults(mapped.slice(0, 50));
      } else {
        setResults([]);
      }
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [query, allSurahs]);

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-card">
        <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:bg-secondary">
          <X className="w-5 h-5" />
        </button>
        <div className="flex-1 flex items-center gap-2 bg-secondary rounded-xl px-3 py-2">
          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="ابحث في القرآن الكريم..."
            className="flex-1 bg-transparent outline-none text-foreground text-sm font-quran placeholder:text-muted-foreground"
            autoFocus
            dir="rtl"
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={loading || query.trim().length < 2}
          className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-bold disabled:opacity-50"
        >
          بحث
        </button>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto px-4 py-4 max-w-lg mx-auto w-full">
        {loading && (
          <div className="flex justify-center py-20">
            <Loader2 className="w-7 h-7 animate-spin text-primary" />
          </div>
        )}

        {!loading && searched && results.length === 0 && (
          <p className="text-center text-muted-foreground py-20 text-sm">لا توجد نتائج</p>
        )}

        {!loading && results.length > 0 && (
          <div className="flex flex-col gap-3">
            <p className="text-xs text-muted-foreground text-center mb-2">
              {toEasternArabic(results.length)} نتيجة
            </p>
            {results.map((r, i) => (
              <button
                key={`${r.surahNumber}-${r.ayahNumber}-${i}`}
                onClick={() => {
                  onNavigateToAyah(r.surahNumber);
                  onClose();
                }}
                className="surah-card rounded-xl px-4 py-3 text-right w-full"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                    {r.surahName}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    الآية {toEasternArabic(r.ayahNumber)}
                  </span>
                </div>
                <p className="font-quran text-foreground leading-relaxed text-sm line-clamp-2">
                  {r.text}
                </p>
              </button>
            ))}
          </div>
        )}

        {!loading && !searched && (
          <p className="text-center text-muted-foreground py-20 text-sm">
            اكتب كلمة أو عبارة للبحث في القرآن الكريم
          </p>
        )}
      </div>
    </div>
  );
};

export default QuranSearch;
