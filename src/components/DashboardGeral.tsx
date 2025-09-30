"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { TrendingUp, TrendingDown, FileText, DollarSign, Target, Clock, CheckCircle, AlertCircle } from "lucide-react";
import MetricCard from "./MetricCard";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  ComposedChart, 
  Area 
} from "recharts";

// Dados reais do PDF
const monthlyData = [
  { month: "Jan", acordos: 46, ticketMedio: 2033, conversao: 28.5, mixOF: 8.5 },
  { month: "Fev", acordos: 87, ticketMedio: 2126, conversao: 29.1, mixOF: 9.2 },
  { month: "Mar", acordos: 114, ticketMedio: 2148, conversao: 29.8, mixOF: 10.1 },
  { month: "Abr", acordos: 124, ticketMedio: 2012, conversao: 28.9, mixOF: 11.3 },
  { month: "Mai", acordos: 102, ticketMedio: 2157, conversao: 29.5, mixOF: 10.8 },
  { month: "Jun", acordos: 73, ticketMedio: 2190, conversao: 28.7, mixOF: 9.7 },
  { month: "Jul", acordos: 126, ticketMedio: 2022, conversao: 30.1, mixOF: 11.5 },
  { month: "Ago", acordos: 97, ticketMedio: 2256, conversao: 39.2, mixOF: 11.8, gps: true },
  { month: "Set", acordos: 87, ticketMedio: 2031, conversao: 38.6, mixOF: 12.2, gps: true },
];

const stateData = [
  { estado: "RJ", acordos: 257, ticketMedio: 2354 },
  { estado: "BA", acordos: 230, ticketMedio: 2803 },
  { estado: "SP", acordos: 58, ticketMedio: 1312 },
  { estado: "PE", acordos: 54, ticketMedio: 1726 },
  { estado: "MG", acordos: 35, ticketMedio: 2014 },
];

const clusterData = [
  { name: "Premium", value: 69.9, acordos: 630 },
  { name: "Emergente", value: 13.8, acordos: 118 },
  { name: "Standard", value: 10.2, acordos: 87 },
  { name: "Especial", value: 6.2, acordos: 53 },
];

const motivosRecusa = [
  { motivo: "Sem interesse do reclamante", quantidade: 170, percentual: 58.8 },
  { motivo: "Saiu sentença", quantidade: 33, percentual: 11.4 },
  { motivo: "Sem retorno da parte", quantidade: 23, percentual: 8.0 },
  { motivo: "Contraproposta > alçada", quantidade: 21, percentual: 7.3 },
  { motivo: "Outros motivos", quantidade: 42, percentual: 14.5 },
];

const COLORS = ["#00A0E3", "#7DD4F5", "#005A8C", "#003D5C"];

type SubTab = "visao-geral" | "analise-recusas";

export default function DashboardGeral() {
  const [subTab, setSubTab] = useState<SubTab>("visao-geral");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Sub-Tabs Navigation */}
      <div className="glass-dark rounded-2xl p-2">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSubTab("visao-geral")}
            className={`flex-1 min-w-[200px] px-4 py-3 rounded-xl font-semibold transition-all ${
              subTab === "visao-geral"
                ? "bg-gradient-to-r from-[#00A0E3] to-[#005A8C] text-white shadow-lg"
                : "text-gray-600 hover:bg-white/50"
            }`}
          >
            📊 Visão Geral
          </button>
          <button
            onClick={() => setSubTab("analise-recusas")}
            className={`flex-1 min-w-[200px] px-4 py-3 rounded-xl font-semibold transition-all ${
              subTab === "analise-recusas"
                ? "bg-gradient-to-r from-[#00A0E3] to-[#005A8C] text-white shadow-lg"
                : "text-gray-600 hover:bg-white/50"
            }`}
          >
            🔍 Análise de Recusas
          </button>
        </div>
      </div>

      {/* Visão Geral */}
      {subTab === "visao-geral" && (
        <motion.div
          key="visao-geral"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Total de Acordos"
              value={856}
              subtitle="Janeiro - Setembro 2025"
              icon={FileText}
              trend="up"
              trendValue="+12.3%"
              delay={0}
            />
            <MetricCard
              title="Valor Negociado"
              value="R$ 3.200.000"
              subtitle="Período completo"
              icon={DollarSign}
              trend="down"
              trendValue="-8.5%"
              delay={0.1}
            />
            <MetricCard
              title="Taxa de Conversão GPS"
              value="38.9%"
              subtitle="Ago-Set/2025"
              icon={Target}
              trend="up"
              trendValue="+9.7 p.p."
              delay={0.2}
            />
            <MetricCard
              title="Tempo Médio Fechamento"
              value="19.6"
              subtitle="dias (meta: 15 dias)"
              icon={Clock}
              trend="down"
              trendValue="-1.2 dias"
              delay={0.3}
            />
          </div>

          {/* GPS Impact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Período PRÉ-GPS (Jan-Jul)</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Acordos Realizados</span>
                  <span className="font-bold text-[#005A8C]">672</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Taxa de Conversão</span>
                  <span className="font-bold text-[#005A8C]">29,2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Ticket Médio Pré-Sentença</span>
                  <span className="font-bold text-[#005A8C]">R$ 2.097</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tempo Médio Fechamento</span>
                  <span className="font-bold text-[#005A8C]">20,8 dias</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="glass rounded-2xl p-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-transparent rounded-bl-full" />
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Período PÓS-GPS (Ago-Set)</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Acordos Realizados</span>
                  <span className="font-bold text-green-600">184</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Taxa de Conversão</span>
                  <span className="font-bold text-green-600">38,9% ↑</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Ticket Médio Pré-Sentença</span>
                  <span className="font-bold text-green-600">R$ 1.840 ↓</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tempo Médio Fechamento</span>
                  <span className="font-bold text-green-600">19,6 dias ↓</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Evolution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="glass-dark rounded-2xl p-6"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4">Evolução Mensal - Volume de Acordos</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="acordos" fill="#00A0E3" name="Acordos" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Conversion Rate Trend */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="glass-dark rounded-2xl p-6"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4">Taxa de Conversão - Impacto GPS</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="conversao"
                    stroke="#00A0E3"
                    strokeWidth={3}
                    name="Taxa de Conversão (%)"
                    dot={{ fill: "#00A0E3", r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* State Performance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="glass-dark rounded-2xl p-6"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4">Performance por Estado (Top 5)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stateData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis type="number" stroke="#6B7280" />
                  <YAxis dataKey="estado" type="category" stroke="#6B7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="acordos" fill="#005A8C" name="Acordos" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Mix OF Evolution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="glass-dark rounded-2xl p-6"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4">Evolução Mix OF (sem DM) - YTD</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="mixOF"
                    stroke="#7DD4F5"
                    strokeWidth={3}
                    name="Mix OF sem DM (%)"
                    dot={{ fill: "#7DD4F5", r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Cluster Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="glass-dark rounded-2xl p-6 lg:col-span-2"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4">Distribuição por Cluster Regional</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={clusterData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {clusterData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Análise de Recusas */}
      {subTab === "analise-recusas" && (
        <motion.div
          key="analise-recusas"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-dark rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Total de Recusas</h3>
              </div>
              <div className="text-4xl font-bold text-red-600">289</div>
              <p className="text-sm text-gray-600 mt-2">Agosto - Setembro 2025</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="glass-dark rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Target className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Contraproposta Registrada</h3>
              </div>
              <div className="text-4xl font-bold text-orange-600">7,3%</div>
              <p className="text-sm text-gray-600 mt-2">Apenas 21 casos com contraproposta formal</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="glass-dark rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <DollarSign className="w-5 h-5 text-yellow-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Estados com Maior Recusa</h3>
              </div>
              <div className="text-2xl font-bold text-yellow-600">RJ (26,6%)</div>
              <p className="text-sm text-gray-600 mt-2">BA: 21,5% | PE: 10,0% | SP: 9,7%</p>
            </motion.div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-dark rounded-2xl p-6"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4">Principais Motivos de Recusa</h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={motivosRecusa} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis type="number" stroke="#6B7280" />
                  <YAxis dataKey="motivo" type="category" stroke="#6B7280" width={180} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="quantidade" fill="#EF4444" name="Quantidade" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-dark rounded-2xl p-6"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4">Distribuição Percentual</h3>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={motivosRecusa}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ motivo, percentual }) => `${percentual}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="quantidade"
                  >
                    <Cell fill="#EF4444" />
                    <Cell fill="#F97316" />
                    <Cell fill="#F59E0B" />
                    <Cell fill="#10B981" />
                    <Cell fill="#6B7280" />
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Detailed Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-dark rounded-2xl p-6"
          >
            <h3 className="text-lg font-bold text-gray-800 mb-4">Detalhamento dos Motivos (Ago-Set/2025)</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Motivo</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">Quantidade</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">Percentual</th>
                  </tr>
                </thead>
                <tbody>
                  {motivosRecusa.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-white/50 transition-colors">
                      <td className="py-3 px-4 text-gray-800">{item.motivo}</td>
                      <td className="py-3 px-4 text-right font-semibold text-gray-800">{item.quantidade}</td>
                      <td className="py-3 px-4 text-right text-gray-600">{item.percentual}%</td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-gray-200 font-bold">
                    <td className="py-3 px-4 text-gray-900">TOTAL</td>
                    <td className="py-3 px-4 text-right text-gray-900">289</td>
                    <td className="py-3 px-4 text-right text-gray-900">100%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Insights and Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-lg font-bold text-gray-800 mb-4">💡 Insights e Próximos Passos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-red-50 rounded-xl">
                <div className="text-red-700 font-bold mb-2">🔴 Sem interesse do reclamante (58,8%)</div>
                <p className="text-sm text-gray-700 mb-2">Principal motivo de recusa. Representa 170 casos perdidos.</p>
                <p className="text-xs text-red-600 font-semibold">Próximo Passo: Revisar timing e abordagem nas propostas</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-xl">
                <div className="text-orange-700 font-bold mb-2">🟠 Saiu sentença (11,4%)</div>
                <p className="text-sm text-gray-700 mb-2">33 casos onde a sentença foi publicada antes do acordo.</p>
                <p className="text-xs text-orange-600 font-semibold">Próximo Passo: Antecipar propostas antes da sentença</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-xl">
                <div className="text-yellow-700 font-bold mb-2">🟡 Sem retorno da parte (8,0%)</div>
                <p className="text-sm text-gray-700 mb-2">23 casos sem resposta do reclamante.</p>
                <p className="text-xs text-yellow-600 font-semibold">Próximo Passo: Implementar follow-up ativo</p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl">
                <div className="text-green-700 font-bold mb-2">🟢 Contraproposta > alçada (7,3%)</div>
                <p className="text-sm text-gray-700 mb-2">21 casos com contraproposta acima da alçada aprovada.</p>
                <p className="text-xs text-green-600 font-semibold">Próximo Passo: Revisar limites de alçada por estado</p>
              </div>
            </div>
          </motion.div>

          {/* States with Higher Rejection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="glass-dark rounded-2xl p-6"
          >
            <h3 className="text-lg font-bold text-gray-800 mb-4">🗺️ Estados com Maior Taxa de Recusa</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-xl">
                <div className="text-sm text-gray-600 mb-1">Rio de Janeiro</div>
                <div className="text-3xl font-bold text-red-600">26,6%</div>
                <div className="text-xs text-red-500 mt-1">Playbook específico + reforço</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                <div className="text-sm text-gray-600 mb-1">Bahia</div>
                <div className="text-3xl font-bold text-orange-600">21,5%</div>
                <div className="text-xs text-orange-500 mt-1">Campanha de conversão</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl">
                <div className="text-sm text-gray-600 mb-1">Pernambuco</div>
                <div className="text-3xl font-bold text-yellow-600">10,0%</div>
                <div className="text-xs text-yellow-500 mt-1">Follow-up ativo</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                <div className="text-sm text-gray-600 mb-1">São Paulo</div>
                <div className="text-3xl font-bold text-blue-600">9,7%</div>
                <div className="text-xs text-blue-500 mt-1">Campanha de brindes</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}