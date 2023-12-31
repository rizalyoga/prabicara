import React from "react";

import Pendahuluan from "./Pendahuluan";
import Penutup from "./Penutup";
import Kegiatan from "../Kegiatan";

const KonsonanC = () => {
  return (
    <div className="dashboard-content-container text-base ">
      <h1 className="text-title-sub-section font-bold text-primary-green">
        Pengucapan Huruf Konsonan D
      </h1>
      <div id="pendahuluan">
        <h3 className="font-bold py-4  text-base-text">A. Pendahuluan</h3>
        <Pendahuluan />
      </div>
      <div id="kegiatan-inti">
        <h3 className="font-bold py-4 text-base-text">B. Kegiatan inti</h3>
        <Kegiatan />
      </div>
      <div id="penutup">
        <h3 className="font-bold py-4 text-base-text">C. Penutup</h3>
        <Penutup />
      </div>
    </div>
  );
};

export default KonsonanC;
