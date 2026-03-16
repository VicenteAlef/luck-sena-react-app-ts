import { useEffect } from 'react';
import { Title } from '../components/Commons';
import FadeIn from '../components/FadeIn';

export const Home = () => {
  useEffect(() => {
    document.title = 'LuckSena';
  }, []);
  return (
    <FadeIn direction="right" delay={1 * 200}>
      <Title>Bem-vindo!</Title>
      <p className="my-5 sm:text-xl">
        Fique por dentro dos resultados das principais loterias, como{' '}
        <strong>Mega-Sena</strong>, <strong>Quina</strong> e{' '}
        <strong>Lotofácil</strong>. Além de acompanhar os sorteios, aproveite
        nossas ferramentas para gerar seus números da sorte de forma
        inteligente!
      </p>
    </FadeIn>
  );
};
