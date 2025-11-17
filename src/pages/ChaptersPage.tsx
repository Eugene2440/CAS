
import React from "react";
import Layout from "@/components/Layout";
import ChaptersSection from "@/components/ChaptersSection";

const ChaptersPage = () => {
  return (
    <Layout>
      <div className="pt-20">
        <ChaptersSection />
      </div>
    </Layout>
  );
};

export default ChaptersPage;
