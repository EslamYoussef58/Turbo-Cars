import { ListingType } from "@/@types/api.type";
import { CAR_CONDITION_OPTIONS } from "@/constants/car-options";
import { createSlug, formatCurrency } from "@/lib/helper";
import Link from "next/link";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { CogIcon, FuelIcon, GaugeIcon, Tag } from "lucide-react";

interface CarCardProps {
  listing: ListingType;
  layout?: "grid" | "list";
  className?: string;
}

const CarCard = ({ listing, layout = "grid", className }: CarCardProps) => {
  const {
    $id,
    imageUrls,
    displayTitle,
    price,
    fuelType,
    condition,
    transmission,
    mileage,
    description,
  } = listing;

  const slug = createSlug(displayTitle);
  const conditionLabel = CAR_CONDITION_OPTIONS.find(
    (opt) => opt.value === condition
  )?.label;

  const FEATURES = [
    { icon: FuelIcon, value: fuelType?.toLowerCase(), label: "Fuel type" },
    { icon: GaugeIcon, value: mileage ? `${mileage} km` : null, label: "Mileage" },
    { icon: CogIcon, value: transmission?.toLowerCase(), label: "Transmission" },
  ].filter(item => item.value);

  return (
    <Link 
      href={`/detail/${slug}/${$id}`}
      className={cn(
        "block group transition-transform hover:scale-[1.01]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dc2626] focus-visible:ring-offset-2 rounded-xl",
        className
      )}
      aria-label={`View details for ${displayTitle}`}
    >
      <Card className={cn(
        "border border-gray-200 rounded-xl shadow-sm overflow-hidden",
        "flex flex-col h-full bg-white",
        "transition-all duration-300 group-hover:shadow-md group-hover:border-[#dc2626]/30",
        layout === "list" && "md:flex-row"
      )}>
        
        <div className={cn(
          "relative w-full aspect-[3/2] bg-gray-100 overflow-hidden",
          "after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/10 after:to-transparent",
          layout === "list" && "md:w-48 md:shrink-0 md:aspect-auto md:h-full"
        )}>
          <Image
            src={imageUrls[0] || '/car-placeholder.jpg'}
            alt={displayTitle}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes={layout === "list" 
              ? "(max-width: 767px) 100vw, 192px" 
              : "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 288px"}
            priority={false}
          />
          
          
          {conditionLabel && (
            <Badge 
              className="absolute top-3 right-3 bg-[#dc2626] text-white hover:bg-[#dc2626]/90 z-10"
              variant="default"
            >
              {conditionLabel}
            </Badge>
          )}
        </div>

        
        <CardContent className={cn(
          "p-4 flex-1 flex flex-col gap-3",
          layout === "list" && "md:p-5 md:gap-3"
        )}>
          
          <div className="flex justify-between items-start gap-3">
            <h3 className="font-bold text-[#dc2626] line-clamp-2 text-base leading-tight">
              {displayTitle}
            </h3>
            <p className="font-bold text-lg whitespace-nowrap text-gray-900">
              {formatCurrency(price)}
            </p>
          </div>

         
          <p className={cn(
            "text-gray-600 text-sm line-clamp-2",
            layout === "list" && "md:line-clamp-3"
          )}>
            {description}
          </p>

          
          {FEATURES.length > 0 && (
            <div className={cn(
              "mt-auto pt-2 grid grid-cols-2 gap-3 ",
              layout === "list" && "hidden sm:grid"
            )}>
              {FEATURES.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 text-xs text-gray-700 border border-red-200 rounded-md"
                  aria-label={feature.label}
                >
                  <div className="p-1 bg-[#dc2626]/10 rounded-full">
                    <feature.icon className="size-4 text-[#dc2626]" />
                  </div>
                  <span className="truncate">{feature.value}</span>
                </div>
              ))}
            </div>
          )}

          
          <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-full h-9 bg-[#dc2626] text-white text-sm font-medium rounded-md flex items-center justify-center hover:bg-[#dc2626]/90 transition-colors">
              View Details
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CarCard;