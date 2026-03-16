/**
 * Sorteia uma quantidade de números únicos dentro de um intervalo.
 * * @param min - O número inicial (mínimo).
 * @param max - O número final (máximo).
 * @param quantidade - Quantos números devem ser sorteados.
 * @returns Um array de números ordenados de forma crescente.
 */
export function sortearNumeros(
  min: number,
  max: number,
  quantidade: number,
): number[] {
  // Validação básica para evitar loops infinitos ou erros de intervalo
  const intervalo = max - min + 1;
  if (quantidade > intervalo) {
    throw new Error(
      'A quantidade de números solicitada é maior que o intervalo disponível.',
    );
  }

  const numerosSorteados = new Set<number>();

  while (numerosSorteados.size < quantidade) {
    const numero = Math.floor(Math.random() * (max - min + 1)) + min;
    numerosSorteados.add(numero);
  }

  // Converte o Set para Array e ordena de forma crescente
  return Array.from(numerosSorteados).sort((a, b) => a - b);
}

// Exemplo de uso:
// try {
//   const resultado = sortearNumeros(0, 100, 6);
//   console.log('Números sorteados:', resultado);
// } catch (error) {
//   console.error(error.message);
// }
