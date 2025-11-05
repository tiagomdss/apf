/**
 * Tipos TypeScript para o sistema de Análise de Pontos de Função (APF)
 */

export type FunctionType = 'ALI' | 'AIE' | 'EE' | 'SE' | 'CE'
export type Complexity = 'Baixa' | 'Média' | 'Alta'
export type DemandType = 'new' | 'enhancement' | 'bug'
export type ProjectContext = 'new' | 'evolution' | 'legacy'

export interface FunctionPoint {
  id?: string
  name: string
  type: FunctionType
  dets: number // Tipos de Dados Elementares
  rets?: number | null // Tipos de Registro (para ALI/AIE)
  ftrs?: number | null // Arquivos Referenciados (para EE/SE/CE)
  complexity?: Complexity
  points?: number
  isSustainItem?: boolean
}

export interface SustainItem {
  name: string
  points: number
}

export interface SprintItem {
  desc: string
  type: DemandType
  rawPF: number
  sameRelease: boolean
}

export interface PortfolioProject {
  name: string
  pf: number
}

export interface PhaseDistribution {
  name: string
  percent: number
}

export interface ComplexityMatrix {
  [key: string]: (dets: number, rets: number) => Complexity
}

export interface FPWeighting {
  [key: string]: {
    Baixa: number
    Média: number
    Alta: number
  }
}
