import { MESES_DO_ANO, TIMES_CORACAO } from './lotteriesConfig';

/**
 * Sorteia uma quantidade de números únicos dentro de um intervalo.
 * @param min - O número inicial (mínimo).
 * @param max - O número final (máximo).
 * @param quantidade - Quantos números devem ser sorteados.
 * @returns Um array de números ordenados de forma crescente.
 */
export function sortearNumeros(
  min: number,
  max: number,
  quantidade: number,
): number[] {
  const intervalo = max - min + 1;
  if (quantidade > intervalo) {
    throw new Error(
      'A quantidade de números solicitada é maior que o intervalo disponível.',
    );
  }

  const numerosSorteados = new Set<number>();

  while (numerosSorteados.size < quantidade) {
    const numero = Math.floor(Math.random() * intervalo) + min;
    numerosSorteados.add(numero);
  }

  return Array.from(numerosSorteados).sort((a, b) => a - b);
}

/**
 * Sorteia trevos únicos para +Milionária (geralmente entre 1 e 6)
 */
export function sortearTrevos(quantidade = 2): number[] {
  return sortearNumeros(1, 6, Math.min(quantidade, 6));
}

/**
 * Sorteia um Mês de Sorte aleatório para Dia de Sorte
 */
export function sortearMesSorte(): string {
  const indice = Math.floor(Math.random() * MESES_DO_ANO.length);
  return MESES_DO_ANO[indice];
}

/**
 * Sorteia um Time do Coração aleatório para Timemania
 */
export function sortearTimeCoracao(): string {
  const indice = Math.floor(Math.random() * TIMES_CORACAO.length);
  return TIMES_CORACAO[indice];
}

/**
 * Sorteia números para o Super Sete (7 colunas de 0 a 9)
 * Garante pelo menos 1 número por coluna e distribui o restante se quantidade > 7
 */
export function sortearSuperSete(quantidadeTotal = 7): number[][] {
  const colunas: number[][] = Array.from({ length: 7 }, () => []);

  // 1 por coluna obrigatório
  for (let c = 0; c < 7; c++) {
    const num = Math.floor(Math.random() * 10);
    colunas[c].push(num);
  }

  let restantes = Math.min(quantidadeTotal, 21) - 7;
  // Distribui números adicionais respeitando o limite de até 3 por coluna
  while (restantes > 0) {
    const colDisponiveis = colunas
      .map((col, idx) => ({ col, idx }))
      .filter((item) => item.col.length < 3);

    if (colDisponiveis.length === 0) break;

    const sorteada =
      colDisponiveis[Math.floor(Math.random() * colDisponiveis.length)];
    let novoNum: number;
    do {
      novoNum = Math.floor(Math.random() * 10);
    } while (colunas[sorteada.idx].includes(novoNum));

    colunas[sorteada.idx].push(novoNum);
    colunas[sorteada.idx].sort((a, b) => a - b);
    restantes--;
  }

  return colunas;
}

/**
 * Sorteia bilhetes para Loteria Federal (números de 5 dígitos)
 */
export function sortearBilhetesFederal(quantidade = 1): string[] {
  const bilhetes: string[] = [];
  for (let i = 0; i < quantidade; i++) {
    const num = Math.floor(Math.random() * 100000);
    bilhetes.push(String(num).padStart(5, '0'));
  }
  return bilhetes;
}

/**
 * Confere acertos comparando uma lista de apostas com as dezenas sorteadas
 */
export function conferirAcertos(
  apostados: (number | string)[],
  sorteados: (number | string)[],
): { totalAcertos: number; acertos: (number | string)[] } {
  const setSorteados = new Set(
    sorteados.map((n) => Number(n).toString()),
  );

  const acertos = apostados.filter((n) =>
    setSorteados.has(Number(n).toString()),
  );

  return {
    totalAcertos: acertos.length,
    acertos,
  };
}
