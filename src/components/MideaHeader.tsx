"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function MideaHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-dark rounded-3xl p-6 mb-8 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#00A0E3]/5 via-[#7DD4F5]/5 to-[#00A0E3]/5 animate-gradient" />
      
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-6">
          <motion.div
            className="animate-float"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/image_rmbg_edited_2025_09_11-1-1759199420181.png"
              alt="Midea Carrier Mascot"
              width={120}
              height={120}
              className="drop-shadow-2xl"
            />
          </motion.div>
          
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00A0E3] to-[#005A8C] bg-clip-text text-transparent">
              Dashboard Jurídico Consumidor
            </h1>
            <p className="text-[#005A8C] font-medium mt-1">
              Midea Carrier - Gestão Estratégica de Performance
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Análise de Acordos e KPIs | Janeiro - Setembro 2025
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Image
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/1656e05c-3243-4981-a910-9ca025f103cc-1759199419674.jpeg"
            alt="Midea Carrier Logo"
            width={200}
            height={60}
            className="object-contain"
          />
        </div>
      </div>
    </motion.header>
  );
}