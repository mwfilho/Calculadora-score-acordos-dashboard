"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  icon: LucideIcon;
  delay?: number;
}

export default function MetricCard({
  title,
  value,
  subtitle,
  trend,
  trendValue,
  icon: Icon,
  delay = 0,
}: MetricCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const numericValue = typeof value === "string" ? parseFloat(value.replace(/[^0-9.-]+/g, "")) : value;
  
  useEffect(() => {
    if (isNaN(numericValue)) {
      return;
    }
    
    let start = 0;
    const duration = 1500;
    const increment = numericValue / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= numericValue) {
        setDisplayValue(numericValue);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [numericValue]);
  
  const getTrendColor = () => {
    if (!trend) return "";
    return trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-gray-600";
  };
  
  const formattedValue = typeof value === "string" && value.includes("R$") 
    ? `R$ ${displayValue.toLocaleString("pt-BR")}`
    : typeof value === "string" && value.includes("%")
    ? `${displayValue.toFixed(1)}%`
    : typeof value === "number"
    ? displayValue.toLocaleString("pt-BR")
    : value;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0, 160, 227, 0.2)" }}
      className="glass rounded-2xl p-6 relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#00A0E3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-gradient-to-br from-[#00A0E3] to-[#005A8C] rounded-xl text-white">
            <Icon className="w-6 h-6" />
          </div>
          {trendValue && (
            <span className={`text-sm font-semibold ${getTrendColor()}`}>
              {trendValue}
            </span>
          )}
        </div>
        
        <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
        <p className="text-3xl font-bold text-[#005A8C] mb-1">{formattedValue}</p>
        {subtitle && (
          <p className="text-sm text-gray-500">{subtitle}</p>
        )}
      </div>
    </motion.div>
  );
}