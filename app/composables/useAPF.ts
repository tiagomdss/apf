import type { FunctionPoint, Complexity, FPWeighting, SustainItem, PhaseDistribution } from '~/types/apf'

/**
 * Composable principal para cálculos de Análise de Pontos de Função
 * Implementa as regras do IFPUG CPM 4.3.1 e Roteiro SISP v2.3
 */
export const useAPF = () => {
  /**
   * Tabela de pontuação por tipo de função e complexidade
   * Baseada no manual IFPUG CPM 4.3.1
   */
  const fpWeighting: FPWeighting = {
    ALI: { Baixa: 7, Média: 10, Alta: 15 },
    AIE: { Baixa: 5, Média: 7, Alta: 10 },
    EE: { Baixa: 3, Média: 4, Alta: 6 },
    SE: { Baixa: 4, Média: 5, Alta: 7 },
    CE: { Baixa: 3, Média: 4, Alta: 6 }
  }

  /**
   * Matriz de complexidade para Arquivos Lógicos (ALI/AIE)
   * Baseada em TDEs (Tipos de Dados Elementares) e TRs (Tipos de Registro)
   */
  const getDataComplexity = (dets: number, rets: number): Complexity => {
    if (rets <= 1) {
      if (dets >= 1 && dets <= 19) return 'Baixa'
      if (dets >= 20 && dets <= 50) return 'Baixa'
      return 'Média'
    } else if (rets >= 2 && rets <= 5) {
      if (dets >= 1 && dets <= 19) return 'Baixa'
      if (dets >= 20 && dets <= 50) return 'Média'
      return 'Alta'
    } else {
      if (dets >= 1 && dets <= 19) return 'Média'
      return 'Alta'
    }
  }

  /**
   * Matriz de complexidade para Entradas Externas (EE)
   * Baseada em TDEs e ARs (Arquivos Referenciados)
   */
  const getEEComplexity = (dets: number, ftrs: number): Complexity => {
    if (ftrs <= 1) {
      if (dets >= 1 && dets <= 4) return 'Baixa'
      if (dets >= 5 && dets <= 15) return 'Baixa'
      return 'Média'
    } else if (ftrs === 2) {
      if (dets >= 1 && dets <= 4) return 'Baixa'
      if (dets >= 5 && dets <= 15) return 'Média'
      return 'Alta'
    } else {
      if (dets >= 1 && dets <= 4) return 'Média'
      return 'Alta'
    }
  }

  /**
   * Matriz de complexidade para Saídas (SE) e Consultas (CE)
   * Baseada em TDEs e ARs
   */
  const getSECEComplexity = (dets: number, ftrs: number): Complexity => {
    if (ftrs <= 1) {
      if (dets >= 1 && dets <= 5) return 'Baixa'
      if (dets >= 6 && dets <= 19) return 'Baixa'
      return 'Média'
    } else if (ftrs >= 2 && ftrs <= 3) {
      if (dets >= 1 && dets <= 5) return 'Baixa'
      if (dets >= 6 && dets <= 19) return 'Média'
      return 'Alta'
    } else {
      if (dets >= 1 && dets <= 5) return 'Média'
      return 'Alta'
    }
  }

  /**
   * Calcula os pontos de função para uma função específica
   * Retorna a complexidade e os pontos calculados
   */
  const calculateFunctionPoints = (func: FunctionPoint): { complexity: Complexity | 'N/A', points: number } => {
    // Item de sustentação tem pontuação fixa
    if (func.isSustainItem) {
      return { complexity: 'N/A', points: func.points || 0 }
    }

    // Validação básica
    if (!func.dets || func.dets < 1) {
      return { complexity: 'N/A', points: 0 }
    }

    let complexity: Complexity

    // Determina complexidade baseada no tipo de função
    if (func.type === 'ALI' || func.type === 'AIE') {
      if (!func.rets || func.rets < 1) {
        return { complexity: 'N/A', points: 0 }
      }
      complexity = getDataComplexity(func.dets, func.rets)
    } else {
      const ftrs = func.ftrs !== null && func.ftrs !== undefined ? func.ftrs : 0
      if (func.type === 'EE') {
        complexity = getEEComplexity(func.dets, ftrs)
      } else {
        complexity = getSECEComplexity(func.dets, ftrs)
      }
    }

    // Calcula pontos baseado na complexidade
    const points = fpWeighting[func.type][complexity]
    return { complexity, points }
  }

  /**
   * Itens de sustentação/especiais
   * Baseado no Roteiro de Métricas (ANEXO E)
   */
  const sustainItems: SustainItem[] = [
    { name: 'Apuração Especial', points: 0.631 },
    { name: 'Verificação de Erros', points: 0.631 },
    { name: 'Atualização de Dados', points: 0.631 },
    { name: 'Manutenção de Página Estática (por pág.)', points: 0.20 },
    { name: 'Manutenção Corretiva', points: 0.631 },
    { name: 'Suporte', points: 0.631 },
    { name: 'Solução de Contorno', points: 0.631 }
  ]

  /**
   * Distribuição de esforço por fase do projeto
   * Baseado no Roteiro de Métricas (ANEXO E)
   */
  const phaseDistribution: PhaseDistribution[] = [
    { name: 'Levantamento Preliminar', percent: 0.02 },
    { name: 'Requisitos de Desenvolvimento', percent: 0.18 },
    { name: 'Requisitos de Teste', percent: 0.05 },
    { name: 'Design e Arquitetura', percent: 0.10 },
    { name: 'Implementação', percent: 0.40 },
    { name: 'Testes', percent: 0.15 },
    { name: 'Homologação', percent: 0.05 },
    { name: 'Implantação', percent: 0.05 }
  ]

  /**
   * Calcula o fator de ponderação baseado no tipo de demanda
   * Usado para estimar esforço de manutenção e evolução
   */
  const getDemandWeightFactor = (demandType: string, sameRelease: boolean): number => {
    if (demandType === 'new') return 1.0
    if (demandType === 'enhancement') return sameRelease ? 0.50 : 0.75
    if (demandType === 'bug') return sameRelease ? 0.00 : 0.25
    return 1.0
  }

  /**
   * Calcula o multiplicador de esforço baseado no contexto do projeto
   */
  const getProjectContextMultiplier = (context: string): number => {
    if (context === 'new') return 1.0
    if (context === 'evolution') return 1.25 // 25% mais esforço
    if (context === 'legacy') return 1.75 // 75% mais esforço
    return 1.0
  }

  return {
    fpWeighting,
    calculateFunctionPoints,
    sustainItems,
    phaseDistribution,
    getDemandWeightFactor,
    getProjectContextMultiplier
  }
}
