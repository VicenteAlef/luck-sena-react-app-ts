export type LotteryType =
  | 'megasena'
  | 'lotofacil'
  | 'quina'
  | 'lotomania'
  | 'maismilionaria'
  | 'duplasena'
  | 'diadesorte'
  | 'timemania'
  | 'supersete'
  | 'federal';

export interface LotteryPrize {
  descricao: string;
  faixa: number;
  ganhadores: number;
  valorPremio: number;
}

export interface LotteryApiData {
  loteria: string;
  concurso: number;
  data: string;
  local?: string;
  concursoEspecial?: boolean;
  dezenas: string[];
  dezenasOrdemSorteio?: string[];
  trevos?: string[];
  timeCoracao?: string | null;
  mesSorte?: string | null;
  premiacoes?: LotteryPrize[];
  estadosPremiados?: unknown[];
  observacao?: string;
  acumulou: boolean;
  proximoConcurso?: number;
  dataProximoConcurso?: string;
  valorArrecadado?: number;
  valorAcumuladoProximoConcurso?: number;
  valorEstimadoProximoConcurso?: number;
}

export interface LotteryConfig {
  id: LotteryType;
  slug: string;
  name: string;
  fullName: string;
  description: string;
  primaryColor: string;
  badgeBg: string;
  badgeText: string;
  ballBg: string;
  accentBorder: string;
  minNumber: number;
  maxNumber: number;
  defaultPickQuantity: number;
  allowedPickQuantities: number[];
  hasTrevos?: boolean;
  minTrevos?: number;
  maxTrevos?: number;
  hasTimeCoracao?: boolean;
  hasMesSorte?: boolean;
  hasColumns?: boolean; // For Super Sete (7 columns of 0-9)
  isDuplaSena?: boolean; // 2 draws of 6 numbers
  isFederal?: boolean; // 5 tickets of 5-6 digits
  howToPlay: string;
  drawDays: string;
}

export interface GeneratedBet {
  numbers: number[];
  trevos?: number[];
  mesSorte?: string;
  timeCoracao?: string;
  columns?: number[][];
  timestamp: number;
}
