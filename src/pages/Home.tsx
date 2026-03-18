import { useEffect } from "react";
import { Title } from "../components/Commons";
import FadeIn from "../components/FadeIn";

export const Home = () => {
  useEffect(() => {
    document.title = "LuckSena";
  }, []);
  return (
    <FadeIn direction="right" delay={1 * 200}>
      <div className="mb-10 relative">
        <div className="absolute w-full h-[100%]  py-2 sm:py-20 px-10">
          <p className="text-xl md:text-5xl text-center text-white font-bold">
            Maximize sua chances de ganhar com o LuckSena!
          </p>
        </div>
        <img src="banner.png" alt="banner LuckSena" className="rounded-lg" />
      </div>
      <Title>Bem-vindo!</Title>
      <p className="my-5 sm:text-xl">
        Fique por dentro dos resultados das principais loterias, como{" "}
        <strong>Mega-Sena</strong>, <strong>Quina</strong> e{" "}
        <strong>Lotofácil</strong>. Além de acompanhar os sorteios, aproveite
        nossas ferramentas para gerar seus números da sorte de forma
        inteligente!
      </p>
    </FadeIn>
  );
};
