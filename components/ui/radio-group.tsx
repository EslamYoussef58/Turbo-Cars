"use client"

// استيراد مكتبات React الأساسية
import * as React from "react"
// استيراد مكونات Radix UI لإنشاء Radio Group
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
// استيراد أيقونة Circle من مكتبة lucide-react
import { CircleIcon } from "lucide-react"

// استيراد دالة لتجميع الأنماط (className)
import { cn } from "@/lib/utils"

// مكون RadioGroup: يمثل الحاوية الأساسية لمجموعة الخيارات
function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)} // أسلوب الشبكة مع تباعد
      {...props}
    />
  )
}

// مكون RadioGroupItem: يمثل كل خيار فردي في المجموعة
function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        // الأنماط الأساسية: لون الحدود والنص أحمر، مع تأثيرات التركيز والتعطيل
        "border-[#dc2626] text-[#dc2626] focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        {/* الدائرة الداخلية: إزالة أي لون محدد وتطبيق اللون الأحمر صراحة */}
        <CircleIcon className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 fill-[#dc2626] text-[#dc2626]" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

// تصدير المكونات لاستخدامها في أماكن أخرى
export { RadioGroup, RadioGroupItem }