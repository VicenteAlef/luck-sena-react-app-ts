import { useEffect, useState } from 'react';
import Button from '../components/Button';
import { Ball, Title, Title2 } from '../components/Commons';
import FadeIn from '../components/FadeIn';
import { sortearNumeros } from '../utils/drawer';

export const Lotomania = () => {
  const [numbers, setNumbers] = useState([]);
  const [concurso, setConcurso] = useState('');
  const [date, setDate] = useState('');
  const [result, setResult] = useState<number[]>([]);
  const [nextValue, setNextValue] = useState();

  useEffect(() => {
    document.title = 'LuckSena - Lotomania';
    async function getResult() {
      try {
        const response = await fetch(
          'https://loteriascaixa-api.herokuapp.com/api/lotomania/latest',
        );
        const data = await response.json();
        setNumbers(data.dezenas);
        setConcurso(data.concurso);
        setDate(data.data);
        setNextValue(
          data.valorEstimadoProximoConcurso.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),
        );
      } catch (error) {
        console.error(error);
      }
    }
    getResult();
  }, []);

  function handleGenerate(e: any) {
    e.preventDefault();
    // Na Lotomania os números vão de 0 a 99
    const resultado = sortearNumeros(0, 99, 50);
    setResult(resultado);
  }

  return (
    <FadeIn direction="right" delay={200}>
      <Title>Lotomania</Title>

      <div>
        <div>
          {concurso && (
            <p className="my-5 sm:text-xl text-gray-700">
              Resultado do último concurso: <strong>{concurso}</strong> - {date}
            </p>
          )}

          <div className="max-w-90 flex gap-5 flex-wrap mb-8">
            {numbers.map((number) => (
              <Ball key={`latest-${number}`}>{number}</Ball>
            ))}
          </div>
        </div>
        <div>
          <p className="my-5 sm:text-xl text-gray-700">
            Valor para o próximo concurso:
          </p>
          <p className="my-5 sm:text-2xl font-bold text-gray-700">
            {nextValue}
          </p>
        </div>
      </div>

      <hr className="my-8 border-gray-300" />

      <Title2>Gere seus números da sorte</Title2>

      <div className="my-10">
        <Button onClick={handleGenerate}>Gerar 50 números da sorte</Button>
      </div>

      {result.length > 0 && (
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 bg-gray-50 p-6 rounded-xl border border-gray-200">
          {result
            .sort((a, b) => a - b)
            .map((number) => (
              <Ball key={`result-${number}`}>
                {String(number).padStart(2, '0')}
              </Ball>
            ))}
        </div>
      )}
    </FadeIn>
  );
};
