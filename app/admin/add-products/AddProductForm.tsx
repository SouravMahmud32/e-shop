"use client";

import Heading from "@/app/components/Heading";
import CustomCheckBox from "@/app/components/inputs/CustomCheckbox";
import Input from "@/app/components/inputs/Input";
import TextArea from "@/app/components/inputs/TextArea";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

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
        <div className=" grid grid-cols-2 md:grid-cols-3 max-h-[50px] overflow-y-auto">
          {}
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
