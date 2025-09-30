"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Target, TrendingUp, Zap, Award } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface KPIInputs {
  taxaConversao: number;
  volumeAcordos: number;
  mixNaoPecuniario: number;
  ticketMedioDMTotal: number;
  ticketMedioDMPreSentenca: number;
  taxaAcordosPreSentenca: number;
  tempoMedioFechamento: number;
}

const defaultValues: KPIInputs = {
  taxaConversao: 38.9,
  volumeAcordos: 92,
  mixNaoPecuniario: 18.2,
  ticketMedioDMTotal: 2150,
  ticketMedioDMPreSentenca: 1840,
  taxaAcordosPreSentenca: 73.9,
  tempoMedioFechamento: 19.6,
};

const metas = {
  taxaConversao: 50,
  volumeAcordos: 110,
  mixNaoPecuniario: 25,
  ticketMedioDMTotal: 1800,
  ticketMedioDMPreSentenca: 1600,
  taxaAcordosPreSentenca: 85,
  tempoMedioFechamento: 15,
};

// Componente de barra de progresso colorida
const ColoredProgressBar = ({ value, className = "" }: { value: number; className?: string }) => {
  const getColor = (score: number) => {
    if (score >= 90) return "bg-gradient-to-r from-yellow-500 to-yellow-600"; // 🏆 Alto
    if (score >= 85) return "bg-gradient-to-r from-green-500 to-green-600"; // 🟢 Bom
    if (score >= 75) return "bg-gradient-to-r from-yellow-400 to-yellow-500"; // 🟡 Médio
    return "bg-gradient-to-r from-red-500 to-red-600"; // 🔴 Baixo
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

  const calculateKPI = (atual: number, meta: number, inverter: boolean = false): number => {
    if (inverter) {
      // Para métricas onde menor é melhor (tickets e tempo)
      return Math.min(100, (meta / atual) * 100);
    }
    // Para métricas onde maior é melhor
    return Math.min(100, (atual / meta) * 100);
  };

  // Grupo 1: Volume & Aderência (30%)
  const kpi1_1 = calculateKPI(inputs.taxaConversao, metas.taxaConversao);
  const kpi1_2 = calculateKPI(inputs.volumeAcordos, metas.volumeAcordos);
  const grupo1Score = (kpi1_1 * 0.15 + kpi1_2 * 0.15);

  // Grupo 2: Qualidade e Performance (45%)
  const kpi2_1 = calculateKPI(inputs.mixNaoPecuniario, metas.mixNaoPecuniario);
  const kpi2_2 = calculateKPI(inputs.ticketMedioDMTotal, metas.ticketMedioDMTotal, true);
  const kpi2_3 = calculateKPI(inputs.ticketMedioDMPreSentenca, metas.ticketMedioDMPreSentenca, true);
  const grupo2Score = (kpi2_1 * 0.15 + kpi2_2 * 0.15 + kpi2_3 * 0.15);

  // Grupo 3: Eficiência (25%)
  const kpi3_1 = calculateKPI(inputs.taxaAcordosPreSentenca, metas.taxaAcordosPreSentenca);
  const kpi3_2 = calculateKPI(inputs.tempoMedioFechamento, metas.tempoMedioFechamento, true);
  const grupo3Score = (kpi3_1 * 0.15 + kpi3_2 * 0.10);

  const scoreFinal = grupo1Score + grupo2Score + grupo3Score;

  const getStatusColor = (score: number) => {
    if (score >= 90) return "text-yellow-600";
    if (score >= 85) return "text-green-600";
    if (score >= 75) return "text-yellow-500";
    return "text-red-600";
  };

  const getStatusBg = (score: number) => {
    if (score >= 90) return "from-yellow-500 to-yellow-600";
    if (score >= 85) return "from-green-500 to-green-600";
    if (score >= 75) return "from-yellow-400 to-yellow-500";
    return "from-red-500 to-red-600";
  };

  const getStatusEmoji = (score: number) => {
    if (score >= 90) return "🏆";
    if (score >= 85) return "🟢";
    if (score >= 75) return "🟡";
    return "🔴";
  };

  const getStatusLabel = (score: number) => {
    if (score >= 90) return "Alto: Excelente! Meta superada";
    if (score >= 85) return "Bom: Continue assim!";
    if (score >= 75) return "Médio: Regular — em desenvolvimento";
    return "Baixo: Necessita atenção!";
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
        <div className={`absolute inset-0 bg-gradient-to-br ${getStatusBg(scoreFinal)} opacity-5`} />
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-[#00A0E3] to-[#005A8C] rounded-xl">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Score Final do Escritório</h2>
                <p className="text-gray-600">Avaliação de Performance - Política GPS</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="mb-4">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-medium text-gray-600">Score Atual</span>
                  <span className={`text-sm font-semibold ${getStatusColor(scoreFinal)} flex items-center gap-1`}>
                    <span className="text-lg">{getStatusEmoji(scoreFinal)}</span>
                    {getStatusLabel(scoreFinal)}
                  </span>
                </div>
                <ColoredProgressBar value={scoreFinal} className="h-4" />
              </div>
              <div className={`text-6xl font-bold ${getStatusColor(scoreFinal)} mb-2 flex items-center gap-3`}>
                <span className="text-5xl">{getStatusEmoji(scoreFinal)}</span>
                {scoreFinal.toFixed(1)}%
              </div>
              <p className="text-gray-600">de 100% possível</p>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="glass rounded-xl p-4">
                <div className="text-sm text-gray-600 mb-1">Volume & Aderência</div>
                <div className="text-2xl font-bold text-[#00A0E3]">{grupo1Score.toFixed(1)}%</div>
                <div className="text-xs text-gray-500 mt-1">Peso: 30%</div>
              </div>
              <div className="glass rounded-xl p-4">
                <div className="text-sm text-gray-600 mb-1">Qualidade</div>
                <div className="text-2xl font-bold text-[#005A8C]">{grupo2Score.toFixed(1)}%</div>
                <div className="text-xs text-gray-500 mt-1">Peso: 45%</div>
              </div>
              <div className="glass rounded-xl p-4">
                <div className="text-sm text-gray-600 mb-1">Eficiência</div>
                <div className="text-2xl font-bold text-[#7DD4F5]">{grupo3Score.toFixed(1)}%</div>
                <div className="text-xs text-gray-500 mt-1">Peso: 25%</div>
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
              <p className="text-xs text-gray-600">Peso: 30%</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="taxaConversao" className="text-sm font-medium">
                Taxa de Conversão (%)
              </Label>
              <div className="mt-1 space-y-2">
                <Input
                  id="taxaConversao"
                  type="number"
                  value={inputs.taxaConversao}
                  onChange={(e) => setInputs({ ...inputs, taxaConversao: parseFloat(e.target.value) })}
                  className="glass"
                />
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Meta: {metas.taxaConversao}%</span>
                  <span className={`font-semibold flex items-center gap-1 ${getStatusColor(kpi1_1)}`}>
                    {getStatusEmoji(kpi1_1)} {kpi1_1.toFixed(1)}%
                  </span>
                </div>
                <ColoredProgressBar value={kpi1_1} />
              </div>
            </div>

            <div>
              <Label htmlFor="volumeAcordos" className="text-sm font-medium">
                Volume de Acordos/Mês
              </Label>
              <div className="mt-1 space-y-2">
                <Input
                  id="volumeAcordos"
                  type="number"
                  value={inputs.volumeAcordos}
                  onChange={(e) => setInputs({ ...inputs, volumeAcordos: parseFloat(e.target.value) })}
                  className="glass"
                />
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Meta: {metas.volumeAcordos}</span>
                  <span className={`font-semibold flex items-center gap-1 ${getStatusColor(kpi1_2)}`}>
                    {getStatusEmoji(kpi1_2)} {kpi1_2.toFixed(1)}%
                  </span>
                </div>
                <ColoredProgressBar value={kpi1_2} />
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
              <p className="text-xs text-gray-600">Peso: 45%</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="mixNaoPecuniario" className="text-sm font-medium">
                Mix Não-Pecuniário (%)
              </Label>
              <div className="mt-1 space-y-2">
                <Input
                  id="mixNaoPecuniario"
                  type="number"
                  value={inputs.mixNaoPecuniario}
                  onChange={(e) => setInputs({ ...inputs, mixNaoPecuniario: parseFloat(e.target.value) })}
                  className="glass"
                />
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Meta: {metas.mixNaoPecuniario}%</span>
                  <span className={`font-semibold flex items-center gap-1 ${getStatusColor(kpi2_1)}`}>
                    {getStatusEmoji(kpi2_1)} {kpi2_1.toFixed(1)}%
                  </span>
                </div>
                <ColoredProgressBar value={kpi2_1} />
              </div>
            </div>

            <div>
              <Label htmlFor="ticketMedioDMTotal" className="text-sm font-medium">
                Ticket Médio DM Total (R$)
              </Label>
              <div className="mt-1 space-y-2">
                <Input
                  id="ticketMedioDMTotal"
                  type="number"
                  value={inputs.ticketMedioDMTotal}
                  onChange={(e) => setInputs({ ...inputs, ticketMedioDMTotal: parseFloat(e.target.value) })}
                  className="glass"
                />
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Meta: R$ {metas.ticketMedioDMTotal}</span>
                  <span className={`font-semibold flex items-center gap-1 ${getStatusColor(kpi2_2)}`}>
                    {getStatusEmoji(kpi2_2)} {kpi2_2.toFixed(1)}%
                  </span>
                </div>
                <ColoredProgressBar value={kpi2_2} />
              </div>
            </div>

            <div>
              <Label htmlFor="ticketMedioDMPreSentenca" className="text-sm font-medium">
                Ticket Médio DM Pré-Sentença (R$)
              </Label>
              <div className="mt-1 space-y-2">
                <Input
                  id="ticketMedioDMPreSentenca"
                  type="number"
                  value={inputs.ticketMedioDMPreSentenca}
                  onChange={(e) => setInputs({ ...inputs, ticketMedioDMPreSentenca: parseFloat(e.target.value) })}
                  className="glass"
                />
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Meta: R$ {metas.ticketMedioDMPreSentenca}</span>
                  <span className={`font-semibold flex items-center gap-1 ${getStatusColor(kpi2_3)}`}>
                    {getStatusEmoji(kpi2_3)} {kpi2_3.toFixed(1)}%
                  </span>
                </div>
                <ColoredProgressBar value={kpi2_3} />
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
              <p className="text-xs text-gray-600">Peso: 25%</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="taxaAcordosPreSentenca" className="text-sm font-medium">
                Taxa Acordos Pré-Sentença (%)
              </Label>
              <div className="mt-1 space-y-2">
                <Input
                  id="taxaAcordosPreSentenca"
                  type="number"
                  value={inputs.taxaAcordosPreSentenca}
                  onChange={(e) => setInputs({ ...inputs, taxaAcordosPreSentenca: parseFloat(e.target.value) })}
                  className="glass"
                />
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Meta: {metas.taxaAcordosPreSentenca}%</span>
                  <span className={`font-semibold flex items-center gap-1 ${getStatusColor(kpi3_1)}`}>
                    {getStatusEmoji(kpi3_1)} {kpi3_1.toFixed(1)}%
                  </span>
                </div>
                <ColoredProgressBar value={kpi3_1} />
              </div>
            </div>

            <div>
              <Label htmlFor="tempoMedioFechamento" className="text-sm font-medium">
                Tempo Médio Fechamento (dias)
              </Label>
              <div className="mt-1 space-y-2">
                <Input
                  id="tempoMedioFechamento"
                  type="number"
                  value={inputs.tempoMedioFechamento}
                  onChange={(e) => setInputs({ ...inputs, tempoMedioFechamento: parseFloat(e.target.value) })}
                  className="glass"
                />
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Meta: {metas.tempoMedioFechamento} dias</span>
                  <span className={`font-semibold flex items-center gap-1 ${getStatusColor(kpi3_2)}`}>
                    {getStatusEmoji(kpi3_2)} {kpi3_2.toFixed(1)}%
                  </span>
                </div>
                <ColoredProgressBar value={kpi3_2} />
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
        <h4 className="font-bold text-gray-800 mb-4">Escala de Performance</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg">
            <span className="text-2xl">🏆</span>
            <div>
              <div className="font-bold text-yellow-700">Alto: ≥ 90%</div>
              <div className="text-xs text-yellow-600">Excelente! Meta superada</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <span className="text-2xl">🟢</span>
            <div>
              <div className="font-bold text-green-700">Bom: 85% – 89%</div>
              <div className="text-xs text-green-600">Bom. Continue assim!</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg">
            <span className="text-2xl">🟡</span>
            <div>
              <div className="font-bold text-yellow-600">Médio: 75% – 84%</div>
              <div className="text-xs text-yellow-500">Regular — em desenvolvimento</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-red-50 to-red-100 rounded-lg">
            <span className="text-2xl">🔴</span>
            <div>
              <div className="font-bold text-red-700">Baixo: &lt; 75%</div>
              <div className="text-xs text-red-600">Necessita atenção!</div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}