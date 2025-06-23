import { FieldType } from "@/@types/index.type";
import { FieldErrors, FieldValues, UseFormRegister, useFormContext } from "react-hook-form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { PhoneInput } from "./ui/phone-input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import MultipleSelector, { Option } from "./ui/multi-select";

type FormGeneratorProps = {
  field: FieldType;
  register: UseFormRegister<any>;
  errors: FieldErrors<FieldValues>;
  formValue?: any;
  onChange?: (value: any) => void;
  defaultValue?: any;
  valueMultiSelect?: string[];
};

const FormGenerator: React.FC<FormGeneratorProps> = ({
  field,
  register,
  errors,
  formValue,
  onChange,
  defaultValue,
  valueMultiSelect,
}) => {
  const { name, fieldType, label, disabled, placeholder, options } = field;
  const { setValue } = useFormContext();

  const fieldId = `${name}-${fieldType}`;
  const isCustomField = ["select", "multiselect", "phone"].includes(fieldType);

  const getSelectedItems = (
    options: { key?: string; label: string; value: string }[] = [],
    valueMultiSelect: string[] = []
  ): Option[] => {
    return options.filter((option) => valueMultiSelect.includes(option.value));
  };

  return (
    <div className="grid gap-2">
      {label && (
        <Label {...(!isCustomField ? { htmlFor: fieldId } : {})}
        style={{ color: "#9CA3AF"}}
        >{label}</Label>
      )}

      {fieldType === "text" && (
        <>
          <Input
            id={fieldId}
            type="text"
            className="!h-12 text-sm shadow-none placeholder:!text-muted-foreground"
            disabled={disabled}
            placeholder={placeholder || label}
            defaultValue={defaultValue}
            {...register(name)}
          />

        </>
      )}

      {fieldType === "number" && (
        <>
          <Input
            id={fieldId}
            type="number"
            className="!h-12 text-sm shadow-none placeholder:!text-muted-foreground"
            disabled={disabled}
            placeholder={placeholder || label}
            defaultValue={defaultValue}
            {...register(name)}
          />

        </>
      )}

      {fieldType === "currency" && (
        <>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sm text-gray-500">
              $
            </span>
            <Input
              id={fieldId}
              type="text"
              className="!h-12 text-sm shadow-none placeholder:!text-muted-foreground pl-9 border-none"
              disabled={disabled}
              placeholder={placeholder || label}
              defaultValue={defaultValue}
              {...register(name, {
                required: "Price is required",
                onChange: (e) => {
                  const rawValue = e.target.value
                    ? e.target.value.replace(/[,.\s]/g, "")
                    : "";
                  const formattedValue = rawValue
                    ? new Intl.NumberFormat().format(Number(rawValue))
                    : "";
                  setValue(name, formattedValue, { shouldValidate: true });
                },
                setValueAs: (value) => {
                  if (typeof value === "string" || typeof value === "number") {
                    const cleanedValue = String(value).replace(/[,.\s]/g, "");
                    return cleanedValue ? Number(cleanedValue) : "";
                  }
                  return "";
                },
              })}
            />
          </div>
        </>
      )}

      {fieldType === "phone" && (
        <>
          <PhoneInput
            className="phone--input !h-12 text-sm"
            autoComplete="off"
            disabled={disabled}
            placeholder={placeholder || label}
            defaultValue={defaultValue}
            onChange={(value) => {
              onChange?.(value);
              setValue(name, value, { shouldValidate: true });
            }}
          />

        </>
      )}

      {fieldType === "textarea" && (
        <>
          <Textarea
            id={fieldId}
            className="text-sm"
            disabled={disabled}
            rows={4}
            placeholder={placeholder || label}
            defaultValue={defaultValue}
            {...register(name)}
          />

        </>
      )}

      {fieldType === "select" && (
        <>
          <Select
            value={formValue || ""}
            onValueChange={(value) => {
              onChange?.(value);
              setValue(name, value, { shouldValidate: true });
            }}
            disabled={disabled || options?.length === 0}
          >
            <SelectTrigger
              className="w-full !h-12 shadow-none data-[placeholder]:text-muted-foreground bg-black text-[#dc2626] hover:border-[#dc2626] border border-gray-300 focus-visible:border-[#dc2626] focus-visible:ring-[#dc2626] [&_svg]:text-[#dc2626]"
            >
              <SelectValue placeholder={placeholder || `Select ${label}`} />
            </SelectTrigger>
            <SelectContent>
              {options?.length === 0 && (
                <p className="text-center text-sm text-muted-foreground leading-10">
                  No options found
                </p>
              )}
              {options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

        </>
      )}

      {fieldType === "multiselect" && options && (
        <>
          <MultipleSelector
            options={options}
            placeholder={placeholder || `Select ${label}`}
            disabled={disabled}
            className="w-full text-sm !min-h-12 max-h-auto shadow-none"
            badgeClassName="bg-[#dc2626]  shadow-none text-white !font-medium"
            value={getSelectedItems(options, valueMultiSelect) || []}
            onChange={(selectedItems) => {
              const selectedValues = selectedItems.map((item) => item.value);
              onChange?.(selectedValues);
              setValue(name, selectedValues, { shouldValidate: true });
            }}
            emptyIndicator={
              <p className="text-center text-sm text-muted-foreground leading-10 hover:border-none">
                No options found
              </p>
            }
          />

        </>
      )}
    </div>
  );
};

export default FormGenerator;
