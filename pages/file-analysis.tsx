import React from "react";
import { useSession, signIn } from "next-auth/react";
import Layout from "../components/Layout";

const FileAnalysis: React.FC = () => {
  const { data: session } = useSession();

  const handleCTAClick = async () => {
    if (!session) {
      await signIn("google");
    } else {
      // Handle the CTA action for logged-in users
      console.log("User is logged in, perform file analysis");
      // You can add your file analysis logic here
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">File Analysis</h1>
      <p className="mb-4">
        {session
          ? `Welcome, ${session.user?.name}!`
          : "Please log in to analyze files."}
      </p>
      <button
        onClick={handleCTAClick}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {session ? "Analyze Files" : "Log in to Analyze Files"}
      </button>
    </Layout>
  );
};

export default FileAnalysis;
