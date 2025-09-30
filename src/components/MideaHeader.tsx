"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function MideaHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-dark rounded-3xl p-6 md:p-8 mb-8 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#00A0E3]/5 via-[#7DD4F5]/5 to-[#00A0E3]/5 animate-gradient" />
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="relative"
          >
            <img
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/mascote_1-1759235606883.png"
              alt="Midea Mascot"
              className="w-20 h-20 md:w-24 md:h-24 object-contain animate-float"
            />
          </motion.div>
          
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
              Jurídico Consumidor • Performance de Acordos (GPS)
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Análise Executiva • Janeiro a Setembro 2025
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
    </motion.div>
  );
}