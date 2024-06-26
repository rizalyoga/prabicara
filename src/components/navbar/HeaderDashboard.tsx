"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { deleteCookie } from "cookies-next";

import { formatString } from "@/helper/FormatStringHeader";
import { getPathnamePage } from "@/helper/GetNamePageFromPathname";

import { IoLogOutOutline, IoHome } from "react-icons/io5";

import ConfirmationModal from "../modal/ConfirmationModal";

const HeaderDashboard = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    const authUser = sessionStorage.getItem("student");

    if (!authUser) {
      deleteCookie("user_auth");
      router.push("/login");
    }
  }, [router]);

  const isOpenHandler = () => {
    setIsOpenModal((isOpen) => !isOpen);
  };

  const functionHandler = () => {
    sessionStorage.clear();
    deleteCookie("user_auth");
    router.push("/login");
  };

  return (
    <>
      {isOpenModal && (
        <ConfirmationModal
          isOpenHandler={isOpenHandler}
          functionHandler={functionHandler}
          isOpenModal={isOpenModal}
          message="Anda yakin ingin keluar ?"
          titleMessage="Konfirmasi Logout"
        />
      )}
      <div
        className={clsx(
          "navbar sticky top-0 flex justify-between bg-white z-10 shadow-md",
          "dark:bg-base-100"
        )}
      >
        <label
          htmlFor="left-sidebar-drawer"
          className={clsx(
            "btn bg-primary-violet text-white drawer-button",
            "hover:text-primary-text",
            "lg:hidden"
          )}
        >
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </label>
        <h1 className="text-md font-semibold ml-1 md:text-2xl pr-1">
          {pathname === "/dashboard"
            ? "Panduan Web"
            : formatString(getPathnamePage(pathname))}
        </h1>
        <div>
          <Link
            href={"/dashboard"}
            className={clsx(
              "btn btn-ghost bg-primary-violet text-white font-bold mr-2",
              "hover:text-primary-text",
              "dark:hover:text-white"
            )}
            title="Panduan"
          >
            <IoHome className="text-2xl" />
          </Link>
          <button
            className={clsx(
              "btn btn-ghost bg-primary-violet text-white font-bold",
              "hover:text-primary-text",
              "dark:hover:text-white"
            )}
            onClick={() => isOpenHandler()}
            title="Logout"
          >
            <IoLogOutOutline className="text-2xl" />
          </button>
        </div>
      </div>
    </>
  );
};

export default HeaderDashboard;
