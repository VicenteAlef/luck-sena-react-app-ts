import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { MegaSena } from "./pages/MegaSena";
import { Quina } from "./pages/Quina";
import { Lotofacil } from "./pages/Lotofacil";
import { Lotomania } from "./pages/Lotomania";
import { Footer } from "./components/Footer";
import Modal from "./components/Modal";

function App() {
  return (
    <>
      <Header />
      <main className="max-w-5xl min-h-180 mx-3 sm:mx-10 lg:mx-auto mt-10 mb-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mega-sena" element={<MegaSena />} />
          <Route path="/quina" element={<Quina />} />
          <Route path="/lotofacil" element={<Lotofacil />} />
          <Route path="/lotomania" element={<Lotomania />} />
        </Routes>
      </main>
      <Footer />
      <Modal title="LuckSena" labelButton={"Condordo"}>
        {/* O conteúdo dentro do Modal é passado como 'children'. */}
        <p className="text-base leading-relaxed text-gray-600">
          <strong>Atenção:</strong> Este é um site de demonstração desenvolvido
          exclusivamente para fins de portfólio.
        </p>
        <p className="text-base leading-relaxed text-gray-600">
          Todas as informações, produtos e dados são puramente demonstativos
          e/ou fictícios. Nenhuma compra, cadastro ou interação realizada aqui
          terá efeito no mundo real.
        </p>
        <p className="text-base font-medium leading-relaxed text-gray-600">
          Obs: Ainda em desenvolvimento.
        </p>
      </Modal>
    </>
  );
}

export default App;
