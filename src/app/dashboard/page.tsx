"use client";

import React, { useState, useEffect } from "react";
import clsx from "clsx";

import PanduanRoute from "@/routes/panduanRoute.json";
import { panduanProps } from "@/types/types";

import DashboardLoading from "@/components/loading/DashboardLoading";
import PanduanCard from "@/components/cards/panduan-card/PanduanCard";

const Dashboard = () => {
  const [panduan, setPanduan] = useState<panduanProps[]>([]);
  const [pelatihan, setPelatihan] = useState<panduanProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const pendahuluanRoutes = PanduanRoute.slice(0, 2);
    setPanduan(pendahuluanRoutes);

    const pelatiahnRoutes = PanduanRoute.slice(2);
    setPelatihan(pelatiahnRoutes);

    setTimeout(() => {
      setLoading(true);

      const timeoutId = setTimeout(() => {
        setLoading(false);
      }, 500);

      // Clear the timeout when the component unmounts or when modalOpen changes
      return () => clearTimeout(timeoutId);
    }, 500);
  }, []);

  if (loading) {
    return <DashboardLoading />;
  }

  return (
    <div className="dashboard-content-container">
      <div
        className={clsx(
          "header-content",
          "sm:flex sm:justify-between items-center"
        )}
      >
        <h1 className="text-title-sub-section font-bold">
          Panduan Website Parbicara
        </h1>
      </div>
      <div className="my-4 grid gap-6 sm:grid-cols-2 md:grid-cols-2">
        {panduan &&
          panduan.map((content) => (
            <PanduanCard
              key={content.id}
              id={content.id}
              name={content.name}
              url={content.url}
            />
          ))}
      </div>
      <h1 className="text-title-sub-section font-bold"> Materi Pelatihan</h1>
      <div className="dashboard-cards-wrapper">
        {pelatihan &&
          pelatihan.map((content) => (
            <PanduanCard
              key={content.id}
              id={content.id}
              name={content.name}
              url={content.url}
              subMenu={content.subMenu}
            />
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
