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
  sajda?: boolean | { id: number; recommended: boolean; obligatory: boolean };
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

export function hasSajda(ayah: AyahText): boolean {
  if (typeof ayah.sajda === "boolean") return ayah.sajda;
  if (ayah.sajda && typeof ayah.sajda === "object") return true;
  return false;
}

export interface AyahAudio {
  number: number;
  audio: string;
  numberInSurah: number;
}

export interface SurahWithAudio {
  number: number;
  name: string;
  ayahs: AyahAudio[];
}

export interface Reciter {
  id: string;
  name: string;
}

export const RECITERS: Reciter[] = [
  { id: "ar.alafasy", name: "مشاري العفاسي" },
  { id: "ar.abdulbasitmurattal", name: "عبد الباسط عبد الصمد" },
  { id: "ar.husary", name: "محمود خليل الحصري" },
  { id: "ar.minshawi", name: "محمد صديق المنشاوي" },
  { id: "ar.abdurrahmaansudais", name: "عبد الرحمن السديس" },
  { id: "ar.saaborimahir", name: "ماهر المعيقلي" },
  { id: "ar.ahmedajamy", name: "أحمد العجمي" },
  { id: "ar.haborimahir", name: "هاني الرفاعي" },
];

export async function fetchSurahAudio(surahNumber: number, reciterId: string = "ar.alafasy"): Promise<SurahWithAudio> {
  const res = await fetch(`${BASE_URL}/surah/${surahNumber}/${reciterId}`);
  if (!res.ok) throw new Error("Failed to fetch audio");
  const json: QuranApiResponse<SurahWithAudio> = await res.json();
  return json.data;
}
