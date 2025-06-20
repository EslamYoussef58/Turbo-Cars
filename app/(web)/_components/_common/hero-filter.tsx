"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Wrench, Car, FilterX, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const SERVICE_TYPE_OPTIONS = [
  { label: "Premium Maintenance", value: "premium", icon: <Sparkles className="w-4 h-4 text-blue-400" /> },
  { label: "Routine Checkup", value: "routine", icon: <Wrench className="w-4 h-4 text-blue-400" /> },
  { label: "Performance Upgrade", value: "performance", icon: <Car className="w-4 h-4 text-blue-400" /> },
];

const CAR_BRAND_OPTIONS = [
  { label: "Tesla", value: "tesla" },
  { label: "Porsche", value: "porsche" },
  { label: "Audi", value: "audi" },
  { label: "Lexus", value: "lexus" },
];

const CAR_TYPE_OPTIONS = [
  { label: "Electric", value: "electric" },
  { label: "Luxury", value: "luxury" },
  { label: "Sports", value: "sports" },
];

const HeroFilter = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"quick" | "advanced">("quick");
  const [filters, setFilters] = useState({
    serviceType: "",
    brand: "",
    carType: "",
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.append("query", searchQuery);
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    router.push(`/search?${params.toString()}`);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setFilters({ serviceType: "", brand: "", carType: "" });
  };

  const hasActiveFilters = Object.values(filters).some(Boolean) || searchQuery;

  return (
    <div className="w-full max-w-5xl mx-auto bg-gray-900/70 backdrop-blur-md p-8 rounded-2xl shadow-2xl shadow-blue-900/40 border border-blue-700/50">
      {/* Header with animated gradient */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-200 mb-2">
          Find Your Perfect Car Service
        </h1>
        <p className="text-gray-300 text-lg">
          Discover premium automotive care tailored for your vehicle
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8 gap-6">
        <Link href="/search"
          onClick={() => setActiveTab("quick")}
          className={`px-6 py-2 rounded-full font-semibold transition ${
            activeTab === "quick"
              ? "bg-blue-600 text-white shadow-lg"
              : "text-blue-400 hover:text-white"
          }`}
        >
          Quick Search
        </Link>

      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Quick Search Tab */}
        {activeTab === "quick" && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="relative">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ..."
                className="w-full py-6 pl-6 pr-16 text-lg bg-gray-800 text-white border-2 border-gray-700 rounded-xl focus:border-blue-400 focus:bg-gray-900 transition-all"
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <Button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-700 hover:bg-blue-600 rounded-lg px-6 py-5 shadow-lg text-white"
              >
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              {["Oil Change", "Brake Service", "Tire Rotation", "Detailing", "Diagnostics"].map((service) => (
                <motion.button
                  key={service}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSearchQuery(service)}
                  className="px-4 py-2 bg-transparent border border-blue-500 rounded-full text-sm font-medium text-blue-300 hover:bg-blue-500 hover:text-white transition-all shadow-sm"
                >
                  {service}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}



        {/* Visual Enhancement */}
        <motion.div 
          animate={{ 
            x: [0, 5, -5, 0],
            transition: { 
              repeat: Infinity, 
              duration: 4,
              ease: "easeInOut" 
            } 
          }}
          className="hidden md:flex justify-center opacity-30"
        >
          <Car className="h-12 w-12 text-blue-400" />
        </motion.div>
      </div>
    </div>
  );
};

// Enhanced Select Component
const SelectFilter = ({ label, options, value, onChange }: any) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-blue-300">{label}</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full border-2 border-blue-600 hover:border-blue-400 rounded-xl py-5 pl-4 pr-3 bg-gray-800 text-white">
          <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent className="rounded-xl border-2 border-blue-700 bg-gray-900 shadow-xl text-white">
          <SelectGroup>
            {options.map((option: any) => (
              <SelectItem 
                key={option.value} 
                value={option.value}
                className="flex items-center gap-2 hover:bg-blue-700 rounded-lg"
              >
                {option.icon && <span className="text-blue-400">{option.icon}</span>}
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default HeroFilter;
