import Image from "next/image";

import Layout from "@/components/layout";
import Background from "@/components/background";
export default function About() {
  return (
    <Layout>
      <Background />
      <div className="flex flex-col items-center h-screen py-10 bg-transparent">
        <h1 className="text-4xl font-bold text-white">About</h1>
      </div>
    </Layout>
  );
}
