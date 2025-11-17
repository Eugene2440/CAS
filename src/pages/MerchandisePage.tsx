
import React from "react";
import Layout from "@/components/Layout";
import MerchandiseSection from "@/components/MerchandiseSection";

const MerchandisePage = () => {
  return (
    <Layout>
      <div className="pt-20">
        <MerchandiseSection />
      </div>
    </Layout>
  );
};

export default MerchandisePage;
