import { ArrowRight } from "lucide-react";

interface QuranicDuasPageProps {
  onBack: () => void;
}

const quranicDuas = [
  {
    surah: "البقرة",
    ayah: 201,
    text: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
  },
  {
    surah: "البقرة",
    ayah: 286,
    text: "رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ ۖ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا ۚ أَنتَ مَوْلَانَا فَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
  },
  {
    surah: "آل عمران",
    ayah: 8,
    text: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً ۚ إِنَّكَ أَنتَ الْوَهَّابُ",
  },
  {
    surah: "آل عمران",
    ayah: 53,
    text: "رَبَّنَا آمَنَّا بِمَا أَنزَلْتَ وَاتَّبَعْنَا الرَّسُولَ فَاكْتُبْنَا مَعَ الشَّاهِدِينَ",
  },
  {
    surah: "آل عمران",
    ayah: 147,
    text: "رَبَّنَا اغْفِرْ لَنَا ذُنُوبَنَا وَإِسْرَافَنَا فِي أَمْرِنَا وَثَبِّتْ أَقْدَامَنَا وَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
  },
  {
    surah: "الأعراف",
    ayah: 23,
    text: "رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
  },
  {
    surah: "الأعراف",
    ayah: 126,
    text: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَتَوَفَّنَا مُسْلِمِينَ",
  },
  {
    surah: "يونس",
    ayah: 85,
    text: "رَبَّنَا لَا تَجْعَلْنَا فِتْنَةً لِّلْقَوْمِ الظَّالِمِينَ ۝ وَنَجِّنَا بِرَحْمَتِكَ مِنَ الْقَوْمِ الْكَافِرِينَ",
  },
  {
    surah: "إبراهيم",
    ayah: 40,
    text: "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِن ذُرِّيَّتِي ۚ رَبَّنَا وَتَقَبَّلْ دُعَاءِ",
  },
  {
    surah: "إبراهيم",
    ayah: 41,
    text: "رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ",
  },
  {
    surah: "الإسراء",
    ayah: 24,
    text: "رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
  },
  {
    surah: "الكهف",
    ayah: 10,
    text: "رَبَّنَا آتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا",
  },
  {
    surah: "طه",
    ayah: 114,
    text: "رَّبِّ زِدْنِي عِلْمًا",
  },
  {
    surah: "الأنبياء",
    ayah: 87,
    text: "لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ",
  },
  {
    surah: "المؤمنون",
    ayah: 118,
    text: "رَّبِّ اغْفِرْ وَارْحَمْ وَأَنتَ خَيْرُ الرَّاحِمِينَ",
  },
  {
    surah: "الفرقان",
    ayah: 74,
    text: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
  },
];

const QuranicDuasPage = ({ onBack }: QuranicDuasPageProps) => {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={onBack} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
          <ArrowRight className="w-6 h-6" />
        </button>
        <h1 className="font-quran text-xl font-bold">أدعية من القرآن الكريم</h1>
      </div>

      {/* Duas List */}
      <div className="p-4 space-y-4 pb-8">
        {quranicDuas.map((dua, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-xl p-5 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded-full">
                {dua.surah} : {dua.ayah}
              </span>
            </div>
            <p className="font-quran text-lg leading-[2.2] text-foreground text-center">
              {dua.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuranicDuasPage;
