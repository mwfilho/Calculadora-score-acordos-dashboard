"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MideaHeader from "./MideaHeader";
import TabNavigation from "./TabNavigation";
import DashboardGeral from "./DashboardGeral";
import CalculadoraScorecard from "./CalculadoraScorecard";

export default function MideaApp() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "calculator">("dashboard");

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-[1600px] mx-auto">
        <MideaHeader />
        
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        <AnimatePresence mode="wait">
          {activeTab === "dashboard" ? (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <DashboardGeral />
            </motion.div>
          ) : (
            <motion.div
              key="calculator"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CalculadoraScorecard />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}