import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";
import { toEasternArabic } from "@/lib/arabicNumerals";

interface TafsirPopupProps {
  verseNumber: number | null;
  verseText: string;
  tafsirText: string;
  surahName: string;
  onClose: () => void;
  onPlayFromAyah?: (ayahNumber: number) => void;
}

const TafsirPopup = ({ verseNumber, verseText, tafsirText, surahName, onClose, onPlayFromAyah }: TafsirPopupProps) => {
  const handlePlay = () => {
    if (verseNumber && onPlayFromAyah) {
      onPlayFromAyah(verseNumber);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {verseNumber !== null && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 tafsir-card rounded-t-2xl p-5 pb-8 max-h-[60vh] overflow-y-auto shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-primary font-quran">
                تفسير الآية {toEasternArabic(verseNumber)} من {surahName}
              </h3>
              <div className="flex items-center gap-2">
                {onPlayFromAyah && (
                  <button
                    onClick={handlePlay}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 active:scale-95 transition-all"
                  >
                    <Play className="w-3 h-3" />
                    <span>تشغيل من هنا</span>
                  </button>
                )}
                <button onClick={onClose} className="p-1.5 rounded-full bg-secondary active:bg-muted transition-colors">
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>
            <div className="gold-divider h-px mb-4" />
            <p className="font-quran text-sm leading-8 quran-text-color mb-3 bg-secondary/50 rounded-lg p-3">
              {verseText} ﴿{toEasternArabic(verseNumber)}﴾
            </p>
            <p className="text-sm leading-7 text-foreground/90">
              {tafsirText}
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TafsirPopup;
