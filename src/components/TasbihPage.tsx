import { useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";

interface TasbihPageProps {
  onBack: () => void;
}

const adhkar = [
  { text: "سُبْحَانَ اللَّهِ", target: 33 },
  { text: "الْحَمْدُ لِلَّهِ", target: 33 },
  { text: "اللَّهُ أَكْبَرُ", target: 33 },
  { text: "لَا إِلَٰهَ إِلَّا اللَّهُ", target: 100 },
  { text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ", target: 100 },
  { text: "أَسْتَغْفِرُ اللَّهَ", target: 100 },
  { text: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ", target: 100 },
  { text: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ", target: 100 },
];

const TasbihPage = ({ onBack }: TasbihPageProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [count, setCount] = useState(0);

  const selected = adhkar[selectedIndex];
  const progress = Math.min((count / selected.target) * 100, 100);
  const isComplete = count >= selected.target;

  const handleTap = () => {
    if (!isComplete) {
      setCount((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setCount(0);
  };

  const handleSelectDhikr = (index: number) => {
    setSelectedIndex(index);
    setCount(0);
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={onBack} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
          <ArrowRight className="w-6 h-6" />
        </button>
        <h1 className="font-quran text-xl font-bold">المسبحة الإلكترونية</h1>
      </div>

      <div className="flex flex-col items-center px-4 pt-6 pb-8">
        {/* Counter Circle */}
        <div className="relative mb-6">
          <svg className="w-52 h-52 -rotate-90" viewBox="0 0 200 200">
            <circle
              cx="100" cy="100" r="88"
              fill="none"
              className="stroke-muted"
              strokeWidth="8"
            />
            <circle
              cx="100" cy="100" r="88"
              fill="none"
              className={isComplete ? "stroke-green-500" : "stroke-primary"}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 88}
              strokeDashoffset={2 * Math.PI * 88 * (1 - progress / 100)}
              style={{ transition: "stroke-dashoffset 0.3s ease" }}
            />
          </svg>
          <button
            onClick={handleTap}
            className="absolute inset-0 flex flex-col items-center justify-center rounded-full active:scale-95 transition-transform"
          >
            <span className="text-5xl font-bold text-foreground">{count}</span>
            <span className="text-sm text-muted-foreground mt-1">/ {selected.target}</span>
          </button>
        </div>

        {/* Current Dhikr */}
        <p className="font-quran text-2xl text-foreground mb-4 text-center leading-relaxed">
          {selected.text}
        </p>

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 transition-colors mb-8"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="text-sm">إعادة العداد</span>
        </button>

        {/* Dhikr Selection */}
        <div className="w-full max-w-md space-y-2">
          <h3 className="font-quran text-sm text-muted-foreground mb-2">اختر الذكر:</h3>
          {adhkar.map((dhikr, index) => (
            <button
              key={index}
              onClick={() => handleSelectDhikr(index)}
              className={`w-full text-right p-3 rounded-xl border transition-colors ${
                index === selectedIndex
                  ? "bg-primary/10 border-primary text-foreground"
                  : "bg-card border-border text-foreground hover:bg-muted"
              }`}
            >
              <span className="font-quran text-base">{dhikr.text}</span>
              <span className="text-xs text-muted-foreground mr-2">({dhikr.target})</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TasbihPage;
