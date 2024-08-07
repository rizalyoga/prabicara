"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";
import CryptoJS from "crypto-js";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import { addNewStudent } from "@/data/studentRegister";
import { SubmitRegistrationCheck } from "@/helper/SubmitRegsitrationCheck";

import Toast from "@/components/toast/Toast";

const Register = () => {
  const router = useRouter();

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registerMessage, setRegisterMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [register, setRegister] = useState({
    username: "",
    firstname: "",
    lastname: "",
    password: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setRegister({
      ...register,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading((loading) => !loading);

    const newDataStudent = {
      username: register.username.replace(/\s/g, ""),
      firstname: register.firstname,
      lastname: register.lastname,
      password: CryptoJS.SHA256(register.password).toString(CryptoJS.enc.Hex),
      email: register.email.replace(/\s/g, ""),
      id: Date.now(),
      date: new Date().toISOString().slice(0, 10),
    };

    if (newDataStudent.username.length < 6) {
      setRegisterMessage("Mohon maaf panjang username minimal 6 karakter");
      setErrorMessage("Mohon maaf panjang username minimal 6 karakter");
      setIsLoading((loading) => !loading);
      cleanRegisterMessage();
    } else if (!newDataStudent.username.charAt(0).match(/^[a-zA-Z]/)) {
      setRegisterMessage(
        "Mohon maaf karakter pertama Username harus berupa huruf"
      );
      setErrorMessage(
        "Mohon maaf karakter pertama Username harus berupa huruf"
      );
      setIsLoading((loading) => !loading);
      cleanRegisterMessage();
    } else if (newDataStudent.firstname.length < 3) {
      setRegisterMessage("Mohon maaf panjang fistname minimal 3 karakter");
      setErrorMessage("Mohon maaf panjang fistname minimal 3 karakter");
      setIsLoading((loading) => !loading);
      cleanRegisterMessage();
    } else if (newDataStudent.firstname.match(/[^a-zA-Z ]/g)) {
      setRegisterMessage(
        "Mohon maaf fistname memiliki karakter selain huruf alfabet"
      );
      setErrorMessage(
        "Mohon maaf fistname memiliki karakter selain huruf alfabet"
      );
      setIsLoading((loading) => !loading);
      cleanRegisterMessage();
    } else if (newDataStudent.lastname.length < 3) {
      setRegisterMessage("Mohon maaf panjang lastname minimal 3 karakter");
      setErrorMessage("Mohon maaf panjang lastname minimal 3 karakter");
      setIsLoading((loading) => !loading);
      cleanRegisterMessage();
    } else if (newDataStudent.lastname.match(/[^a-zA-Z]/g)) {
      setRegisterMessage(
        "Mohon maaf lastname memiliki karakter selain huruf alfabet"
      );
      setErrorMessage(
        "Mohon maaf lastname memiliki karakter selain huruf alfabet"
      );
      setIsLoading((loading) => !loading);
      cleanRegisterMessage();
    } else if (register.password.length < 8) {
      setRegisterMessage("Mohon maaf panjang password minimal 8 karakter");
      setErrorMessage("Mohon maaf panjang password minimal 8 karakter");
      setIsLoading((loading) => !loading);
      cleanRegisterMessage();
    } else {
      addNewStudent(newDataStudent).then((e) => {
        setRegisterMessage(e);
        setIsLoading((loading) => !loading);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      });
    }
  };

  const showPasswordComponents = (style: string) => {
    if (!isShowPassword) {
      return <AiFillEye onClick={showPasswordVisible} className={style} />;
    } else {
      return (
        <AiFillEyeInvisible onClick={showPasswordVisible} className={style} />
      );
    }
  };

  const showPasswordVisible = () => {
    setIsShowPassword((visible) => !visible);
  };

  const cleanRegisterMessage = () => {
    setTimeout(() => {
      setRegisterMessage("");
    }, 2000);
  };

  return (
    <>
      {registerMessage && <Toast message={registerMessage} />}
      <div
        className={clsx(
          "flex justify-center items-center flex-col min-h-screen bg-primary-violet mt-20",
          "dark:bg-slate-700"
        )}
      >
        <div
          className={clsx(
            "mx-4 my-8 bg-base-100 border border-slate-300 flex justify-center items-center flex-col rounded-md py-12 px-4 w-[90%]",
            "md:w-[60%]",
            "lg:w-[62%]",
            "xl:w-[64%]",
            "2xl:w-[40%]",
            "dark:border-slate-500"
          )}
        >
          <h1
            className={clsx(
              "font-bold text-4xl text-primary-text",
              "dark:text-slate-400"
            )}
          >
            Registrasi
          </h1>
          <p className="text-sm text-secondary-text mb-8 mt-2 text-center">
            Masukkan username, nama depan, nama belakang, email, dan password
            anda.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 text-slate-400 w-full"
          >
            <span className="flex flex-col">
              <label className="text-base">USERNAME</label>
              <input
                className={clsx(
                  "input input-bordered rounded-md placeholder:text-base text-primary-text py-3 px-2 mt-2",
                  " dark:bg-dark_background dark:text-white"
                )}
                name="username"
                type="text"
                placeholder="username"
                required
                onChange={handleChange}
              />
            </span>
            <div className={clsx("flex flex-col gap-2 w-full", "lg:flex-row")}>
              <span className="flex flex-col w-full">
                <label className="text-base">FIRSTNAME</label>
                <input
                  className={clsx(
                    "input input-bordered rounded-md placeholder:text-base text-primary-text py-3 px-2 mt-2 w-full",
                    "dark:bg-dark_background dark:text-white"
                  )}
                  name="firstname"
                  type="text"
                  placeholder="firstname"
                  required
                  onChange={handleChange}
                />
              </span>
              <span className="flex flex-col w-full">
                <label className="text-base">LASTNAME</label>
                <input
                  className={clsx(
                    "input input-bordered rounded-md placeholder:text-base text-primary-text py-3 px-2 mt-2 w-full",
                    "dark:bg-dark_background dark:text-white"
                  )}
                  name="lastname"
                  type="text"
                  placeholder="lastname"
                  required
                  onChange={handleChange}
                />
              </span>
            </div>
            <span className="flex flex-col">
              <label className="text-base">EMAIL</label>
              <input
                className={clsx(
                  "input input-bordered rounded-md placeholder:text-base text-primary-text py-3 px-2 mt-2",
                  " dark:bg-dark_background dark:text-white"
                )}
                name="email"
                type="email"
                placeholder="email"
                required
                onChange={handleChange}
              />
            </span>
            <span className="flex flex-col">
              <span className="flex justify-between">
                <label className="text-base">PASSWORD</label>
              </span>
              <div className="relative flex">
                <input
                  className={clsx(
                    "input input-bordered relative w-full rounded-md placeholder:text-base text-primary-text py-3 px-2 mt-2",
                    " dark:bg-dark_background dark:text-white"
                  )}
                  name="password"
                  type={isShowPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  autoComplete={"off"}
                  onChange={handleChange}
                />
                {showPasswordComponents(
                  "absolute text-2xl mt-5 mr-2 right-0 cursor-pointer"
                )}
              </div>
            </span>
            {isLoading ? (
              <span className="loading loading-spinner text-success m-auto mt-5"></span>
            ) : (
              <input
                className={clsx(
                  "bg-primary-green rounded-md py-4 font-semibold text-white cursor-pointer mt-1 transition",
                  "hover:bg-slate-500"
                )}
                type="submit"
                value="Registrasi"
              />
            )}
          </form>
          {errorMessage && (
            <p className="text-red-400 mt-4 text-center dark:text-red-400">
              *{errorMessage}
            </p>
          )}
          <p className="text-base text-secondary-text mt-5">
            Sudah mempunyai akun ?
            <span className="text-primary-cyan hover:underline cursor-pointer">
              <Link href="/login">{" Masuk"}</Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
