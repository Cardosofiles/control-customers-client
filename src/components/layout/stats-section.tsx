export function StarsSections() {
  return (
    <section className="bg-card/50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="text-center">
            <div className="text-primary mb-2 text-4xl font-bold md:text-5xl">
              50K+
            </div>
            <div className="text-muted-foreground">Empresas Ativas</div>
          </div>
          <div className="text-center">
            <div className="text-primary mb-2 text-4xl font-bold md:text-5xl">
              2M+
            </div>
            <div className="text-muted-foreground">Clientes Gerenciados</div>
          </div>
          <div className="text-center">
            <div className="text-primary mb-2 text-4xl font-bold md:text-5xl">
              99.9%
            </div>
            <div className="text-muted-foreground">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-primary mb-2 text-4xl font-bold md:text-5xl">
              4.9★
            </div>
            <div className="text-muted-foreground">Avaliação</div>
          </div>
        </div>
      </div>
    </section>
  )
}
