'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CheckCircle2, PlayCircle, Lock, ChevronLeft, CheckCircle } from 'lucide-react'
import Link from 'next/link'

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
  isCompleted?: boolean
  videoUrl?: string
}

interface CoursePlayerProps {
  courseId: string
  courseTitle: string
  chapters: Chapter[]
  currentLessonId?: string
}

export function CoursePlayer({
  courseId,
  courseTitle,
  chapters,
  currentLessonId
}: CoursePlayerProps) {
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(
    chapters[0]?.lessons[0] || null
  )
  const [isCompleted, setIsCompleted] = useState(
    chapters[0]?.lessons[0]?.isCompleted || false
  )

  const handleToggleComplete = () => {
    setIsCompleted(!isCompleted)
    // TODO: Call API to update progress
  }

  const findLessonById = (lessonId: string): { lesson: Lesson; chapter: Chapter } | null => {
    for (const chapter of chapters) {
      const lesson = chapter.lessons.find(l => l.id === lessonId)
      if (lesson) {
        return { lesson, chapter }
      }
    }
    return null
  }

  const getLessonProgress = (chapter: Chapter) => {
    const completedLessons = chapter.lessons.filter(l => l.isCompleted).length
    return chapter.lessons.length > 0
      ? Math.round((completedLessons / chapter.lessons.length) * 100)
      : 0
  }

  const getOverallProgress = () => {
    const allLessons = chapters.flatMap(c => c.lessons)
    const completedLessons = allLessons.filter(l => l.isCompleted).length
    return allLessons.length > 0
      ? Math.round((completedLessons / allLessons.length) * 100)
      : 0
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <ChevronLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="font-bold text-gray-900 line-clamp-1">
                  {courseTitle}
                </h1>
                <p className="text-sm text-gray-600">
                  Progresso: {getOverallProgress()}%
                </p>
              </div>
            </div>
            {currentLesson && (
              <Button
                onClick={handleToggleComplete}
                variant={isCompleted ? 'default' : 'outline'}
                className={isCompleted ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : ''}
              >
                {isCompleted ? (
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
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:flex">
        {/* Video Player Area */}
        <div className="lg:flex-1 lg:mr-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {currentLesson ? (
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
                        <p> Vídeo não disponível</p>
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
                          {isCompleted ? 'Concluída' : 'Em progresso'}
                        </Badge>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                          {currentLesson.title}
                        </h2>
                      </div>
                    </div>
                    <p className="text-gray-600">
                      Acompanhe o vídeo acima para aprender o conteúdo desta aula.
                      Marque como concluída quando terminar.
                    </p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <PlayCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Nenhuma aula selecionada
                  </h2>
                  <p className="text-gray-600">
                    Selecione uma aula na lista para começar a assistir.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Course Sidebar */}
        <div className="lg:w-80 border-l border-gray-200 bg-white">
          <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-bold text-gray-900">Conteúdo do Curso</h3>
              <p className="text-sm text-gray-600 mt-1">
                {chapters.length} módulos • {chapters.reduce((acc, c) => acc + c.lessons.length, 0)} aulas
              </p>
            </div>
            <ScrollArea className="flex-1">
              <Accordion type="single" collapsible className="w-full">
                {chapters.map((chapter) => (
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
                              onClick={() => {
                                setCurrentLesson(lesson)
                                setIsCompleted(lesson.isCompleted || false)
                              }}
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
                              {!lesson.isFreePreview && !isCurrent && (
                                <Lock className="w-4 h-4 text-gray-400 flex-shrink-0" />
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
