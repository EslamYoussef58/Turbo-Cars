"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SimpleFilterBox() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [carType, setCarType] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query.trim()) params.append("query", query.trim());
    if (carType) params.append("carType", carType);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-10 bg-gray-700/70 p-6 rounded-xl shadow-md border border-gray-200">


      
      <div className="space-y-4">
        {/* <Input
          placeholder="Search for your car"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="bg-gray-100"
        /> */}



        <Button
          onClick={handleSearch}
          className="w-full bg-red-600 hover:bg-red-500 text-white"
        >
          <Search className="w-4 h-4 mr-2" />
          Advanced Search
        </Button>
      </div>
    </div>
  );
}
