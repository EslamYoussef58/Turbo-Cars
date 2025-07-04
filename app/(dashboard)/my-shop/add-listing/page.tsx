"use client";
import FileUploader from "@/components/FileUploader";
import FormGenerator from "@/components/FormGenerator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import {
  CAR_BRAND_OPTIONS,
  CAR_COLOR_OPTIONS,
  CAR_MODEL_OPTIONS,
  CAR_YEAR_OPTIONS,
} from "@/constants/car-options";
import { addListingFields } from "@/constants/listing-fields";
import useCurrentUser from "@/hooks/api/use-current-user";
import { addListingMutationFn } from "@/lib/fetcher";
import { listingSchema } from "@/validation/listing.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { toast } from "sonner";
import { z } from "zod";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const AddListing = () => {
  const router = useRouter();
  const { data } = useCurrentUser();
  const shop = data?.shop;

  const { mutate, isPending } = useMutation({
    mutationFn: addListingMutationFn,
  });

  const listingClientSchema = listingSchema.extend({
    contactPhone: z
      .string({
        required_error: "Contact number is required",
      })
      .refine(isValidPhoneNumber, "Invalid phone number"),
  });

  type FormDataType = z.infer<typeof listingClientSchema>;
  type FormFieldName = keyof FormDataType;

  const form = useForm<FormDataType>({
    resolver: zodResolver(listingClientSchema),
    mode: "onBlur",
    defaultValues: {
      brand: "",
      model: "",
      yearOfManufacture: "",
      exteriorColor: "",
      interiorColor: "",
      condition: "",
      secondCondition: [],
      mileage: "",
      transmission: "",
      fuelType: "",
      keyFeatures: [],
      vin: "",
      bodyType: "",
      drivetrain: "",
      seatingCapacity: "",
      description: "",
      price: 0,
      contactPhone: "",
      imageUrls: [],
    },
  });

  const imageUrls = useWatch({
    control: form.control,
    name: "imageUrls",
  });

  const brand = useWatch({
    control: form.control,
    name: "brand",
  });

  const handleImageUrls = (imageUrls: string[]) => {
    form.setValue("imageUrls", [...form.getValues().imageUrls, ...imageUrls]);
  };

  const handleRemoveImage = (index: number) => {
    const updatedImageUrls = [...form.getValues().imageUrls];
    updatedImageUrls.splice(index, 1);
    form.setValue("imageUrls", updatedImageUrls);
  };

  const getLabel = (
    value: string,
    options: { value: string; label: string }[]
  ) => {
    const option = options.find((opt) => opt.value === value);
    return option ? option.label : value;
  };

  function onSubmit(values: FormDataType) {
    const { brand, model, condition, yearOfManufacture, exteriorColor } =
      values;
    const displayTitle = [
      condition === "BRAND_NEW" ? "New" : null,
      getLabel(brand, CAR_BRAND_OPTIONS),
      getLabel(model, CAR_MODEL_OPTIONS),
      getLabel(yearOfManufacture, CAR_YEAR_OPTIONS),
      exteriorColor !== "other"
        ? getLabel(exteriorColor, CAR_YEAR_OPTIONS)
        : null,
    ]
      .filter(Boolean)
      .join(" ");

    const payload = {
      ...values,
      displayTitle,
      shopId: shop?.$id,
    };

    const baseStyle = { padding: "1rem", borderRadius: "0.5rem" };
    mutate(payload, {
      onSuccess: () => {
        toast.success("Listing added successfully", {
          description: "Your listing is now live on the platform",
            style: {
            ...baseStyle,
            backgroundColor: "#2BB389", 
            color: "#FFFFFF", 
          },
        });
        router.push("/my-shop");
      },
      onError: (error) => {
        toast.error("Something went wrong", {
          description: error.message,
                    style: {
            ...baseStyle,
            backgroundColor: "#DC2626", 
            color: "#FFFFFF", 
          },
        });
      },
    });
  }

  return (
    <main className="container mx-auto px-4 pt-3 pb-8">
      <div className="max-w-4xl mx-auto pt-5">
        <Card className="!bg-transparent shadow-none border-none">
          <CardHeader className="flex items-center justify-center bg-[#0f172a] text-white rounded-[8px] p-4 mb-4">
            <CardTitle className="font-semibold text-xl">Add Listing</CardTitle>
          </CardHeader>
          <CardContent className="bg-[#0f172a] rounded-[8px] p-4 px-6 pb-8">
            <div className="w-full mx-auto">
              <div className="flex items-center">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full"
                  >
                    {/* {images upload} */}
                    <div className="space-y-2 pt-3">
                      <h2 className="text-sm font-semibold text-white ">
                        Add Photo
                      </h2>
                      <div className="text-sm text-gray-400  font-light">
                        <div>Add at least 3 photos for this listing</div>
                        First picture - is the title picture.
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-start mt-2">
                        <FileUploader
                          onFileUrlsReceived={handleImageUrls}
                        >
                          <ScrollArea className="w-full whitespace-nowrap ml-3">
                            <div className="w-full grid grid-cols-2 sm:grid-cols-4  h-20">
                              {imageUrls.map((imageUrls: string, index: number) => (
                                <div key={`id-${index}`} className="relative overflow-hidden w-20 h-20 rounded-[8px] ">
                                  <img 
                                  src={imageUrls}
                                  alt=""
                                  width={80}
                                  height={80}
                                  />
                                  <button onClick={() => handleRemoveImage(index)}
                                    className="absolute top-0 right-0 p-1 bg-black rounded-full"
                                    >
                                      <X className="w-4 h-4 !text-white"/>
                                    </button>
                                </div>
                              ))}
                            </div>
                            <ScrollBar orientation="horizontal"/>
                          </ScrollArea>
                        </FileUploader>
                      </div>
                      <FormMessage>
                        {form.formState.errors.imageUrls?.message}
                      </FormMessage>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-5">
                      {addListingFields.map((field, index) => (
                        <FormField
                          key={index}
                          control={form.control}
                          name={field.name as FormFieldName}
                          disabled={field.disabled || isPending}
                          render={({ field: formField }) => {
                            const filteredModels =
                              field.name === "model" && brand
                                ? field?.options?.filter(
                                    (model) => model.key === brand
                                  )
                                : [];

                            const valueMultiSelect =
                              field.fieldType === "multiselect"
                                ? Array.isArray(formField.value)
                                  ? formField.value
                                  : []
                                : [];
                            return (
                              <FormItem
                                className={`${
                                  field.col ? `col-span-${field.col}` : ""
                                }`}
                              >
                                <FormControl>
                                  <FormGenerator
                                    field={{
                                      ...field,
                                      options:
                                        field.name === "model"
                                          ? filteredModels
                                          : field.options,
                                    }}
                                    register={form.register}
                                    errors={form.formState.errors}
                                    formValue={formField.value}
                                    valueMultiSelect={valueMultiSelect}
                                    onChange={formField.onChange}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <Button
                      type="submit"
                      variant="custom"
                      size="lg"
                      className="mt-6 py-6 mb-4 w-full max-w-xs bg-[#dc2626] text-white hover:bg-gray-800 flex place-items-center justify-self-center"
                      disabled={isPending}
                    >
                      {isPending && <Loader className="w-4 h-4 animate-spin" />}
                      Post Listing
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default AddListing;
