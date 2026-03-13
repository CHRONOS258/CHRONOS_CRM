import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
// IMPORTANTE: precisamos usar a ROLE KEY aqui para bypass do RLS ao criar usuários na tabela public
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY; 

if (!supabaseUrl || !supabaseKey) {
  console.error("Faltam variáveis de ambiente!");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const generatePassword = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*";
    let password = "";
    for (let i = 0; i < 10; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
};

const usersToCreate = [
  { email: 'diretor@empresa.com', role: 'DIRETOR', name: 'Diretor Geral', password: generatePassword() },
  { email: 'gerente@empresa.com', role: 'GERENTE', name: 'Gerente Comercial', password: generatePassword() },
  { email: 'corretor@empresa.com', role: 'CORRETOR', name: 'Corretor João', password: generatePassword() },
];

async function setupUsers() {
  console.log("Iniciando setup das contas...");
  
  for (const u of usersToCreate) {
    // 1. Criar Auth Account
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: u.email,
      password: u.password,
    });
    
    if (authError) {
      console.log(`❌ Erro ao criar Auth para ${u.email}:`, authError.message);
      continue;
    }
    
    console.log(`✅ Auth criada para ${u.email} (Senha: ${u.password})`);
    
    if (authData.user) {
        // 2. Criar Vínculo na Tabela User
        const { error: dbError } = await supabase
            .from('User')
            .upsert({ id: u.email, email: u.email, name: u.name, role: u.role });
            
        if (dbError) {
            console.log(`⚠️ Aviso ao sincronizar BD (pode ser problema de RLS):`, dbError.message);
        } else {
             console.log(`✅ Sincronizado ${u.role} no Banco de Dados Público.`);
        }
    }
  }
  console.log("\nSetup concluído.");
}

setupUsers();
