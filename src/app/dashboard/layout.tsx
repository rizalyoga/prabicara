"use client";
import { Suspense } from "react";

import Sidebar from "@/components/sidebar/Sidebar";
import HeaderDashboard from "@/components/navbar/HeaderDashboard";
import Loading from "./loading";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <div className="drawer lg:drawer-open">
        <input
          id="left-sidebar-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        {/* Content  */}
        <div className="drawer-content flex flex-col">
          <HeaderDashboard />
          <div className="min-h-screen overflow-y-auto pt-5 px-3 bg-base-200">
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </div>
        </div>
        <Sidebar />
      </div>
    </section>
  );
}
