import { Navigation } from "./Navigation";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20 lg:pb-8 pb-20 px-4 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}
