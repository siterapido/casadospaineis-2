'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Sidebar } from '@/components/layout/sidebar'
import { CourseCard } from '@/components/course/course-card'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookOpen, Clock, Trophy, TrendingUp, PlayCircle, ArrowRight } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { Skeleton } from '@/components/ui/skeleton'

interface Purchase {
  id: string
  course: {
    id: string
    title: string
    description: string
    imageUrl: string | null
    price: number
    category: {
      name: string
    }
    totalLessons: number
    completedLessons: number
    progress: number
  }
}

interface ProgressData {
  totalCourses: number
  overallProgress: number
  totalLessonsCompleted: number
  totalLessons: number
}

export default function DashboardPage() {
  const { user, isLoaded: userLoaded } = useUser()
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [progress, setProgress] = useState<ProgressData>({
    totalCourses: 0,
    overallProgress: 0,
    totalLessonsCompleted: 0,
    totalLessons: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (userLoaded && user) {
      fetchUserData()
    }
  }, [userLoaded, user])

  const fetchUserData = async () => {
    if (!user) return

    try {
      // Fetch purchases
      const purchasesRes = await fetch(`/api/purchases?userId=${user.id}`)
      if (purchasesRes.ok) {
        const purchasesData = await purchasesRes.json()
        setPurchases(purchasesData)

        // Calculate progress
        const totalCourses = purchasesData.length
        const totalLessonsCompleted = purchasesData.reduce(
          (acc: number, p: Purchase) => acc + p.course.completedLessons,
          0
        )
        const totalLessons = purchasesData.reduce(
          (acc: number, p: Purchase) => acc + p.course.totalLessons,
          0
        )
        const overallProgress = totalLessons > 0
          ? Math.round((totalLessonsCompleted / totalLessons) * 100)
          : 0

        setProgress({
          totalCourses,
          overallProgress,
          totalLessonsCompleted,
          totalLessons
        })
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!userLoaded) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar currentPage="dashboard" />
        <main className="lg:ml-64">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Skeleton className="h-12 w-64 mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[1, 2, 3, 4].map(i => (
                <Skeleton key={i} className="h-32 rounded-xl" />
              ))}
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPage="dashboard" />

      {/* Main Content */}
      <main className="lg:ml-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Olá, {user?.firstName || 'Bem-vindo'}! 👋
            </h1>
            <p className="text-gray-600">
              Continue sua jornada de aprendizado.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-blue-100">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <Trophy className="w-8 h-8 text-blue-600 opacity-20" />
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {loading ? <Skeleton className="h-8 w-16" /> : progress.totalCourses}
                </p>
                <p className="text-sm text-gray-600">Cursos Comprados</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-emerald-100">
                    <TrendingUp className="w-6 h-6 text-emerald-600" />
                  </div>
                  <Trophy className="w-8 h-8 text-emerald-600 opacity-20" />
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {loading ? <Skeleton className="h-8 w-16" /> : `${progress.overallProgress}%`}
                </p>
                <p className="text-sm text-gray-600">Progresso Geral</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-purple-100">
                    <PlayCircle className="w-6 h-6 text-purple-600" />
                  </div>
                  <Trophy className="w-8 h-8 text-purple-600 opacity-20" />
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {loading ? <Skeleton className="h-8 w-16" /> : progress.totalLessonsCompleted}
                </p>
                <p className="text-sm text-gray-600">Aulas Concluídas</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-orange-100">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <Trophy className="w-8 h-8 text-orange-600 opacity-20" />
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {loading ? <Skeleton className="h-8 w-16" /> : `${Math.round(progress.totalLessonsCompleted * 0.5)}h`}
                </p>
                <p className="text-sm text-gray-600">Horas de Estudo</p>
              </CardContent>
            </Card>
          </div>

          {/* Overall Progress */}
          {progress.totalCourses > 0 && (
            <Card className="mb-8 bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">
                      Progresso Geral
                    </h3>
                    <p className="text-sm text-gray-600">
                      Você completou {progress.totalLessonsCompleted} de {progress.totalLessons} aulas
                    </p>
                  </div>
                  <Badge className="bg-emerald-600 text-white">
                    {progress.overallProgress}% completo
                  </Badge>
                </div>
                <Progress value={progress.overallProgress} className="h-3" />
              </CardContent>
            </Card>
          )}

          {/* Purchased Courses */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Meus Cursos
              </h2>
              {purchases.length > 0 && (
                <Link href="/courses">
                  <Button variant="outline">
                    Explorar Mais
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              )}
            </div>

            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <Skeleton className="h-48 w-full" />
                    <div className="p-6 space-y-4">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-1/2" />
                      <div className="flex justify-between items-center pt-4">
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-10 w-24" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : purchases.length === 0 ? (
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
                        Explore nosso catálogo e comece sua jornada de aprendizado hoje.
                      </p>
                      <Link href="/courses">
                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                          Explorar Cursos
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {purchases.map((purchase) => (
                  <CourseCard
                    key={purchase.id}
                    id={purchase.course.id}
                    title={purchase.course.title}
                    description={purchase.course.description || ''}
                    imageUrl={purchase.course.imageUrl || undefined}
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
