import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Loader2 } from "lucide-react";
import { fetchSurahAudio, type AyahAudio } from "@/lib/quranApi";
import { toEasternArabic } from "@/lib/arabicNumerals";

interface AudioPlayerProps {
  surahNumber: number;
  surahName: string;
  totalAyahs: number;
  startFromAyah?: number | null;
  onAyahChange?: (ayahNumber: number) => void;
}

const AudioPlayer = ({ surahNumber, surahName, totalAyahs, startFromAyah, onAyahChange }: AudioPlayerProps) => {
  const [audioData, setAudioData] = useState<AyahAudio[]>([]);
  const [currentAyah, setCurrentAyah] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animFrameRef = useRef<number>(0);

  // Fetch audio data
  useEffect(() => {
    setLoading(true);
    fetchSurahAudio(surahNumber)
      .then((data) => setAudioData(data.ayahs))
      .catch(() => {})
      .finally(() => setLoading(false));

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [surahNumber]);

  const updateProgress = useCallback(() => {
    if (audioRef.current && audioRef.current.duration) {
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    }
    if (isPlaying) {
      animFrameRef.current = requestAnimationFrame(updateProgress);
    }
  }, [isPlaying]);

  const playAyah = useCallback(
    (ayahNum: number) => {
      const ayah = audioData.find((a) => a.numberInSurah === ayahNum);
      if (!ayah) return;

      if (audioRef.current) {
        audioRef.current.pause();
      }

      setAudioLoading(true);
      const audio = new Audio(ayah.audio);
      audioRef.current = audio;

      audio.addEventListener("canplay", () => {
        setAudioLoading(false);
        audio.play();
        setIsPlaying(true);
        setCurrentAyah(ayahNum);
        onAyahChange?.(ayahNum);
        animFrameRef.current = requestAnimationFrame(updateProgress);
      }, { once: true });

      audio.addEventListener("ended", () => {
        setIsPlaying(false);
        setProgress(0);
        cancelAnimationFrame(animFrameRef.current);
        // Auto-play next ayah
        if (ayahNum < totalAyahs) {
          playAyah(ayahNum + 1);
        }
      });

      audio.addEventListener("error", () => {
        setAudioLoading(false);
        setIsPlaying(false);
      });

      audio.load();
    },
    [audioData, totalAyahs, onAyahChange, updateProgress]
  );

  // Handle startFromAyah changes
  useEffect(() => {
    if (startFromAyah && audioData.length > 0) {
      playAyah(startFromAyah);
    }
  }, [startFromAyah]);

  const togglePlay = () => {
    if (!audioRef.current || !audioData.length) {
      if (audioData.length) playAyah(currentAyah);
      return;
    }
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      cancelAnimationFrame(animFrameRef.current);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
      animFrameRef.current = requestAnimationFrame(updateProgress);
    }
  };

  const prevAyah = () => {
    if (currentAyah > 1) playAyah(currentAyah - 1);
  };

  const nextAyah = () => {
    if (currentAyah < totalAyahs) playAyah(currentAyah + 1);
  };

  if (loading) return null;

  return (
    <div className="sticky bottom-0 z-20 bg-card/95 backdrop-blur-md border-t border-border px-4 py-3 shadow-lg">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-secondary">
        <div
          className="h-full bg-primary transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center justify-between max-w-lg mx-auto gap-3">
        {/* Ayah info */}
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <Volume2 className="w-4 h-4 text-primary shrink-0" />
          <span className="text-xs text-muted-foreground truncate font-quran">
            الآية {toEasternArabic(currentAyah)} من {toEasternArabic(totalAyahs)}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={nextAyah}
            disabled={currentAyah >= totalAyahs}
            className="w-9 h-9 rounded-full flex items-center justify-center text-foreground hover:bg-secondary disabled:opacity-30 transition-colors"
            aria-label="الآية التالية"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <button
            onClick={togglePlay}
            disabled={!audioData.length}
            className="w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 disabled:opacity-50 transition-colors"
            aria-label={isPlaying ? "إيقاف" : "تشغيل"}
          >
            {audioLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5 mr-[-2px]" />
            )}
          </button>

          <button
            onClick={prevAyah}
            disabled={currentAyah <= 1}
            className="w-9 h-9 rounded-full flex items-center justify-center text-foreground hover:bg-secondary disabled:opacity-30 transition-colors"
            aria-label="الآية السابقة"
          >
            <SkipBack className="w-4 h-4" />
          </button>
        </div>

        {/* Spacer for balance */}
        <div className="flex-1" />
      </div>
    </div>
  );
};

export default AudioPlayer;
