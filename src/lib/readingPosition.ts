const STORAGE_KEY = "quran-reading-position";

export interface ReadingPosition {
  surahNumber: number;
  surahName: string;
  timestamp: number;
}

export function saveReadingPosition(pos: ReadingPosition): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pos));
}

export function getReadingPosition(): ReadingPosition | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearReadingPosition(): void {
  localStorage.removeItem(STORAGE_KEY);
}
