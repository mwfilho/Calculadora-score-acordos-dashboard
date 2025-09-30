"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Target, TrendingUp, Zap, Award, Info } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface KPIInputs {
  volumeAcordos: number;
  taxaConversao: number;
  mixOFSemDM: number;
  ticketMedioDMTotal: number;
  ticketMedioDMPreSentenca: number;
  taxaAcordosPreSentenca: number;
  tempoMedioFechamento: number;
}

const defaultValues: KPIInputs = {
  volumeAcordos: 92,
  taxaConversao: 38.9,
  mixOFSemDM: 12.0,
  ticketMedioDMTotal: 2144,
  ticketMedioDMPreSentenca: 1840,
  taxaAcordosPreSentenca: 73.9,
  tempoMedioFechamento: 19.6,
};

const metas = {
  volumeAcordos: 110,
  taxaConversao: 50,
  mixOFSemDM: 25,
  ticketMedioDMTotal: 1800,
  ticketMedioDMPreSentenca: 1600,
  taxaAcordosPreSentenca: 85,
  tempoMedioFechamento: 15,
};

// Pesos em pontos
const pesos = {
  volumeAcordos: 15,
  taxaConversao: 15,
  mixOFSemDM: 15,
  ticketMedioDMTotal: 15,
  ticketMedioDMPreSentenca: 15,
  taxaAcordosPreSentenca: 15,
  tempoMedioFechamento: 10,
};

const ColoredProgressBar = ({ value, className = "" }: { value: number; className?: string }) => {
  const getColor = (score: number) => {
    if (score >= 85) return "bg-gradient-to-r from-green-500 to-green-600";
    if (score >= 65) return "bg-gradient-to-r from-yellow-400 to-yellow-500";
    return "bg-gradient-to-r from-red-500 to-red-600";
  };

  return (
    <div className={`relative h-2 w-full overflow-hidden rounded-full bg-gray-200 ${className}`}>
      <div
        className={`h-full transition-all duration-500 ease-out ${getColor(value)}`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
};

export default function CalculadoraScorecard() {
  const [inputs, setInputs] = useState<KPIInputs>(defaultValues);

  // Função para calcular atingimento (cap em 100%)
  const calculateAtingimento = (atual: number, meta: number, menorMelhor: boolean = false): number => {
    if (menorMelhor) {
      return Math.min(100, (meta / atual) * 100);
    }
    return Math.min(100, (atual / meta) * 100);
  };

  // Grupo 1: Volume & Aderência (30 pts)
  const ating_volume = calculateAtingimento(inputs.volumeAcordos, metas.volumeAcordos);
  const pontos_volume = (ating_volume / 100) * pesos.volumeAcordos;
  
  const ating_conversao = calculateAtingimento(inputs.taxaConversao, metas.taxaConversao);
  const pontos_conversao = (ating_conversao / 100) * pesos.taxaConversao;
  
  const grupo1Pontos = pontos_volume + pontos_conversao;

  // Grupo 2: Qualidade e Performance (45 pts)
  const ating_mixOF = calculateAtingimento(inputs.mixOFSemDM, metas.mixOFSemDM);
  const pontos_mixOF = (ating_mixOF / 100) * pesos.mixOFSemDM;
  
  const ating_ticketTotal = calculateAtingimento(inputs.ticketMedioDMTotal, metas.ticketMedioDMTotal, true);
  const pontos_ticketTotal = (ating_ticketTotal / 100) * pesos.ticketMedioDMTotal;
  
  const ating_ticketPre = calculateAtingimento(inputs.ticketMedioDMPreSentenca, metas.ticketMedioDMPreSentenca, true);
  const pontos_ticketPre = (ating_ticketPre / 100) * pesos.ticketMedioDMPreSentenca;
  
  const grupo2Pontos = pontos_mixOF + pontos_ticketTotal + pontos_ticketPre;

  // Grupo 3: Eficiência (25 pts)
  const ating_preSentenca = calculateAtingimento(inputs.taxaAcordosPreSentenca, metas.taxaAcordosPreSentenca);
  const pontos_preSentenca = (ating_preSentenca / 100) * pesos.taxaAcordosPreSentenca;
  
  const ating_aging = calculateAtingimento(inputs.tempoMedioFechamento, metas.tempoMedioFechamento, true);
  const pontos_aging = (ating_aging / 100) * pesos.tempoMedioFechamento;
  
  const grupo3Pontos = pontos_preSentenca + pontos_aging;

  const performanceGlobalPontos = grupo1Pontos + grupo2Pontos + grupo3Pontos;

  const getStatusColor = (pontos: number) => {
    if (pontos >= 85) return "text-green-600";
    if (pontos >= 65) return "text-yellow-500";
    return "text-red-600";
  };

  const getStatusBg = (pontos: number) => {
    if (pontos >= 85) return "from-green-500 to-green-600";
    if (pontos >= 65) return "from-yellow-400 to-yellow-500";
    return "from-red-500 to-red-600";
  };

  const getStatusEmoji = (pontos: number) => {
    if (pontos >= 85) return "🟢";
    if (pontos >= 65) return "🟡";
    return "🔴";
  };

  const getStatusLabel = (pontos: number) => {
    if (pontos >= 85) return "Excelente! Meta superada";
    if (pontos >= 65) return "Regular — em desenvolvimento";
    return "Baixo - Necessita atenção!";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Score Final */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-dark rounded-3xl p-8 relative overflow-hidden"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${getStatusBg(performanceGlobalPontos)} opacity-5`} />
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-[#00A0E3] to-[#005A8C] rounded-xl">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Performance Global do Escritório</h2>
                <p className="text-gray-600">Scorecard de Performance - Política GPS</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="mb-4">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-medium text-gray-600">Performance Atual</span>
                  <span className={`text-sm font-semibold ${getStatusColor(performanceGlobalPontos)} flex items-center gap-1`}>
                    <span className="text-lg">{getStatusEmoji(performanceGlobalPontos)}</span>
                    {getStatusLabel(performanceGlobalPontos)}
                  </span>
                </div>
                <ColoredProgressBar value={performanceGlobalPontos} className="h-4" />
              </div>
              <div className={`text-6xl font-bold ${getStatusColor(performanceGlobalPontos)} mb-2 flex items-center gap-3`}>
                <span className="text-5xl">{getStatusEmoji(performanceGlobalPontos)}</span>
                {performanceGlobalPontos.toFixed(1)} pontos
              </div>
              <p className="text-gray-600">de 100 pontos possíveis</p>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="glass rounded-xl p-4">
                <div className="text-sm text-gray-600 mb-1">Volume & Aderência</div>
                <div className="text-2xl font-bold text-[#00A0E3]">{grupo1Pontos.toFixed(1)}</div>
                <div className="text-xs text-gray-500 mt-1">de 30 pontos</div>
              </div>
              <div className="glass rounded-xl p-4">
                <div className="text-sm text-gray-600 mb-1">Qualidade</div>
                <div className="text-2xl font-bold text-[#005A8C]">{grupo2Pontos.toFixed(1)}</div>
                <div className="text-xs text-gray-500 mt-1">de 45 pontos</div>
              </div>
              <div className="glass rounded-xl p-4">
                <div className="text-sm text-gray-600 mb-1">Eficiência</div>
                <div className="text-2xl font-bold text-[#7DD4F5]">{grupo3Pontos.toFixed(1)}</div>
                <div className="text-xs text-gray-500 mt-1">de 25 pontos</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* KPI Groups */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Grupo 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-dark rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-[#00A0E3] to-[#7DD4F5] rounded-lg">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Volume & Aderência</h3>
              <p className="text-xs text-gray-600">30 pontos</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="volumeAcordos" className="text-sm font-medium">
                Volume de Acordos/Mês (maior é melhor)
              </Label>
              <div className="mt-1 space-y-2">
                <Input
                  id="volumeAcordos"
                  type="number"
                  value={inputs.volumeAcordos}
                  onChange={(e) => setInputs({ ...inputs, volumeAcordos: parseFloat(e.target.value) || 0 })}
                  className="glass"
                />
                <div className="flex justify-between text-xs text-gray-600">
                  <span>{inputs.volumeAcordos} / Meta {metas.volumeAcordos}</span>
                  <span className={`font-semibold ${getStatusColor(pontos_volume)}`}>
                    {ating_volume.toFixed(1)}% → {pontos_volume.toFixed(1)} pts
                  </span>
                </div>
                <ColoredProgressBar value={ating_volume} />
              </div>
            </div>

            <div>
              <Label htmlFor="taxaConversao" className="text-sm font-medium">
                Taxa de Conversão (%) (maior é melhor)
              </Label>
              <div className="mt-1 space-y-2">
                <Input
                  id="taxaConversao"
                  type="number"
                  step="0.1"
                  value={inputs.taxaConversao}
                  onChange={(e) => setInputs({ ...inputs, taxaConversao: parseFloat(e.target.value) || 0 })}
                  className="glass"
                />
                <div className="flex justify-between text-xs text-gray-600">
                  <span>{inputs.taxaConversao}% / Meta {metas.taxaConversao}%</span>
                  <span className={`font-semibold ${getStatusColor(pontos_conversao)}`}>
                    {ating_conversao.toFixed(1)}% → {pontos_conversao.toFixed(1)} pts
                  </span>
                </div>
                <ColoredProgressBar value={ating_conversao} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Grupo 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-dark rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-[#005A8C] to-[#003D5C] rounded-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Qualidade e Performance</h3>
              <p className="text-xs text-gray-600">45 pontos</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Label htmlFor="mixOFSemDM" className="text-sm font-medium">
                  Mix Obrigação de Fazer (sem DM)
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p className="font-semibold mb-1">Definição:</p>
                      <p className="text-xs mb-2">Acordos com trocas, reparos, restituição ou visitas técnicas onde DM = 0</p>
                      <p className="font-semibold mb-1">Categorias:</p>
                      <ul className="text-xs list-disc list-inside">
                        <li>Troca de produto</li>
                        <li>Reparo técnico</li>
                        <li>Restituição de valores</li>
                        <li>Visita técnica</li>
                      </ul>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="space-y-2">
                <Input
                  id="mixOFSemDM"
                  type="number"
                  step="0.1"
                  value={inputs.mixOFSemDM}
                  onChange={(e) => setInputs({ ...inputs, mixOFSemDM: parseFloat(e.target.value) || 0 })}
                  className="glass"
                />
                <div className="flex justify-between text-xs text-gray-600">
                  <span>{inputs.mixOFSemDM}% / Meta {metas.mixOFSemDM}%</span>
                  <span className={`font-semibold ${getStatusColor(pontos_mixOF)}`}>
                    {ating_mixOF.toFixed(1)}% → {pontos_mixOF.toFixed(1)} pts
                  </span>
                </div>
                <ColoredProgressBar value={ating_mixOF} />
              </div>
            </div>

            <div>
              <Label htmlFor="ticketMedioDMTotal" className="text-sm font-medium">
                Ticket Médio DM Total (R$) (menor é melhor)
              </Label>
              <div className="mt-1 space-y-2">
                <Input
                  id="ticketMedioDMTotal"
                  type="number"
                  value={inputs.ticketMedioDMTotal}
                  onChange={(e) => setInputs({ ...inputs, ticketMedioDMTotal: parseFloat(e.target.value) || 0 })}
                  className="glass"
                />
                <div className="flex justify-between text-xs text-gray-600">
                  <span>R$ {inputs.ticketMedioDMTotal} / Meta R$ {metas.ticketMedioDMTotal}</span>
                  <span className={`font-semibold ${getStatusColor(pontos_ticketTotal)}`}>
                    {ating_ticketTotal.toFixed(1)}% → {pontos_ticketTotal.toFixed(1)} pts
                  </span>
                </div>
                <ColoredProgressBar value={ating_ticketTotal} />
              </div>
            </div>

            <div>
              <Label htmlFor="ticketMedioDMPreSentenca" className="text-sm font-medium">
                Ticket Médio DM Pré-Sentença (R$) (menor é melhor)
              </Label>
              <div className="mt-1 space-y-2">
                <Input
                  id="ticketMedioDMPreSentenca"
                  type="number"
                  value={inputs.ticketMedioDMPreSentenca}
                  onChange={(e) => setInputs({ ...inputs, ticketMedioDMPreSentenca: parseFloat(e.target.value) || 0 })}
                  className="glass"
                />
                <div className="flex justify-between text-xs text-gray-600">
                  <span>R$ {inputs.ticketMedioDMPreSentenca} / Meta R$ {metas.ticketMedioDMPreSentenca}</span>
                  <span className={`font-semibold ${getStatusColor(pontos_ticketPre)}`}>
                    {ating_ticketPre.toFixed(1)}% → {pontos_ticketPre.toFixed(1)} pts
                  </span>
                </div>
                <ColoredProgressBar value={ating_ticketPre} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Grupo 3 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-dark rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-[#7DD4F5] to-[#00A0E3] rounded-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Eficiência</h3>
              <p className="text-xs text-gray-600">25 pontos</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="taxaAcordosPreSentenca" className="text-sm font-medium">
                % de Acordos Pré-Sentença (maior é melhor)
              </Label>
              <div className="mt-1 space-y-2">
                <Input
                  id="taxaAcordosPreSentenca"
                  type="number"
                  step="0.1"
                  value={inputs.taxaAcordosPreSentenca}
                  onChange={(e) => setInputs({ ...inputs, taxaAcordosPreSentenca: parseFloat(e.target.value) || 0 })}
                  className="glass"
                />
                <div className="flex justify-between text-xs text-gray-600">
                  <span>{inputs.taxaAcordosPreSentenca}% / Meta {metas.taxaAcordosPreSentenca}%</span>
                  <span className={`font-semibold ${getStatusColor(pontos_preSentenca)}`}>
                    {ating_preSentenca.toFixed(1)}% → {pontos_preSentenca.toFixed(1)} pts
                  </span>
                </div>
                <ColoredProgressBar value={ating_preSentenca} />
              </div>
            </div>

            <div>
              <Label htmlFor="tempoMedioFechamento" className="text-sm font-medium">
                Aging - Tempo Médio (dias) (menor é melhor)
              </Label>
              <div className="mt-1 space-y-2">
                <Input
                  id="tempoMedioFechamento"
                  type="number"
                  step="0.1"
                  value={inputs.tempoMedioFechamento}
                  onChange={(e) => setInputs({ ...inputs, tempoMedioFechamento: parseFloat(e.target.value) || 0 })}
                  className="glass"
                />
                <div className="flex justify-between text-xs text-gray-600">
                  <span>{inputs.tempoMedioFechamento} dias / Meta {metas.tempoMedioFechamento} dias</span>
                  <span className={`font-semibold ${getStatusColor(pontos_aging)}`}>
                    {ating_aging.toFixed(1)}% → {pontos_aging.toFixed(1)} pts
                  </span>
                </div>
                <ColoredProgressBar value={ating_aging} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="glass rounded-2xl p-6"
      >
        <h4 className="font-bold text-gray-800 mb-4">Escala de Performance (Semáforo)</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <span className="text-2xl">🟢</span>
            <div>
              <div className="font-bold text-green-700">Verde: ≥ 85 pontos</div>
              <div className="text-xs text-green-600">Excelente! Meta superada</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg">
            <span className="text-2xl">🟡</span>
            <div>
              <div className="font-bold text-yellow-600">Amarelo: 65 - 84,9 pontos</div>
              <div className="text-xs text-yellow-500">Regular — em desenvolvimento</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-red-50 to-red-100 rounded-lg">
            <span className="text-2xl">🔴</span>
            <div>
              <div className="font-bold text-red-700">Vermelho: &lt; 65 pontos</div>
              <div className="text-xs text-red-600">Baixo - Necessita atenção!</div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}