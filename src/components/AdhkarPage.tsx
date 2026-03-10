import { useState } from "react";
import { ChevronRight, Sun, Moon } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface AdhkarPageProps {
  onBack: () => void;
}

interface Dhikr {
  text: string;
  count: number;
  reference?: string;
}

const morningAdhkar: Dhikr[] = [
  { text: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ", count: 1, reference: "مسلم" },
  { text: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ", count: 1, reference: "الترمذي" },
  { text: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ", count: 1, reference: "البخاري" },
  { text: "اللَّهُمَّ إِنِّي أَصْبَحْتُ أُشْهِدُكَ، وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلَائِكَتَكَ، وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللَّهُ لَا إِلَهَ إِلَّا أَنْتَ وَحْدَكَ لَا شَرِيكَ لَكَ، وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ", count: 4, reference: "أبو داود" },
  { text: "اللَّهُمَّ مَا أَصْبَحَ بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ", count: 1, reference: "أبو داود" },
  { text: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَهَ إِلَّا أَنْتَ", count: 3, reference: "أبو داود" },
  { text: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ، وَالْفَقْرِ، وَأَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لَا إِلَهَ إِلَّا أَنْتَ", count: 3, reference: "أبو داود" },
  { text: "حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ", count: 7, reference: "أبو داود" },
  { text: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ", count: 3, reference: "الترمذي" },
  { text: "رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا", count: 3, reference: "أبو داود" },
  { text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ", count: 100, reference: "مسلم" },
  { text: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ", count: 10, reference: "البخاري ومسلم" },
  { text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ", count: 3, reference: "مسلم" },
  { text: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ", count: 100, reference: "البخاري ومسلم" },
];

const eveningAdhkar: Dhikr[] = [
  { text: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ", count: 1, reference: "مسلم" },
  { text: "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ", count: 1, reference: "الترمذي" },
  { text: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ", count: 1, reference: "البخاري" },
  { text: "اللَّهُمَّ إِنِّي أَمْسَيْتُ أُشْهِدُكَ، وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلَائِكَتَكَ، وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللَّهُ لَا إِلَهَ إِلَّا أَنْتَ وَحْدَكَ لَا شَرِيكَ لَكَ، وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ", count: 4, reference: "أبو داود" },
  { text: "اللَّهُمَّ مَا أَمْسَى بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ", count: 1, reference: "أبو داود" },
  { text: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَهَ إِلَّا أَنْتَ", count: 3, reference: "أبو داود" },
  { text: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ، وَالْفَقْرِ، وَأَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لَا إِلَهَ إِلَّا أَنْتَ", count: 3, reference: "أبو داود" },
  { text: "حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ", count: 7, reference: "أبو داود" },
  { text: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ", count: 3, reference: "مسلم" },
  { text: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ", count: 3, reference: "الترمذي" },
  { text: "رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا", count: 3, reference: "أبو داود" },
  { text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ", count: 100, reference: "مسلم" },
  { text: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ", count: 10, reference: "البخاري ومسلم" },
  { text: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ", count: 100, reference: "البخاري ومسلم" },
];

const AdhkarPage = ({ onBack }: AdhkarPageProps) => {
  const [tab, setTab] = useState<"morning" | "evening">("morning");
  const adhkar = tab === "morning" ? morningAdhkar : eveningAdhkar;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="header-gradient sticky top-0 z-10 px-4 py-3 text-primary-foreground shadow-lg">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <button onClick={onBack} className="p-2 -m-2 active:opacity-70 transition-opacity">
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="text-center flex-1">
            <h1 className="text-xl font-bold font-quran">أذكار الصباح والمساء</h1>
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-[52px] z-10 flex justify-center gap-2 py-3 bg-background/90 backdrop-blur-sm border-b border-border px-4">
        <button
          onClick={() => setTab("morning")}
          className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-quran transition-colors ${
            tab === "morning"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground"
          }`}
        >
          <Sun className="w-4 h-4" />
          أذكار الصباح
        </button>
        <button
          onClick={() => setTab("evening")}
          className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-quran transition-colors ${
            tab === "evening"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground"
          }`}
        >
          <Moon className="w-4 h-4" />
          أذكار المساء
        </button>
      </div>

      {/* Adhkar list */}
      <div className="flex-1 px-4 py-4 max-w-lg mx-auto w-full">
        <div className="flex flex-col gap-4">
          {adhkar.map((dhikr, index) => (
            <DhikrCard key={`${tab}-${index}`} dhikr={dhikr} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

function DhikrCard({ dhikr, index }: { dhikr: Dhikr; index: number }) {
  const [remaining, setRemaining] = useState(dhikr.count);

  const handleClick = () => {
    if (remaining > 0) setRemaining((r) => r - 1);
  };

  return (
    <button
      onClick={handleClick}
      className={`text-right w-full rounded-xl p-5 transition-all duration-200 ${
        remaining === 0
          ? "bg-primary/10 border border-primary/30 opacity-60"
          : "bg-card border border-border active:scale-[0.98]"
      }`}
    >
      <p className="font-quran text-lg leading-[2.2] quran-text-color mb-3">{dhikr.text}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{dhikr.reference}</span>
        <span
          className={`inline-flex items-center justify-center min-w-[2.5rem] h-8 rounded-full text-sm font-bold ${
            remaining === 0
              ? "bg-primary/20 text-primary"
              : "bg-accent/15 text-accent-foreground"
          }`}
        >
          {remaining === 0 ? "✓" : remaining}
        </span>
      </div>
    </button>
  );
}

export default AdhkarPage;
