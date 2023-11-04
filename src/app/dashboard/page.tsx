"use client";
import React from "react";

const Dashboard = () => {
  const length = [1, 2, 3, 4, 5, 6];

  return (
    <>
      <div className="dashboard-content-container">
        <h1 className="text-title-sub-section font-bold">Daftar Nilai</h1>
        <div className="card-container my-4 grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {length.map((length) => (
            <div
              key={length}
              className="bg-gradient-to-br from-primary-violet to-primary-cyan text-slate-200 rounded-xl shadow-md min-h-[300px] p-4 relative"
            >
              <h1 className="font-bold text-title-sub-section">Tuna Rungu</h1>
              <span className="flex gap-2">
                <h3>Tuli : </h3>
                <p>100</p>
              </span>
              <a className="absolute bottom-4 right-4 text-sm text-white cursor-pointer hover:underline">
                Tampilkan detail
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
