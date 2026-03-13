import { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

type AuthState = {
  session: Session | null;
  user: User | null;
  dbUser: { role: string; name: string } | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthState>({
  session: null,
  user: null,
  dbUser: null,
  loading: true,
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [dbUser, setDbUser] = useState<{ role: string; name: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Função auxiliar para buscar a "Role" e Nome na tabela pública 'User' sempre que o usuário logar
    const fetchDbUser = async (email: string) => {
      try {
        const { data, error } = await supabase
          .from("User")
          .select("role, name")
          .eq("email", email)
          .single();

        if (error) throw error;
        if (mounted) setDbUser(data);
      } catch (err) {
        console.error("Erro ao buscar dados do usuário na tabela User:", err);
        if (mounted) setDbUser(null);
      }
    };

    // Pega a sessão inicial assim que entra no site
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted) {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user?.email) {
          fetchDbUser(session.user.email).finally(() => setLoading(false));
        } else {
          setLoading(false);
        }
      }
    });

    // Escuta qualquer mudança de login/logout em tempo real
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user?.email) {
          fetchDbUser(session.user.email);
        } else {
          setDbUser(null);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ session, user, dbUser, loading, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
