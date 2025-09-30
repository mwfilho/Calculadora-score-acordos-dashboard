"use client";

import { motion } from "framer-motion";
import { BarChart3, Calculator } from "lucide-react";

interface TabNavigationProps {
  activeTab: "dashboard" | "calculator";
  onTabChange: (tab: "dashboard" | "calculator") => void;
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="glass rounded-2xl p-2 mb-6 inline-flex gap-2">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onTabChange("dashboard")}
        className={`relative px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
          activeTab === "dashboard"
            ? "text-white"
            : "text-[#005A8C] hover:bg-white/50"
        }`}
      >
        {activeTab === "dashboard" && (
          <motion.div
            layoutId="activeTab"
            className="absolute inset-0 bg-gradient-to-r from-[#00A0E3] to-[#005A8C] rounded-xl"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
        <BarChart3 className="w-5 h-5 relative z-10" />
        <span className="relative z-10">Dashboard Geral</span>
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onTabChange("calculator")}
        className={`relative px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
          activeTab === "calculator"
            ? "text-white"
            : "text-[#005A8C] hover:bg-white/50"
        }`}
      >
        {activeTab === "calculator" && (
          <motion.div
            layoutId="activeTab"
            className="absolute inset-0 bg-gradient-to-r from-[#00A0E3] to-[#005A8C] rounded-xl"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
        <Calculator className="w-5 h-5 relative z-10" />
        <span className="relative z-10">Calculadora Scorecard</span>
      </motion.button>
    </div>
  );
}