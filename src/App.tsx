
import { useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProductPage from "./pages/ProductPage";
import NotFound from "./pages/NotFound";
import AgeGate, { AgeDenied } from "@/components/dickfon/AgeGate";
import { DAYS, MONTHS, YEARS } from "@/components/dickfon/data";

const queryClient = new QueryClient();

function AgeGuard({ children }: { children: React.ReactNode }) {
  const [ageVerified, setAgeVerified] = useState(() => sessionStorage.getItem("ageVerified") === "true");
  const [ageDenied, setAgeDenied] = useState(false);
  const [dayIndex, setDayIndex] = useState(0);
  const [monthIndex, setMonthIndex] = useState(0);
  const [yearIndex, setYearIndex] = useState(10);

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

  if (ageDenied) return <AgeDenied />;

  if (!ageVerified) {
    return (
      <AgeGate
        dayIndex={dayIndex}
        monthIndex={monthIndex}
        yearIndex={yearIndex}
        onDayChange={setDayIndex}
        onMonthChange={setMonthIndex}
        onYearChange={setYearIndex}
        onConfirm={handleAgeCheck}
      />
    );
  }

  return <>{children}</>;
}

const App = () => (
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AgeGuard>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/product/:slug" element={<ProductPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AgeGuard>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;