import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { MegaSena } from "./pages/MegaSena";
import { Quina } from "./pages/Quina";
import { Lotofacil } from "./pages/Lotofacil";
import { Lotomania } from "./pages/Lotomania";
import { MaisMilionaria } from "./pages/MaisMilionaria";
import { DuplaSena } from "./pages/DuplaSena";
import { DiaDeSorte } from "./pages/DiaDeSorte";
import { Timemania } from "./pages/Timemania";
import { SuperSete } from "./pages/SuperSete";
import { Federal } from "./pages/Federal";
import { TermsOfUse } from "./pages/TermsOfUse";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import Modal from "./components/Modal";
import { CookieConsent } from "./components/CookieConsent";
import { AnalyticsTracker } from "./components/AnalyticsTracker";
import { ThemeProvider } from "./context/ThemeContext";
import { LotteryProvider } from "./context/LotteryContext";

const DISCLAIMER_STORAGE_KEY = "lucksena_portfolio_disclaimer_ack";

function AppContent() {
  const [showDisclaimer, setShowDisclaimer] = useState(() => {
    try {
      return !localStorage.getItem(DISCLAIMER_STORAGE_KEY);
    } catch {
      return false;
    }
  });

  const handleCloseDisclaimer = () => {
    try {
      localStorage.setItem(DISCLAIMER_STORAGE_KEY, "acknowledged");
    } catch {
      // Ignora erro de local storage
    }
    setShowDisclaimer(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <AnalyticsTracker />
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mega-sena" element={<MegaSena />} />
          <Route path="/lotofacil" element={<Lotofacil />} />
          <Route path="/quina" element={<Quina />} />
          <Route path="/lotomania" element={<Lotomania />} />
          <Route path="/mais-milionaria" element={<MaisMilionaria />} />
          <Route path="/dupla-sena" element={<DuplaSena />} />
          <Route path="/dia-de-sorte" element={<DiaDeSorte />} />
          <Route path="/timemania" element={<Timemania />} />
          <Route path="/super-sete" element={<SuperSete />} />
          <Route path="/federal" element={<Federal />} />
          <Route path="/termos-de-uso" element={<TermsOfUse />} />
          <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
        </Routes>
      </main>

      <Footer />
      <CookieConsent />

      {/* Modal Informativo de Portfólio / Demonstração */}
      {showDisclaimer && (
        <Modal
          title="Bem-vindo ao LuckSena"
          labelButton="Entendido e Concordo"
          isOpen={showDisclaimer}
          onClose={handleCloseDisclaimer}
        >
          <div className="space-y-3">
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              <strong>Atenção:</strong> Este é um portal demonstrativo desenvolvido
              por <strong>Vicente Dev</strong> para fins de portfólio técnico e
              estudo de interfaces modernas.
            </p>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Os dados de sorteios são consultados em tempo real de APIs públicas
              das Loterias Caixa. Não realizamos nem intermediamos qualquer tipo
              de aposta financeira nesta plataforma.
            </p>
            <div className="p-3 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-800 dark:text-emerald-300">
              ✓ Tema claro ativado por padrão. Sinta-se livre para alternar
              para o tema escuro no topo da página e testar a geração de
              palpites para todas as loterias!
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LotteryProvider>
        <AppContent />
      </LotteryProvider>
    </ThemeProvider>
  );
}

export default App;
