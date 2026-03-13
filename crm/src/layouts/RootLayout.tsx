import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { ModeToggle } from "../components/ModeToggle";
import { useAuth } from "../components/AuthProvider";
import { LogOut } from "lucide-react";

export default function RootLayout() {
  const { user, dbUser, signOut } = useAuth();
  const navigate = useNavigate();

  // Route Protection: If no logged in user, boot them to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b bg-card px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold tracking-tight">CRM Minimalista</h1>
          {dbUser && (
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium ml-4">
              {dbUser.role}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <div className="flex items-center space-x-3 border-l pl-4 border-border">
             <div className="text-sm font-medium hidden sm:block">
               {user.email}
             </div>
             <button
               onClick={handleLogout}
               title="Sair"
               className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"
             >
               <LogOut className="w-5 h-5" />
             </button>
          </div>
        </div>
      </header>
      <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
}
