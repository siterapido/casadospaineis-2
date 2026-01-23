'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  CheckCircle2,
  PlayCircle,
  Lock,
  ChevronLeft,
  CheckCircle,
  Loader2
} from 'lucide-react'
import { useUser } from '@clerk/nextjs'
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
  videoUrl: string | null
  isCompleted?: boolean
}

interface Course {
  id: string
  title: string
  description: string
  chapters: Chapter[]
}

export default function LearnPage({ params }: { params: { courseId: string } }) {
  const { user, isLoaded: userLoaded } = useUser()
  const [course, setCourse] = useState<Course | null>(null)
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null)
  const [loading, setLoading] = useState(true)
  const [updatingProgress, setUpdatingProgress] = useState(false)

  useEffect(() => {
    if (userLoaded && user) {
      fetchCourse()
    }
  }, [userLoaded, user, params.courseId])

  const fetchCourse = async () => {
    if (!user) return

    try {
      setLoading(true)
      const res = await fetch(`/api/courses/${params.courseId}`)
      if (!res.ok) {
        throw new Error('Curso não encontrado')
      }

      const data = await res.json()
      setCourse(data)

      // Fetch user progress
      const progressRes = await fetch(`/api/progress?userId=${user.id}&courseId=${params.courseId}`)
      if (progressRes.ok) {
        const progressData = await progressRes.json()
        const completedLessons = new Set(progressData.map((p: any) => p.lessonId))

        // Mark lessons as completed
        const chaptersWithProgress = data.chapters.map((chapter: Chapter) => ({
          ...chapter,
          lessons: chapter.lessons.map((lesson: Lesson) => ({
            ...lesson,
            isCompleted: completedLessons.has(lesson.id)
          }))
        }))

        setCourse({ ...data, chapters: chaptersWithProgress })

        // Set first lesson as current
        const firstLesson = chaptersWithProgress[0]?.lessons[0]
        if (firstLesson) {
          setCurrentLesson(firstLesson)
        }
      }
    } catch (error) {
      console.error('Error fetching course:', error)
      toast.error('Erro ao carregar curso')
      window.location.href = '/courses'
    } finally {
      setLoading(false)
    }
  }

  const handleToggleComplete = async () => {
    if (!user || !currentLesson) return

    setUpdatingProgress(true)
    try {
      const res = await fetch('/api/progress', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          lessonId: currentLesson.id,
          isCompleted: !currentLesson.isCompleted
        })
      })

      if (res.ok) {
        const updatedLesson = {
          ...currentLesson,
          isCompleted: !currentLesson.isCompleted
        }

        setCurrentLesson(updatedLesson)

        // Update course state
        if (course) {
          const updatedChapters = course.chapters.map(chapter => ({
            ...chapter,
            lessons: chapter.lessons.map(lesson =>
              lesson.id === currentLesson.id ? updatedLesson : lesson
            )
          }))

          setCourse({ ...course, chapters: updatedChapters })
        }

        toast.success(updatedLesson.isCompleted ? 'Aula marcada como concluída!' : 'Aula marcada como pendente')
      }
    } catch (error) {
      console.error('Error updating progress:', error)
      toast.error('Erro ao atualizar progresso')
    } finally {
      setUpdatingProgress(false)
    }
  }

  const getLessonProgress = (chapter: Chapter) => {
    const completedLessons = chapter.lessons.filter(l => l.isCompleted).length
    return chapter.lessons.length > 0
      ? Math.round((completedLessons / chapter.lessons.length) * 100)
      : 0
  }

  const getOverallProgress = () => {
    if (!course) return 0
    const allLessons = course.chapters.flatMap(c => c.lessons)
    const completedLessons = allLessons.filter(l => l.isCompleted).length
    return allLessons.length > 0
      ? Math.round((completedLessons / allLessons.length) * 100)
      : 0
  }

  if (loading || !course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-emerald-600 animate-spin" />
      </div>
    )
  }

  if (!currentLesson) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-12 text-center">
            <PlayCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhuma aula disponível
            </h2>
            <p className="text-gray-600 mb-6">
              Este curso ainda não possui aulas cadastradas.
            </p>
            <Link href="/dashboard">
              <Button>Voltar ao Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href={`/courses/${course.id}`}>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <ChevronLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="font-bold text-gray-900 line-clamp-1">
                  {course.title}
                </h1>
                <p className="text-sm text-gray-600">
                  Progresso: {getOverallProgress()}%
                </p>
              </div>
            </div>
            <Button
              onClick={handleToggleComplete}
              variant={currentLesson.isCompleted ? 'default' : 'outline'}
              disabled={updatingProgress}
              className={currentLesson.isCompleted ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : ''}
            >
              {updatingProgress ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : currentLesson.isCompleted ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Concluída
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Marcar como Concluída
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:flex">
        {/* Video Player Area */}
        <div className="lg:flex-1 lg:mr-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="space-y-6">
              {/* Video Player */}
              <div className="bg-black rounded-xl overflow-hidden aspect-video">
                {currentLesson.videoUrl ? (
                  <iframe
                    src={currentLesson.videoUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={currentLesson.title}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-900">
                    <div className="text-center text-gray-400">
                      <PlayCircle className="w-16 h-16 mx-auto mb-4" />
                      <p>Vídeo não disponível</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Lesson Info */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <Badge variant="secondary" className="mb-2">
                        {currentLesson.isCompleted ? 'Concluída' : 'Em progresso'}
                      </Badge>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {currentLesson.title}
                      </h2>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    Acompanhe o vídeo acima para aprender o conteúdo desta aula.
                    Marque como concluída quando terminar para acompanhar seu progresso.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Course Sidebar */}
        <div className="lg:w-80 border-l border-gray-200 bg-white">
          <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-bold text-gray-900">Conteúdo do Curso</h3>
              <p className="text-sm text-gray-600 mt-1">
                {course.chapters.length} módulos • {course.chapters.reduce((acc, c) => acc + c.lessons.length, 0)} aulas
              </p>
            </div>
            <ScrollArea className="flex-1">
              <Accordion type="single" collapsible className="w-full">
                {course.chapters.map((chapter) => (
                  <AccordionItem key={chapter.id} value={`chapter-${chapter.id}`}>
                    <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="flex-1 text-left">
                          <div className="font-semibold text-gray-900">
                            {chapter.position}. {chapter.title}
                          </div>
                          <div className="text-sm text-gray-500 mt-0.5">
                            {chapter.lessons.length} aulas • {getLessonProgress(chapter)}% completo
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-1">
                        {chapter.lessons.map((lesson) => {
                          const isCurrent = currentLesson?.id === lesson.id
                          return (
                            <button
                              key={lesson.id}
                              onClick={() => setCurrentLesson(lesson)}
                              className={`w-full flex items-center gap-3 px-6 py-3 text-left transition-colors ${
                                isCurrent
                                  ? 'bg-emerald-50 text-emerald-900 border-l-4 border-emerald-600'
                                  : 'hover:bg-gray-50 text-gray-700'
                              }`}
                            >
                              {lesson.isCompleted ? (
                                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                              ) : (
                                <PlayCircle className={`w-5 h-5 flex-shrink-0 ${isCurrent ? 'text-emerald-600' : 'text-gray-400'}`} />
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">
                                  {lesson.position}. {lesson.title}
                                </p>
                              </div>
                              {lesson.isFreePreview && (
                                <Badge variant="secondary" className="text-xs">
                                  Grátis
                                </Badge>
                              )}
                            </button>
                          )
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  )
}
