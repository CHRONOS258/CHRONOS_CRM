import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b bg-card px-6 py-4 flex items-center justify-between shadow-sm">
        <h1 className="text-xl font-bold tracking-tight">CRM Minimalista</h1>
        {/* Placeholder para Perfil / Logout */}
        <div className="w-8 h-8 bg-muted rounded-full"></div>
      </header>
      <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
}
