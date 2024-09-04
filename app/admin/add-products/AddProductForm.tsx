"use client";

import Heading from "@/app/components/Heading";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import CustomCheckBox from "@/app/components/inputs/CustomCheckbox";
import Input from "@/app/components/inputs/Input";
import SelectColor from "@/app/components/inputs/SelectColor";
import TextArea from "@/app/components/inputs/TextArea";
import { categories } from "@/utils/Categories";
import { colors } from "@/utils/Colors";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";


export type ImageType = {
    color: string;
    colorCode: string;
    image: File | null
}
export type UploadedImageType = {
    color: string;
    colorCode: string;
    image: string
}

const AddProductForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      inStock: false,
      images: [],
    },
  });

  const category = watch("category");
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  return (
    <div>
      <Heading title="Add a Product" center></Heading>
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      ></Input>
      <Input
        id="price"
        label="Price"
        disabled={isLoading}
        register={register}
        errors={errors}
        type="number"
        required
      ></Input>
      <Input
        id="brand"
        label="Brand"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      ></Input>
      <TextArea
        id="descripton"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      ></TextArea>
      <CustomCheckBox
        id=" inStock"
        register={register}
        label="This Product is in stock"
      ></CustomCheckBox>
      <div className=" w-full font-medium">
        <div className=" mb-2 font-bold">Select a Category</div>
        <div className=" grid grid-cols-2 md:grid-cols-3 max-h-[50vh] gap-3 overflow-y-auto">
          {categories.map((item) => {
            if (item.label === "All") {
              return null;
            }
            return (
              <div key={item.label} className=" col-span">
                <CategoryInput
                  onclick={(category) => setCustomValue("category", category)}
                  selected={category === item.label}
                  label={item.label}
                  icon={item.icon}
                ></CategoryInput>
              </div>
            );
          })}
        </div>
      </div>
      <div className=" w-full flex flex-col flex-wrap gap-4">
        <div className=" font-bold">
          Select the available products color update their images.
        </div>
        <div className=" text-sm">
          You must upload an image for each of the color selected, otherwise
          your color selection will be ignored.
        </div>
        <div className=" grid grid-cols-2 gap-3">
            {colors.map((item, index) =>{
                return <SelectColor key={index} item={item} addImageToState={() =>{}} removeImageFromState={()=>{}} isProductCreated={false}></SelectColor>
            })}
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
