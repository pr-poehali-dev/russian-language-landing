import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import AgeGate, { AgeDenied } from "@/components/dickfon/AgeGate";
import { DAYS, YEARS } from "@/components/dickfon/data";

export default function AgeGuard({ children }: { children: ReactNode }) {
  const [ageVerified, setAgeVerified] = useState(false);
  const [ageDenied, setAgeDenied] = useState(false);
  const [dayIndex, setDayIndex] = useState(0);
  const [monthIndex, setMonthIndex] = useState(0);
  const [yearIndex, setYearIndex] = useState(10);

  useEffect(() => {
    if (sessionStorage.getItem("ageVerified") === "true") setAgeVerified(true);
  }, []);

  const handleAgeCheck = () => {
    const d = DAYS[dayIndex];
    const m = monthIndex + 1;
    const y = YEARS[yearIndex];
    const birth = new Date(y, m - 1, d);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const diff = today.getMonth() - birth.getMonth();
    if (diff < 0 || (diff === 0 && today.getDate() < birth.getDate())) age--;
    if (age >= 18) {
      sessionStorage.setItem("ageVerified", "true");
      setAgeVerified(true);
    } else {
      setAgeDenied(true);
    }
  };

  useEffect(() => {
    document.body.style.overflow = !ageVerified && !ageDenied ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [ageVerified, ageDenied]);

  if (ageDenied) return <AgeDenied />;

  return (
    <>
      {children}
      {!ageVerified && (
        <div className="fixed inset-0 z-[9999] overflow-y-auto" style={{ background: "#080510" }}>
          <AgeGate
            dayIndex={dayIndex}
            monthIndex={monthIndex}
            yearIndex={yearIndex}
            onDayChange={setDayIndex}
            onMonthChange={setMonthIndex}
            onYearChange={setYearIndex}
            onConfirm={handleAgeCheck}
          />
        </div>
      )}
    </>
  );
}
