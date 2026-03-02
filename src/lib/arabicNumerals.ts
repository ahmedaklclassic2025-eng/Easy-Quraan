const easternMap: Record<string, string> = {
  '0': '٠', '1': '١', '2': '٢', '3': '٣', '4': '٤',
  '5': '٥', '6': '٦', '7': '٧', '8': '٨', '9': '٩',
};

export function toEasternArabic(num: number | string): string {
  return String(num).replace(/[0-9]/g, (d) => easternMap[d] || d);
}
