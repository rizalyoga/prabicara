"use client";
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getDataStudent } from "@/data/getDataStudent";
import Toast from "@/components/toast/Toast";

const Login = () => {
  const router = useRouter();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const [loginMessage, setLoginMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setLogin({
      ...login,
      [e.target.name]: value,
    });
  };

  useEffect(() => {
    const auth = sessionStorage.getItem("student");
    if (auth) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading((loading) => !loading);
    getDataStudent(login)
      .then((e) => {
        if (e) {
          setLoginMessage("Selamat anda berhasil login");
          sessionStorage.setItem(
            "student",
            JSON.stringify({ ...e, token: `token${new Date()}` })
          );
          setTimeout(() => {
            router.push("/dashboard");
          }, 2200);
        } else {
          setLoginMessage("Mohon periksa kembali username atau password anda");
        }
      })
      .finally(() => {
        setIsLoading((loading) => !loading);
        setTimeout(() => {
          setLoginMessage("");
        }, 2500);
      });
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

  return (
    <>
      {loginMessage && <Toast message={loginMessage} />}
      {/* {loginMessage.includes("Mohon") && <ErrorToast message={loginMessage} />} */}
      <div
        className={clsx(
          "flex justify-center items-center flex-col h-screen bg-primary-violet",
          "dark:bg-slate-700"
        )}
      >
        <div
          className={clsx(
            "mx-4 bg-base-100 border border-slate-300 flex justify-center items-center flex-col rounded-md py-12 px-4 w-[90%]",
            "md:w-[48%]",
            "lg:w-[40%]",
            "xl:w-[28%]",
            "2xl:w-[24%]",
            "dark:border-slate-500"
          )}
        >
          <h1
            className={clsx(
              "font-bold text-4xl text-primary-text",
              "dark:text-slate-400"
            )}
          >
            Login
          </h1>
          <p className="text-sm text-secondary-text mb-8 mt-2 text-center">
            Enter your username and password below
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
                  "bg-blue-500 rounded-md py-4 font-semibold text-white cursor-pointer mt-1",
                  "hover:bg-blue-700",
                  "dark:bg-slate-600 dark:hover:bg-slate-500"
                )}
                type="submit"
                value="Log In"
              />
            )}
          </form>
          <p className="text-base text-secondary-text mt-5">
            Don&apos;t have an account ?
            <span className="text-primary-cyan hover:underline cursor-pointer">
              <Link href="/register">{" Sign Up"}</Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;