'use client'

import { useEffect, useState } from 'react'
import { Sidebar } from '@/components/layout/sidebar'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import {
  Clock,
  PlayCircle,
  Users,
  BookOpen,
  CheckCircle2,
  Lock,
  ArrowRight,
  Star
} from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'

interface Chapter {
  id: string
  title: string
  position: number
  lessons: Lesson[]
}

interface Lesson {
  id: string
  title: string
  position: number
  isFreePreview: boolean
}

interface Course {
  id: string
  title: string
  description: string
  imageUrl: string | null
  price: number
  category: {
    id: string
    name: string
  }
  chapters: Chapter[]
  totalLessons: number
}

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const { user, isLoaded: userLoaded } = useUser()
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [purchased, setPurchased] = useState(false)
  const [purchasing, setPurchasing] = useState(false)

  useEffect(() => {
    fetchCourse()
  }, [params.id])

  const fetchCourse = async () => {
    try {
      const res = await fetch(`/api/courses/${params.id}`)
      if (res.ok) {
        const data = await res.json()
        setCourse(data)
      }
    } catch (error) {
      console.error('Error fetching course:', error)
      toast.error('Erro ao carregar curso')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (userLoaded && user && course) {
      checkPurchased()
    }
  }, [userLoaded, user, course])

  const checkPurchased = async () => {
    if (!user || !course) return

    try {
      const res = await fetch(`/api/purchases?userId=${user.id}`)
      if (res.ok) {
        const purchases = await res.json()
        const isPurchased = purchases.some((p: any) => p.course.id === course.id)
        setPurchased(isPurchased)
      }
    } catch (error) {
      console.error('Error checking purchase:', error)
    }
  }

  const handlePurchase = async () => {
    if (!user) {
      toast.error('Você precisa fazer login para comprar um curso')
      window.location.href = '/login'
      return
    }

    setPurchasing(true)
    try {
      const res = await fetch('/api/purchases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          courseId: course.id
        })
      })

      if (res.ok) {
        toast.success('Curso comprado com sucesso!')
        setPurchased(true)
        window.location.href = `/learn/${course.id}`
      } else {
        const data = await res.json()
        toast.error(data.error || 'Erro ao comprar curso')
      }
    } catch (error) {
      console.error('Error purchasing course:', error)
      toast.error('Erro ao comprar curso')
    } finally {
      setPurchasing(false)
    }
  }

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar currentPage="courses" />
        <main className="lg:ml-64">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Skeleton className="h-64 w-full rounded-xl mb-8" />
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-96 w-full" />
              </div>
              <div className="space-y-6">
                <Skeleton className="h-64 w-full rounded-xl" />
                <Skeleton className="h-48 w-full rounded-xl" />
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar currentPage="courses" />
        <main className="lg:ml-64">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <BookOpen className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Curso não encontrado
            </h2>
            <p className="text-gray-600 mb-6">
              O curso que você está procurando não existe ou foi removido.
            </p>
            <Button variant="outline" onClick={() => window.location.href = '/courses'}>
              Voltar para os Cursos
            </Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPage="courses" />

      {/* Main Content */}
      <main className="lg:ml-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-8 lg:p-12 text-white mb-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <Badge className="bg-white/20 hover:bg-white/30 text-white mb-4">
                  {course.category.name}
                </Badge>
                <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                  {course.title}
                </h1>
                <p className="text-emerald-100 mb-6">
                  {course.description}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <PlayCircle className="w-5 h-5" />
                    <span>{course.totalLessons} aulas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span>+500 alunos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span>4.9 (234 avaliações)</span>
                  </div>
                </div>
              </div>
              <div className="text-center lg:text-right">
                <div className="text-4xl lg:text-5xl font-bold mb-2">
                  {course.price === 0 ? 'Grátis' : formatPrice(course.price)}
                </div>
                {purchased ? (
                  <Button
                    size="lg"
                    variant="secondary"
                    className="bg-white text-emerald-700 hover:bg-gray-100 text-lg px-8"
                    onClick={() => window.location.href = `/learn/${course.id}`}
                  >
                    Continuar Curso
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    variant="secondary"
                    className="bg-white text-emerald-700 hover:bg-gray-100 text-lg px-8"
                    onClick={handlePurchase}
                    disabled={purchasing}
                  >
                    {purchasing ? 'Processando...' : 'Comprar Agora'}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                )}
                {!user && (
                  <p className="text-emerald-100 text-sm mt-2">
                    Faça login para comprar
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Sobre o Curso
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {course.description}
                  </p>
                  <p className="text-gray-600 leading-relaxed mt-4">
                    Este curso foi desenvolvido para proporcionar uma experiência de aprendizado completa e prática.
                    Você terá acesso a conteúdo de alta qualidade, exemplos reais e projetos práticos para consolidar seu conhecimento.
                  </p>
                </CardContent>
              </Card>

              {/* Curriculum */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Conteúdo do Curso
                  </h2>
                  <Accordion type="single" collapsible className="w-full">
                    {course.chapters.map((chapter) => (
                      <AccordionItem key={chapter.id} value={`chapter-${chapter.id}`}>
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center gap-3 flex-1 text-left">
                            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                              <span className="text-sm font-semibold text-emerald-600">
                                {chapter.position}
                              </span>
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">
                                {chapter.title}
                              </div>
                              <div className="text-sm text-gray-500">
                                {chapter.lessons.length} aulas
                              </div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2">
                            {chapter.lessons.map((lesson) => (
                              <div
                                key={lesson.id}
                                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                              >
                                {lesson.isFreePreview ? (
                                  <PlayCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                                ) : (
                                  <Lock className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                )}
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900">
                                    {lesson.position}. {lesson.title}
                                  </p>
                                </div>
                                {lesson.isFreePreview && (
                                  <Badge variant="secondary" className="text-xs">
                                    Grátis
                                  </Badge>
                                )}
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Preço</span>
                      <span className="text-2xl font-bold text-emerald-600">
                        {course.price === 0 ? 'Grátis' : formatPrice(course.price)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Aulas</span>
                      <span className="font-semibold text-gray-900">{course.totalLessons}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Nível</span>
                      <span className="font-semibold text-gray-900">Intermediário</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Idioma</span>
                      <span className="font-semibold text-gray-900">Português</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Certificado</span>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span className="font-semibold text-gray-900">Sim</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Acesso</span>
                      <span className="font-semibold text-gray-900">Vitalício</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Features */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-gray-900 mb-4">O que você vai aprender</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">
                        Desenvolver habilidades práticas e aplicáveis
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">
                        Construir projetos reais do zero
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">
                        Aplicar melhores práticas da indústria
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">
                        Receber certificado de conclusão
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
