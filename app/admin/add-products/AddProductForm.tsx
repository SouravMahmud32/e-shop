"use client";

import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import CustomCheckBox from "@/app/components/inputs/CustomCheckBox";
import Input from "@/app/components/inputs/Input";
import SelectColor from "@/app/components/inputs/SelectColor";
import TextArea from "@/app/components/inputs/TextArea";
import firebaseApp from "@/libs/firebase";
import { categories } from "@/utils/Categories";
import { colors } from "@/utils/Colors";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { error } from "console";
import axios from "axios";
import { useRouter } from "next/navigation";

export type ImageType = {
  color: string;
  colorCode: string;
  image: File | null;
};
export type UploadedImageType = {
  color: string;
  colorCode: string;
  image: string;
};

const AddProductForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageType[] | null>();
  const [isProductCreated, setIsProductCreated] = useState(false);

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

  useEffect(() => {
    setCustomValue("images", images);
  }, [images]);

  useEffect(() => {
    if (isLoading) {
      reset();
      setImages(null);
      setIsProductCreated(false);
    }
  }, [isProductCreated]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("Product data", data);
    // upload images to fb
    // save product mongodb
    setIsLoading(true);
    let uploadedImages: UploadedImageType[] = [];

    if (!data.category) {
      setIsLoading(false);
      toast.error("Category is not selected");
    }

    if (!data.images || data.images.length === 0) {
      setIsLoading(false);
      toast.error("No selected Image");
    }

    const handleImageUploads = async () => {
      toast("Creating Product, Please Wait...");
      try {
        for (const item of data.images) {
          if (item.image) {
            const fileName = new Date().getTime() + "-" + item.image.name;
            const storage = getStorage(firebaseApp);
            const storageRef = ref(storage, `products/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, item.image);

            await new Promise<void>((resolve, reject) => {
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log("Upload is " + progress + "% done");
                  switch (snapshot.state) {
                    case "paused":
                      console.log("Upload is paused");
                      break;
                    case "running":
                      console.log("Upload is running");
                      break;
                  }
                },
                (error) => {
                  console.log("Error Uploading image", error);
                  reject(error);
                },
                () => {
                  getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                      uploadedImages.push({
                        ...item,
                        image: downloadURL,
                      });
                      console.log("File available at", downloadURL);
                      resolve();
                    })
                    .catch((error) => {
                      console.log("Error getting the download url", error);
                      reject(error);
                    });
                }
              );
            });
          }
        }
      } catch (error) {
        setIsLoading(false);
        console.log("Error Hnadling image uploads", error);
        return toast.error("Error Hnadling image uploads");
      }
    };

    await handleImageUploads();
    const productData = { ...data, images: uploadedImages };

    axios
      .post("/api/product", productData)
      .then(() => {
        toast.success("Product Created...");
        setIsProductCreated(true);
        router.refresh();
      })
      .catch((error) => {
        toast.error("Something went wrong saving product to db");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const category = watch("category");
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const addImageToState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (!prev) {
        return [value];
      }

      return [...prev, value];
    });
  }, []);
  const removeImageFromState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (prev) {
        const filteredImages = prev.filter(
          (item) => item.color !== value.color
        );
        return filteredImages;
      }
      return prev;
    });
  }, []);

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
          {colors.map((item, index) => {
            return (
              <SelectColor
                key={index}
                item={item}
                addImageToState={addImageToState}
                removeImageFromState={removeImageFromState}
                isProductCreated={isProductCreated}
              ></SelectColor>
            );
          })}
        </div>
      </div>
      <Button
        label={isLoading ? "Loading" : "Add Product"}
        onClick={handleSubmit(onSubmit)}
      ></Button>
    </div>
  );
};

export default AddProductForm;
