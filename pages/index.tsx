import React from "react";
import Layout from "../components/Layout";
import Link from "next/link";

const Home: React.FC = () => {
  return (
    <Layout>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to My App</h1>
        <p className="mb-8">Analyze files, collect samples, and more!</p>
        <Link
          href="/file-analysis"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Get Started
        </Link>
      </div>
    </Layout>
  );
};

export default Home;
