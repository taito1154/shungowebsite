import Image from "next/image";
import Header from "@/components/header";
import Layout from "@/components/layout";
export default function About() {
  return (
    <Layout>
      <div className="flex flex-col items-center h-screen py-10 bg-slate-300">
        <Header />
        <h1 className="text-4xl font-bold text-black">Guilty</h1>
      </div>
    </Layout>
  );
}
