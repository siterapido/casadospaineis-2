'use client'

import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  BookOpen,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  PlayCircle,
  Plus,
  ArrowRight,
  Eye,
  CheckCircle2
} from 'lucide-react'

export default function AdminDashboard() {
  // Mock data - será substituído por dados do backend
  const stats = [
    {
      title: 'Total de Cursos',
      value: '12',
      change: '+2 este mês',
      isPositive: true,
      icon: BookOpen,
      color: 'bg-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Alunos Ativos',
      value: '1,234',
      change: '+18% este mês',
      isPositive: true,
      icon: Users,
      color: 'bg-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      title: 'Receita Total',
      value: 'R$ 45.678',
      change: '+23% este mês',
      isPositive: true,
      icon: DollarSign,
      color: 'bg-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Vendas',
      value: '89',
      change: '-5% este mês',
      isPositive: false,
      icon: TrendingDown,
      color: 'bg-purple-600',
      bgColor: 'bg-purple-50'
    }
  ]

  const recentCourses = [
    { id: '1', title: 'Next.js Avançado', students: 234, progress: 78, published: true },
    { id: '2', title: 'React Native', students: 189, progress: 45, published: true },
    { id: '3', title: 'TypeScript Master', students: 156, progress: 23, published: false }
  ]

  const recentStudents = [
    { id: '1', name: 'João Silva', email: 'joao@email.com', enrolledAt: '2 horas atrás' },
    { id: '2', name: 'Maria Santos', email: 'maria@email.com', enrolledAt: '5 horas atrás' },
    { id: '3', name: 'Pedro Costa', email: 'pedro@email.com', enrolledAt: '1 dia atrás' }
  ]

  const recentSales = [
    { id: '1', student: 'João Silva', course: 'Next.js Avançado', amount: 'R$ 297,00', date: '2 horas atrás' },
    { id: '2', student: 'Maria Santos', course: 'React Native', amount: 'R$ 397,00', date: '5 horas atrás' },
    { id: '3', student: 'Pedro Costa', course: 'TypeScript Master', amount: 'R$ 197,00', date: '1 dia atrás' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar currentPage="dashboard" />

      <main className="lg:ml-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Dashboard Administrativo
              </h1>
              <p className="text-gray-600">
                Bem-vindo de volta! Aqui está uma visão geral da sua plataforma.
              </p>
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Novo Curso
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              const TrendIcon = stat.isPositive ? TrendingUp : TrendingDown
              return (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                        <Icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      <div className={`flex items-center gap-1 text-xs font-medium ${
                        stat.isPositive ? 'text-emerald-600' : 'text-red-600'
                      }`}>
                        <TrendIcon className="w-3 h-3" />
                        {stat.change}
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Recent Courses */}
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Cursos Recentes</CardTitle>
                <Button variant="ghost" size="sm">
                  Ver Todos
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentCourses.map((course) => (
                    <div
                      key={course.id}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900 truncate">
                            {course.title}
                          </h3>
                          {course.published ? (
                            <Badge variant="secondary" className="text-xs">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Publicado
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-xs">
                              Rascunho
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {course.students} alunos
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {course.progress}% completo
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Students */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Novos Alunos</CardTitle>
                <Button variant="ghost" size="sm">
                  Ver Todos
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentStudents.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center gap-3"
                    >
                      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-semibold text-emerald-600">
                          {student.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 text-sm truncate">
                          {student.name}
                        </h3>
                        <p className="text-xs text-gray-600 truncate">
                          {student.email}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {student.enrolledAt}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Sales */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Vendas Recentes</CardTitle>
              <Button variant="ghost" size="sm">
                Ver Todas
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-600 border-b">
                      <th className="pb-3 font-medium">Aluno</th>
                      <th className="pb-3 font-medium">Curso</th>
                      <th className="pb-3 font-medium">Valor</th>
                      <th className="pb-3 font-medium">Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentSales.map((sale) => (
                      <tr key={sale.id} className="border-b border-gray-100">
                        <td className="py-4">
                          <p className="font-medium text-gray-900">{sale.student}</p>
                        </td>
                        <td className="py-4">
                          <p className="text-gray-600">{sale.course}</p>
                        </td>
                        <td className="py-4">
                          <p className="font-semibold text-emerald-600">{sale.amount}</p>
                        </td>
                        <td className="py-4">
                          <p className="text-sm text-gray-600">{sale.date}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
