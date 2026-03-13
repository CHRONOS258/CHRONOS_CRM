export default function DashboardDir() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Painel do Diretor</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Total de Leads</h3>
          </div>
          <div className="text-2xl font-bold">1,204</div>
          <p className="text-xs text-muted-foreground">+20% em relação ao mês anterior</p>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Contratos Fechados</h3>
          </div>
          <div className="text-2xl font-bold">145</div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Gerentes Ativos</h3>
          </div>
          <div className="text-2xl font-bold">4</div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Média de Aprovação</h3>
          </div>
          <div className="text-2xl font-bold">82%</div>
        </div>
      </div>
      <div className="rounded-xl border bg-card shadow-sm mt-6 min-h-[400px] flex items-center justify-center text-muted-foreground">
        Área para Gráficos e Relatórios Direcionais
      </div>
    </div>
  );
}
