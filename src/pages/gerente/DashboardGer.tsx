export default function DashboardGer() {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Painel do Gerente</h2>
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground h-10 px-4 py-2">
            Depositar Novo Lead
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground">Novos Leads s/ Atribuição</h3>
            <div className="text-2xl font-bold mt-2">12</div>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground">Corretores na Equipe</h3>
            <div className="text-2xl font-bold mt-2">8</div>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground">Avançando em Check-list</h3>
            <div className="text-2xl font-bold mt-2">34</div>
          </div>
        </div>
        <div className="rounded-xl border bg-card shadow-sm mt-6 p-6">
          <h3 className="font-semibold mb-4">Gestão da Equipe</h3>
          <div className="h-[300px] flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg">
             Tabela de Atribuição de Leads aos Corretores
          </div>
        </div>
      </div>
    );
  }
