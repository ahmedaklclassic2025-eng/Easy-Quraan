import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Verse } from "@/data/quranData";

interface TafsirPopupProps {
  verse: Verse | null;
  surahName: string;
  onClose: () => void;
}

const TafsirPopup = ({ verse, surahName, onClose }: TafsirPopupProps) => {
  return (
    <AnimatePresence>
      {verse && (
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
                تفسير الآية {verse.number} من {surahName}
              </h3>
              <button onClick={onClose} className="p-1.5 rounded-full bg-secondary active:bg-muted transition-colors">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="gold-divider h-px mb-4" />
            <p className="font-quran text-sm leading-8 quran-text-color mb-3 bg-secondary/50 rounded-lg p-3">
              {verse.text} ﴿{verse.number}﴾
            </p>
            <p className="text-sm leading-7 text-foreground/90">
              {verse.tafsir}
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TafsirPopup;
