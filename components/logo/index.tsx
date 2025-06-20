import { CarFrontIcon, Dot } from "lucide-react";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div
        className="relative size-7 bg-[#dc2626] rounded-full
        flex items-center justify-center
        shadow-md hover:shadow-lg hover:shadow-[#e5e7eb]/30 transition-all duration-300"
      >
        <CarFrontIcon className="w-5 h-5 text-white" />
        <span
          className="absolute -bottom-3 -right-2
            text-[#e5e7eb]
            "
        >
          <Dot className="w-3 h-3 animate-pulse" />
        </span>
      </div>
      <span className="font-semibold text-[12px] text-white sm:text-base hover:text-[#e5e7eb] transition-colors duration-200">Turbo <span className="text-[#dc2626]">Cars</span></span>
    </Link>
  );
};

export default Logo;