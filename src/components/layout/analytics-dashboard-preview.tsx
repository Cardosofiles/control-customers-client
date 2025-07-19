'use client'

import { HeartHandshake, Target, TrendingUp } from 'lucide-react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

const growthData = [
  { month: 'Jan', users: 1200, revenue: 45000 },
  { month: 'Fev', users: 1800, revenue: 52000 },
  { month: 'Mar', users: 2400, revenue: 68000 },
  { month: 'Abr', users: 3200, revenue: 85000 },
  { month: 'Mai', users: 4100, revenue: 98000 },
  { month: 'Jun', users: 5200, revenue: 125000 },
]

const industryData = [
  { name: 'E-commerce', value: 35, color: '#8b5cf6' },
  { name: 'Serviços', value: 28, color: '#06b6d4' },
  { name: 'Tecnologia', value: 22, color: '#10b981' },
  { name: 'Outros', value: 15, color: '#f59e0b' },
]

const satisfactionData = [
  { category: 'Interface', score: 96 },
  { category: 'Performance', score: 94 },
  { category: 'Suporte', score: 98 },
  { category: 'Recursos', score: 92 },
]

export function AnalyticsDashboardPreview() {
  return (
    <section className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold">
            Dashboard de <span className="text-primary">Elite</span>
          </h2>
          <p className="text-muted-foreground text-xl">
            Visualize dados como nunca antes
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Gráfico de Crescimento */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Crescimento Exponencial
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={growthData}>
                    <defs>
                      <linearGradient
                        id="colorUsers"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#8b5cf6"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#8b5cf6"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Area
                      type="monotone"
                      dataKey="users"
                      stroke="#8b5cf6"
                      fillOpacity={1}
                      fill="url(#colorUsers)"
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Distribuição por Setor */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-500" />
                Setores Atendidos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={industryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {industryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {industryData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Métricas de Satisfação */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HeartHandshake className="h-5 w-5 text-red-500" />
                Índices de Satisfação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={satisfactionData}
                    layout="horizontal"
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <XAxis
                      type="number"
                      domain={[0, 100]}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis
                      type="category"
                      dataKey="category"
                      axisLine={false}
                      tickLine={false}
                      width={80}
                      tick={{ fontSize: 12 }}
                    />
                    <Bar
                      dataKey="score"
                      fill="#10b981"
                      radius={[0, 6, 6, 0]}
                      background={{
                        fill: 'hsl(var(--muted))',
                      }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Legenda adicional para melhor visualização */}
              <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                {satisfactionData.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {item.score}%
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {item.category}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
