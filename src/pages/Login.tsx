import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Simulação de Login criando um usuário fictício na tabela pública 'User' pra testes rápidos
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
    const role = (e.currentTarget.elements.namedItem('role') as HTMLSelectElement).value;

    try {
      // Tenta gravar as credenciais simuladas diretamento no banco para testes do projeto (ignorando a Auth complexa do Supabase por enquanto pq o MVP é UI focado)
      const { error } = await supabase
        .from('User')
        .upsert([{ email, name: role.toUpperCase(), role: role.toUpperCase(), id: email }], { onConflict: 'email' })
        .select()
        .single();
      
      if (error) {
         console.warn("Aviso (Tabela User não exposta/RLS restrito):", error.message);
      }

      // Simular Sessão
      localStorage.setItem("crm_active_user", JSON.stringify({ email, role }));
      
      // Redirecionamento RBAC
      navigate(`/${role}`);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-card border rounded-lg shadow-sm p-8">
      <div className="flex flex-col space-y-2 text-center mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Acesso ao CRM</h1>
        <p className="text-sm text-muted-foreground">Entre com suas credenciais.</p>
      </div>
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">E-mail</label>
          <input 
            type="email" 
            name="email"
            defaultValue="diretor@empresa.com"
            className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">Senha</label>
          <input 
            type="password" 
            defaultValue="123456"
            className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            required
          />
        </div>
        <div className="space-y-2 pt-2">
          <label className="text-sm font-medium leading-none">Cargo (Simulação de Teste)</label>
          <select 
            name="role"
            className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="diretor">Diretor</option>
            <option value="gerente">Gerente</option>
            <option value="corretor">Corretor</option>
          </select>
        </div>
        <button 
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full mt-4"
        >
          {loading ? "Entrando..." : "Entrar Simulação"}
        </button>
      </form>
    </div>
  );
}
