"use client";
import React, { useState } from "react";
import Input from "../components/inputs/Input";
import Heading from "../components/Heading";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import {AiOutlineGoogle} from 'react-icons/ai'

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log(data);
  };

  return (
    <>
      <Heading title="LogIn To E-shop"></Heading>
      <Button  label="Sign Up With Google" icon={AiOutlineGoogle} outline onClick={() =>{}}></Button>
      <hr className=" bg-slate-300 w-full h-px" />
      
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
        label={isLoading ? "Loading" : "Log In"}
        onClick={handleSubmit(onSubmit)}
      ></Button>
      <p className=" text-sm text-center">
        Don't have an account?{" "}
        <Link className=" underline" href="/register">
          Sign Up
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
