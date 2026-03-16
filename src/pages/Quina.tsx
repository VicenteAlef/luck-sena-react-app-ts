import { useEffect, useState } from 'react';
import { Ball, Title, Title2 } from '../components/Commons';
import FadeIn from '../components/FadeIn';
import { sortearNumeros } from '../utils/drawer';
import Button from '../components/Button';

export const Quina = () => {
  const [numbers, setNumbers] = useState([]);
  const [concurso, setConcurso] = useState('');
  const [date, setDate] = useState('');
  const [result, setResult] = useState<number[]>([]);
  const [quantidade, setQuantidade] = useState(5);
  const [nextValue, setNextValue] = useState();

  useEffect(() => {
    document.title = 'LuckSena - Quina';
    async function getResult() {
      try {
        const response = await fetch(
          'https://loteriascaixa-api.herokuapp.com/api/quina/latest',
        );
        const data = await response.json();
        setNumbers(data.dezenas);
        setConcurso(data.concurso);
        setDate(data.data);
        setNextValue(
          data.valorAcumuladoProximoConcurso.toLocaleString('pt-BR', {
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
    const resultado = sortearNumeros(1, 80, quantidade);
    setResult(resultado);
  }

  const opcoesQuantidade = Array.from({ length: 11 }, (_, i) => i + 5); // 5 a 15

  return (
    <FadeIn direction="right" delay={200}>
      <Title>Quina</Title>
      <div>
        <div>
          {concurso && (
            <p className="my-5 sm:text-xl text-gray-700">
              Resultado do último concurso: <strong>{concurso}</strong> - {date}
            </p>
          )}

          <div className="flex gap-5 flex-wrap mb-8">
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

      <form
        onSubmit={handleGenerate}
        className="flex flex-col sm:flex-row items-center gap-4 my-10"
      >
        <div className="flex flex-col">
          <label
            htmlFor="quantidade"
            className="sm:text-xl font-semibold mb-1 text-gray-600"
          >
            Quantos números deseja jogar?
          </label>
          <select
            id="quantidade"
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
          >
            {opcoesQuantidade.map((num) => (
              <option key={num} value={num}>
                {num} números
              </option>
            ))}
          </select>
        </div>

        <Button type="submit">Gerar Números</Button>
      </form>

      {result.length > 0 && (
        <div className="max-w-110 flex gap-5 flex-wrap bg-gray-50 p-6 rounded-xl border border-gray-200">
          {result.map((number) => (
            <Ball key={`result-${String(number)}`}>{String(number)}</Ball>
          ))}
        </div>
      )}
    </FadeIn>
  );
};
