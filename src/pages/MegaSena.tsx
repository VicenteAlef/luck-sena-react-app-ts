import { useEffect, useState } from 'react';
import { Ball, Title, Title2 } from '../components/Commons';
import FadeIn from '../components/FadeIn';
import { sortearNumeros } from '../utils/drawer';
import Button from '../components/Button';

export const MegaSena = () => {
  const [numbers, setNumbers] = useState([]);
  const [concurso, setConcurso] = useState('');
  const [date, setDate] = useState('');
  const [result, setResult] = useState<number[]>([]);
  const [quantidade, setQuantidade] = useState(6);
  const [nextValue, setNextValue] = useState();

  useEffect(() => {
    document.title = 'LuckSena - Mega Sena';

    async function getResult() {
      try {
        const response = await fetch(
          'https://loteriascaixa-api.herokuapp.com/api/megasena/latest',
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
        console.error('Erro ao buscar o último concurso:', error);
      }
    }

    getResult();
  }, []);

  function handleGenerate(e: any) {
    e.preventDefault(); // Evita o recarregamento da página ao submeter o formulário
    let min = 1;
    let max = 60;
    const resultado = sortearNumeros(min, max, quantidade);
    setResult(resultado);
  }

  // Gera um array com os números de 6 a 15 para o select
  const opcoesQuantidade = Array.from({ length: 10 }, (_, i) => i + 6);

  return (
    <FadeIn direction="right" delay={200}>
      <Title>Mega Sena</Title>
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
