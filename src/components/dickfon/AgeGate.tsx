import { DAYS, MONTHS, YEARS } from "./data";

interface AgeGateProps {
  day: string;
  month: string;
  year: string;
  onDayChange: (v: string) => void;
  onMonthChange: (v: string) => void;
  onYearChange: (v: string) => void;
  onConfirm: () => void;
}

export function AgeDenied() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a0a2e]">
      <div className="text-center px-6">
        <div className="text-6xl mb-6">🚫</div>
        <h2 className="font-oswald text-3xl text-[#F5D060] mb-4 uppercase tracking-widest">
          Доступ запрещён
        </h2>
        <p className="font-rubik text-white/70 text-lg max-w-sm mx-auto">
          Вам должно быть не менее 18 лет для посещения данного сайта.
        </p>
      </div>
    </div>
  );
}

export default function AgeGate({
  day, month, year,
  onDayChange, onMonthChange, onYearChange,
  onConfirm,
}: AgeGateProps) {
  const isReady = day && month && year;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a0a2e] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#4B0082]/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#F5D060]/10 rounded-full blur-[120px]" />
      </div>
      <div className="relative z-10 text-center px-6 max-w-md w-full">
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-6 border-2 border-[#F5D060]/60 rounded-full flex items-center justify-center">
            <span className="font-oswald text-[#F5D060] text-2xl font-bold tracking-tight leading-none">18+</span>
          </div>
          <h1 className="font-oswald text-4xl md:text-5xl text-white uppercase tracking-[0.15em] mb-3">
            Добро пожаловать
          </h1>
          <p className="font-cormorant text-[#F5D060] text-xl italic">
            DICKFON — самый скандальный гаджет
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <p className="font-rubik text-white/80 text-sm mb-6 leading-relaxed">
            Пожалуйста, подтвердите свой возраст.
          </p>

          <div className="mb-6 text-left">
            <label className="font-oswald text-[#F5D060]/80 text-xs uppercase tracking-widest mb-3 block">
              Дата рождения
            </label>
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col">
                <span className="font-rubik text-white/40 text-xs mb-1 text-center">День</span>
                <select
                  value={day}
                  onChange={(e) => onDayChange(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-3 text-white font-rubik text-base outline-none focus:border-[#F5D060]/60 focus:bg-white/15 transition-all appearance-none cursor-pointer [color-scheme:dark]"
                >
                  <option value="" disabled>—</option>
                  {DAYS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <span className="font-rubik text-white/40 text-xs mb-1 text-center">Месяц</span>
                <select
                  value={month}
                  onChange={(e) => onMonthChange(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-3 text-white font-rubik text-base outline-none focus:border-[#F5D060]/60 focus:bg-white/15 transition-all appearance-none cursor-pointer [color-scheme:dark]"
                >
                  <option value="" disabled>—</option>
                  {MONTHS.map((m, i) => (
                    <option key={i} value={i}>{m}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <span className="font-rubik text-white/40 text-xs mb-1 text-center">Год</span>
                <select
                  value={year}
                  onChange={(e) => onYearChange(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-3 text-white font-rubik text-base outline-none focus:border-[#F5D060]/60 focus:bg-white/15 transition-all appearance-none cursor-pointer [color-scheme:dark]"
                >
                  <option value="" disabled>—</option>
                  {YEARS.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={onConfirm}
            disabled={!isReady}
            className="w-full bg-[#F5D060] hover:bg-[#F0C830] disabled:opacity-40 disabled:cursor-not-allowed text-[#1a0a2e] font-oswald text-lg uppercase tracking-widest py-4 rounded-xl transition-all duration-200 hover:shadow-[0_0_30px_rgba(245,208,96,0.4)]"
          >
            Подтвердить возраст
          </button>
        </div>

        <p className="font-rubik text-white/30 text-xs mt-6">
          Сайт предназначен для лиц старше 18 лет
        </p>
      </div>
    </div>
  );
}
