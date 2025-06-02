import Header from "@/components/layout/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  w-screen pt-2">
      <header className="w-full px-6 flex items-center justify-center">
        <Header />
      </header>
      <main className="flex-1 h-full w-full flex justify-center items-center">
        {children}
      </main>
    </div>
  );
}
