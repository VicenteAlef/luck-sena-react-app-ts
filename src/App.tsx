import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { MegaSena } from './pages/MegaSena';
import { Quina } from './pages/Quina';
import { Lotofacil } from './pages/Lotofacil';
import { Lotomania } from './pages/Lotomania';

function App() {
  return (
    <>
      <Header />
      <main className="max-w-5xl min-h-180 mx-3 sm:mx-auto my-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mega-sena" element={<MegaSena />} />
          <Route path="/quina" element={<Quina />} />
          <Route path="/lotofacil" element={<Lotofacil />} />
          <Route path="/lotomania" element={<Lotomania />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
