// Types for alquran.cloud API responses

export interface SurahInfo {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string; // "Meccan" or "Medinan"
}

export interface AyahText {
  number: number;        // global ayah number
  text: string;
  numberInSurah: number;
  juz: number;
  page: number;
}

export interface SurahWithAyahs {
  number: number;
  name: string;
  englishName: string;
  numberOfAyahs: number;
  revelationType: string;
  ayahs: AyahText[];
}

export interface QuranApiResponse<T> {
  code: number;
  status: string;
  data: T;
}

const BASE_URL = "https://api.alquran.cloud/v1";

export async function fetchAllSurahs(): Promise<SurahInfo[]> {
  const res = await fetch(`${BASE_URL}/surah`);
  if (!res.ok) throw new Error("Failed to fetch surahs");
  const json: QuranApiResponse<SurahInfo[]> = await res.json();
  return json.data;
}

export async function fetchSurahText(surahNumber: number): Promise<SurahWithAyahs> {
  const res = await fetch(`${BASE_URL}/surah/${surahNumber}/quran-uthmani`);
  if (!res.ok) throw new Error("Failed to fetch surah text");
  const json: QuranApiResponse<SurahWithAyahs> = await res.json();
  return json.data;
}

export async function fetchSurahTafsir(surahNumber: number): Promise<SurahWithAyahs> {
  const res = await fetch(`${BASE_URL}/surah/${surahNumber}/ar.muyassar`);
  if (!res.ok) throw new Error("Failed to fetch tafsir");
  const json: QuranApiResponse<SurahWithAyahs> = await res.json();
  return json.data;
}

export function revelationTypeArabic(type: string): string {
  return type === "Meccan" ? "مكية" : "مدنية";
}
