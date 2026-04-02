import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { NumberDetailPage } from "./pages/NumberDetailPage";

type View = { page: "home" } | { page: "detail"; number: string };

export default function App() {
  const [view, setView] = useState<View>({ page: "home" });

  const goHome = () => setView({ page: "home" });
  const goToNumbers = () => {
    setView({ page: "home" });
    // slight delay to allow render then scroll
    setTimeout(() => {
      document
        .getElementById("numbers-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };
  const goToDetail = (number: string) => setView({ page: "detail", number });

  return (
    <div className="bg-page-gradient min-h-screen flex flex-col">
      <Navbar onNavigateHome={goHome} onNavigateNumbers={goToNumbers} />

      {view.page === "home" && <HomePage onViewNumber={goToDetail} />}

      {view.page === "detail" && (
        <NumberDetailPage number={view.number} onBack={goHome} />
      )}

      <Footer onNavigateHome={goHome} onNavigateNumbers={goToNumbers} />
      <Toaster richColors position="bottom-right" />
    </div>
  );
}
