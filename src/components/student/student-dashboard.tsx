'use client'

import { Sidebar } from '@/components/layout/sidebar'
import { CourseCard } from '@/components/course/course-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookOpen, Clock, Trophy, TrendingUp, PlayCircle } from 'lucide-react'

interface DashboardProps {
  purchasedCourses?: any[]
  overallProgress?: number
  totalLessonsCompleted?: number
}

export function StudentDashboard({
  purchasedCourses = [],
  overallProgress = 0,
  totalLessonsCompleted = 0
}: DashboardProps) {
  const stats = [
    {
      label: 'Cursos Comprados',
      value: purchasedCourses.length,
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      label: 'Progresso Geral',
      value: `${overallProgress}%`,
      icon: TrendingUp,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100'
    },
    {
      label: 'Aulas Concluídas',
      value: totalLessonsCompleted,
      icon: PlayCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      label: 'Horas de Estudo',
      value: '12.5h',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPage="dashboard" />

      {/* Main Content */}
      <main className="lg:ml-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Dashboard do Aluno
            </h1>
            <p className="text-gray-600">
              Acompanhe seu progresso e continue aprendendo.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                        <Icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      <Trophy className={`w-8 h-8 ${stat.color} opacity-20`} />
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Overall Progress */}
          <Card className="mb-8 bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    Progresso Geral
                  </h3>
                  <p className="text-sm text-gray-600">
                    Você está fazendo um ótimo progresso!
                  </p>
                </div>
                <Badge className="bg-emerald-600 text-white">
                  {overallProgress}% completo
                </Badge>
              </div>
              <Progress value={overallProgress} className="h-3" />
            </CardContent>
          </Card>

          {/* Purchased Courses */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Meus Cursos
              </h2>
              {purchasedCourses.length > 0 && (
                <Button variant="outline">
                  Ver Todos
                </Button>
              )}
            </div>

            {purchasedCourses.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="p-4 rounded-full bg-gray-100">
                      <BookOpen className="w-12 h-12 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Você ainda não comprou nenhum curso
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Explore nossa catálogo e comece sua jornada de aprendizado hoje.
                      </p>
                      <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                        Explorar Cursos
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {purchasedCourses.map((purchase) => (
                  <CourseCard
                    key={purchase.id}
                    id={purchase.course.id}
                    title={purchase.course.title}
                    description={purchase.course.description || ''}
                    imageUrl={purchase.course.imageUrl}
                    price={purchase.course.price}
                    category={purchase.course.category.name}
                    isPurchased={true}
                    progress={purchase.course.progress || 0}
                    totalLessons={purchase.course.totalLessons}
                    completedLessons={purchase.course.completedLessons}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
