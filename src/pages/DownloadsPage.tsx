
import React from "react";
import Layout from "@/components/Layout";
import DownloadsSection from "@/components/DownloadsSection";

const DownloadsPage = () => {
  return (
    <Layout>
      <div className="pt-20">
        <DownloadsSection />
      </div>
    </Layout>
  );
};

export default DownloadsPage;
