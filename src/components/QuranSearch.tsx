import { useState, useEffect } from "react";
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
  onNavigateToAyah: (surahNumber: number, ayahNumber: number) => void;
  onClose: () => void;
}

const BASE_URL = "https://api.alquran.cloud/v1";

// Function to remove Arabic diacritics (tashkeel)
const removeDiacritics = (text: string): string => {
  return text.replace(/[\u064B-\u065F\u0670]/g, '');
};

const QuranSearch = ({ allSurahs, onNavigateToAyah, onClose }: QuranSearchProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // Debounced search effect - searches automatically as user types
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed || trimmed.length < 2) {
      setResults([]);
      setSearched(false);
      return;
    }

    setLoading(true);
    setSearched(true);

    const timeoutId = setTimeout(async () => {
      try {
        // Remove diacritics from search query for better matching
        const cleanQuery = removeDiacritics(trimmed);
        
        // Use quran-simple-clean edition which has no diacritics for better search results
        const res = await fetch(`${BASE_URL}/search/${encodeURIComponent(cleanQuery)}/all/quran-simple-clean`);
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
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(timeoutId);
  }, [query, allSurahs]);

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Header with improved spacing for safe area */}
      <div className="flex items-center gap-2 px-4 pt-6 pb-4 border-b border-border bg-card">
        <button onClick={onClose} className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:bg-secondary shrink-0">
          <X className="w-5 h-5" />
        </button>
        <div className="flex-1 flex items-center gap-3 bg-secondary rounded-xl px-4 py-3.5">
          <Search className="w-5 h-5 text-muted-foreground shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث في القرآن الكريم..."
            className="flex-1 bg-transparent outline-none text-foreground text-base font-quran placeholder:text-muted-foreground"
            autoFocus
            dir="rtl"
          />
          {loading && <Loader2 className="w-4 h-4 animate-spin text-primary shrink-0" />}
        </div>
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
                  onNavigateToAyah(r.surahNumber, r.ayahNumber);
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
