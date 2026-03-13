import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Calendar, Users, Wrench, Edit2, Check } from 'lucide-react';

export default function DashboardCor() {
  const navigate = useNavigate();
  
  // Estado para o perfil personalizável
  const [profileName, setProfileName] = useState('Corretor(a)');
  const [isEditingName, setIsEditingName] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Carregar dados salvos ao montar o componente
  useEffect(() => {
    const savedName = localStorage.getItem('corretor_name');
    const savedPhoto = localStorage.getItem('corretor_photo');
    if (savedName) setProfileName(savedName);
    if (savedPhoto) setProfilePhoto(savedPhoto);
  }, []);

  // Salvar alterações
  const saveName = () => {
    setIsEditingName(false);
    localStorage.setItem('corretor_name', profileName);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setProfilePhoto(result);
        localStorage.setItem('corretor_photo', result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-10">
      
      {/* SEÇÃO DE PERFIL */}
      <div className="flex flex-col md:flex-row items-center gap-6 bg-card p-6 md:p-8 rounded-2xl border shadow-sm">
        
        {/* Foto de Perfil */}
        <div className="relative group">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-background shadow-md bg-muted flex items-center justify-center">
            {profilePhoto ? (
              <img src={profilePhoto} alt="Perfil" className="w-full h-full object-cover" />
            ) : (
              <span className="text-3xl font-semibold text-muted-foreground">
                {profileName.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full shadow-lg hover:bg-primary/90 transition-transform hover:scale-105"
            title="Alterar foto"
          >
            <Camera className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handlePhotoUpload} 
            accept="image/*" 
            className="hidden" 
          />
        </div>

        {/* Informações e Saudação */}
        <div className="flex-1 text-center md:text-left space-y-2">
          <h2 className="text-lg text-muted-foreground font-medium">Bem-vindo(a),</h2>
          <div className="flex items-center justify-center md:justify-start gap-2">
            {isEditingName ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="text-2xl md:text-3xl font-bold bg-transparent border-b-2 border-primary focus:outline-none w-auto max-w-[200px]"
                  autoFocus
                  onKeyPress={(e) => e.key === 'Enter' && saveName()}
                />
                <button onClick={saveName} className="text-green-500 hover:text-green-600 transition-colors">
                  <Check className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground">
                  {profileName}
                </h1>
                <button 
                  onClick={() => setIsEditingName(true)} 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  title="Editar nome"
                >
                  <Edit2 className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1">Portal do Corretor</p>
        </div>
      </div>

      {/* GRID DE NAVEGAÇÃO */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        
        {/* Card 1: Leads */}
        <button 
          onClick={() => navigate('/corretor/leads')}
          className="group flex flex-col items-center justify-center p-8 bg-card border rounded-2xl shadow-sm hover:shadow-md transition-all hover:border-primary hover:-translate-y-1"
        >
          <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-card-foreground">Meus Leads</h3>
          <p className="text-sm text-muted-foreground text-center">
            Acesse os contatos depositados pelo gerente.
          </p>
        </button>

        {/* Card 2: Agenda */}
        <button 
          onClick={() => navigate('/corretor/agenda')}
          className="group flex flex-col items-center justify-center p-8 bg-card border rounded-2xl shadow-sm hover:shadow-md transition-all hover:border-primary hover:-translate-y-1"
        >
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Calendar className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-card-foreground">Minha Agenda</h3>
          <p className="text-sm text-muted-foreground text-center">
            Organize seus compromissos e visitas.
          </p>
        </button>

        {/* Card 3: Ferramenta Futura */}
        <button 
          onClick={() => navigate('/corretor/ferramenta')}
          className="group flex flex-col items-center justify-center p-8 bg-card border rounded-2xl shadow-sm hover:shadow-md transition-all hover:border-primary hover:-translate-y-1 md:col-span-2 lg:col-span-1"
        >
          <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Wrench className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-card-foreground">Nova Ferramenta</h3>
          <p className="text-sm text-muted-foreground text-center">
            Aguarde nossas próximas novidades.
          </p>
        </button>

      </div>
    </div>
  );
}
