import { NavLink } from 'react-router-dom';

export const Header = () => {
  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'border-b-2 border-white font-bold' // Estilo quando ATIVO
      : 'hover:text-gray-200 transition-colors'; // Estilo quando INATIVO
  return (
    <header className="w-full bg-cyan-800">
      <div className="max-w-5xl mx-auto flex items-center pt-2 sm:pt-10 gap-3">
        <img src="icons8-clover-100.png" alt="" className="w-20 sm:w-25" />
        <div className="text-white">
          <div className="text-4xl sm:text-5xl font-bold tracking-wider">
            LuckSena
          </div>
          <div className="text-md sm:text-xl font-bold">
            Seu gerador de números para loterias
          </div>
        </div>
      </div>
      <nav className="max-w-5xl mx-auto p-2">
        <ul className="flex items-center justify-between text-white  md:text-xl">
          <li>
            <NavLink title="Mega Sena" to="/" className={linkStyle}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink title="Mega Sena" to="/mega-sena" className={linkStyle}>
              Mega Sena
            </NavLink>
          </li>
          <li>
            <NavLink title="Quina" to="/quina" className={linkStyle}>
              Quina
            </NavLink>
          </li>
          <li>
            <NavLink title="Lotofácil" to="/lotofacil" className={linkStyle}>
              Lotofácil
            </NavLink>
          </li>
          <li>
            <NavLink title="Lotomania" to="/lotomania" className={linkStyle}>
              Lotomania
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
