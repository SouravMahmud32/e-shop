"use client";
import React, { useState } from "react";
import Input from "../components/inputs/Input";
import Heading from "../components/Heading";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: "", email: "", password: "" },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios.post("/api/register", data).then(() => {
      toast.success("Account Created");

      signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      }).then((callback) => {
        if (callback?.ok) {
          router.push("/cart");
          router.refresh();
          toast.success("Logged In");
        }

        if (callback?.error) {
          toast.error(callback.error);
        }
      });
    }).catch(() => toast.error("Something Went Wrong")).finally(() => {
      setIsLoading(false)
    })
  };

  return (
    <>
      <Heading title="Sign up for E-shop"></Heading>
      <Button
        label="Sign Up With Google"
        icon={AiOutlineGoogle}
        outline
        onClick={() => {}}
      ></Button>
      <hr className=" bg-slate-300 w-full h-px" />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      ></Input>
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      ></Input>
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      ></Input>
      <Button
        label={isLoading ? "Loading" : "Sign Up"}
        onClick={handleSubmit(onSubmit)}
      ></Button>
      <p className=" text-sm text-center">
        Already have an account?{" "}
        <Link className=" underline" href="/login">
          Log in
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
