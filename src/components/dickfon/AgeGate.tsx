import { useRef, useEffect, useCallback } from "react";
import { DAYS, MONTHS, YEARS } from "./data";

interface ScrollPickerProps {
  items: (string | number)[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

function ScrollPicker({ items, selectedIndex, onSelect }: ScrollPickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemHeight = 44;
  const visibleCount = 5;

  const scrollTo = useCallback((index: number, smooth = true) => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollTo({ top: index * itemHeight, behavior: smooth ? "smooth" : "instant" });
  }, []);

  useEffect(() => {
    scrollTo(selectedIndex, false);
  }, []);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const index = Math.round(container.scrollTop / itemHeight);
    const clamped = Math.max(0, Math.min(index, items.length - 1));
    if (clamped !== selectedIndex) onSelect(clamped);
  }, [items.length, selectedIndex, onSelect]);

  return (
    <div className="relative" style={{ height: itemHeight * visibleCount }}>
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: `linear-gradient(to bottom,
            rgba(8,5,16,0.97) 0%,
            rgba(8,5,16,0.15) 38%,
            rgba(8,5,16,0.15) 62%,
            rgba(8,5,16,0.97) 100%)`,
        }}
      />
      <div
        className="picker-highlight absolute left-0 right-0 z-20 pointer-events-none"
        style={{ top: itemHeight * 2, height: itemHeight }}
      />
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full overflow-y-scroll scrollbar-none"
        style={{ scrollSnapType: "y mandatory" }}
      >
        <div style={{ height: itemHeight * 2, scrollSnapAlign: "none" }} />
        {items.map((item, i) => (
          <div
            key={i}
            onClick={() => { onSelect(i); scrollTo(i); }}
            className="flex items-center justify-center cursor-pointer transition-all duration-200"
            style={{
              height: itemHeight,
              scrollSnapAlign: "center",
              color: i === selectedIndex ? "#F5D060" : "rgba(255,255,255,0.28)",
              fontSize: i === selectedIndex ? "1.1rem" : "0.92rem",
              fontWeight: i === selectedIndex ? 700 : 400,
              textShadow: i === selectedIndex ? "0 0 14px rgba(245,208,96,0.5)" : "none",
            }}
          >
            <span className="font-rubik">{item}</span>
          </div>
        ))}
        <div style={{ height: itemHeight * 2, scrollSnapAlign: "none" }} />
      </div>
    </div>
  );
}

interface AgeGateProps {
  dayIndex: number;
  monthIndex: number;
  yearIndex: number;
  onDayChange: (i: number) => void;
  onMonthChange: (i: number) => void;
  onYearChange: (i: number) => void;
  onConfirm: () => void;
}

export function AgeDenied() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: "#080510" }}>
      <div className="liquid-bg">
        <div className="liquid-blob liquid-blob-1" />
        <div className="liquid-blob liquid-blob-2" />
      </div>
      <div className="relative z-10 text-center px-6">
        <div
          className="text-6xl mb-6"
          style={{ filter: "drop-shadow(0 0 18px rgba(239,68,68,0.4))" }}
        >
          🚫
        </div>
        <h2 className="font-oswald text-3xl text-[#F5D060] mb-4 uppercase tracking-widest text-glow-gold">
          Доступ запрещён
        </h2>
        <p className="font-rubik text-white/60 text-lg max-w-sm mx-auto">
          Вам должно быть не менее 18 лет для посещения данного сайта.
        </p>
      </div>
    </div>
  );
}

export default function AgeGate({
  dayIndex, monthIndex, yearIndex,
  onDayChange, onMonthChange, onYearChange,
  onConfirm,
}: AgeGateProps) {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: "#080510" }}>
      <div className="liquid-bg">
        <div className="liquid-blob liquid-blob-1" />
        <div className="liquid-blob liquid-blob-2" />
        <div className="liquid-blob liquid-blob-3" />
        <div className="liquid-blob liquid-blob-4" />
        <div className="liquid-blob liquid-blob-5" />
      </div>
      <div className="relative z-10 text-center px-6 max-w-md w-full">
        <div className="mb-8">
          <div className="age-ring w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <span
              className="font-oswald text-[#F5D060] text-2xl font-bold tracking-tight leading-none"
              style={{ textShadow: "0 0 12px rgba(245,208,96,0.5)" }}
            >
              18+
            </span>
          </div>
          <h1
            className="font-oswald text-4xl md:text-5xl text-white uppercase tracking-[0.15em] mb-3 text-glow-white"
          >
            Добро пожаловать
          </h1>
          <p className="font-cormorant text-[#F5D060] text-xl italic text-glow-gold">
            DICKFON — самый скандальный гаджет
          </p>
        </div>

        <div className="agegate-card p-8">
          <p className="font-rubik text-white/70 text-sm mb-6 leading-relaxed">
            Пожалуйста, подтвердите свой возраст.
          </p>

          <div className="mb-6">
            <label className="font-oswald text-[#F5D060]/75 text-xs uppercase tracking-widest mb-4 block text-left">
              Дата рождения
            </label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <p className="font-rubik text-white/30 text-xs mb-2 text-center">День</p>
                <ScrollPicker items={DAYS} selectedIndex={dayIndex} onSelect={onDayChange} />
              </div>
              <div>
                <p className="font-rubik text-white/30 text-xs mb-2 text-center">Месяц</p>
                <ScrollPicker items={MONTHS} selectedIndex={monthIndex} onSelect={onMonthChange} />
              </div>
              <div>
                <p className="font-rubik text-white/30 text-xs mb-2 text-center">Год</p>
                <ScrollPicker items={YEARS} selectedIndex={yearIndex} onSelect={onYearChange} />
              </div>
            </div>
          </div>

          <button onClick={onConfirm} className="btn-capsule btn-capsule-blue w-full justify-center py-4">
            Подтвердить возраст
          </button>
        </div>

        <p className="font-rubik text-white/22 text-xs mt-6">
          Сайт предназначен для лиц старше 18 лет
        </p>
      </div>
    </div>
  );
}