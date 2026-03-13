

export default function LeadsCor() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Meus Leads</h2>
      </div>

      {/* Kanban Board Mock Simplificado */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[calc(100vh-200px)]">
        
        {/* Coluna 1 */}
        <div className="flex flex-col rounded-xl bg-muted/30 border border-border/50 p-2">
          <h3 className="font-semibold text-sm px-2 py-3 flex justify-between">
            Novo Contato <span className="text-muted-foreground">3</span>
          </h3>
          <div className="flex-1 space-y-2 overflow-y-auto">
            <div className="bg-card p-3 rounded-md shadow-sm border cursor-pointer hover:border-primary">
              <p className="font-medium text-sm">João da Silva</p>
              <p className="text-xs text-muted-foreground truncate">Anotações: Procurando ap de 2 quartos.</p>
            </div>
          </div>
        </div>

        {/* Coluna 2 */}
        <div className="flex flex-col rounded-xl bg-muted/30 border border-border/50 p-2">
          <h3 className="font-semibold text-sm px-2 py-3 flex justify-between">
            Em Atendimento <span className="text-muted-foreground">1</span>
          </h3>
          <div className="flex-1 space-y-2 overflow-y-auto">
             <div className="bg-card p-3 rounded-md shadow-sm border cursor-pointer hover:border-primary">
              <p className="font-medium text-sm">Maria Fernandes</p>
              <p className="text-xs text-muted-foreground truncate rounded-full bg-accent text-accent-foreground px-2 py-0.5 mt-2 w-max border">Faltam documentos</p>
            </div>
          </div>
        </div>

        {/* Coluna 3 */}
        <div className="flex flex-col rounded-xl bg-muted/30 border border-border/50 p-2">
          <h3 className="font-semibold text-sm px-2 py-3 flex justify-between">
            Avançado (Upload em Analise) <span className="text-muted-foreground">0</span>
          </h3>
          <div className="flex-1 space-y-2 overflow-y-auto">
          </div>
        </div>

         {/* Coluna 4 */}
         <div className="flex flex-col rounded-xl bg-muted/30 border border-border/50 p-2">
          <h3 className="font-semibold text-sm px-2 py-3 flex justify-between">
            Em Fechamento <span className="text-muted-foreground">2</span>
          </h3>
          <div className="flex-1 space-y-2 overflow-y-auto">
            <div className="bg-card p-3 rounded-md shadow-sm border cursor-pointer hover:border-primary">
              <p className="font-medium text-sm">Carlos Santos</p>
              <p className="text-xs text-green-600 font-medium py-0.5 mt-1">Aprovado na Caixa</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
