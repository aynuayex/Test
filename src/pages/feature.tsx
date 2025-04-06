import PricingSection from "@/components/PricingSection";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { motion } from "framer-motion";

const Feature = () => {
  const [value, setValue] = useState("monthly");

  const handleChange = (val: string) => {
    setValue(val);
  };

  return (
    <div className="w-full h-[calc(100vh-80px)] flex flex-col justify-between items-center text-white">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold">
          Flexible <span className="text-[#ffa200]">Plans</span>
        </h1>
        <p className="font-semibold text-lg text-white/90 max-w-xl mb-1">
          Choose a Plan that work best for you & your team
        </p>
      </div>

      <Tabs value={value} onValueChange={handleChange} className="-mt-15">
        <TabsList className="bg-[#1d3752] backdrop-blur-md border border-[#1d3752]/20 rounded-full h-15 p-1 shadow-md">
          <TabsTrigger
            value="monthly"
            className="data-[state=active]:bg-[#ffa200] px-12 rounded-full text-white text-sm font-medium transition"
          >
            Monthly
          </TabsTrigger>
          <TabsTrigger
            value="yearly"
            className="data-[state=active]:bg-[#ffa200] px-8 rounded-full text-white text-sm font-medium transition"
          >
            Yearly(Save 60%)
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <motion.div
        key={value}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full"
      >
        <PricingSection value={value} />
      </motion.div>
    </div>
  );
};

export default Feature;
