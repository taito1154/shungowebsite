import Header from "@/components/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-16">
      <Header />
      {children}
    </div>
  );
}
