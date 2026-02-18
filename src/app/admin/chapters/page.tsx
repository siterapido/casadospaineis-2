'use client'

import { useEffect, useState } from 'react'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Search, BookOpen, FileText, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface Lesson {
  id: string
  title: string
  isPublished: boolean
  position: number
}

interface Chapter {
  id: string
  title: string
  position: number
  isPublished: boolean
  courseId: string
  course: {
    id: string
    title: string
  }
  lessons: Lesson[]
}

export default function AdminChaptersPage() {
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetch('/api/admin/courses')
      .then(res => res.ok ? res.json() : [])
      .then(async (courses: any[]) => {
        // Fetch full course data with chapters for each course
        const allChapters: Chapter[] = []
        for (const course of courses) {
          try {
            const res = await fetch(`/api/admin/courses/${course.id}`)
            if (res.ok) {
              const data = await res.json()
              const courseChapters = (data.chapters || []).map((ch: any) => ({
                ...ch,
                course: { id: course.id, title: course.title }
              }))
              allChapters.push(...courseChapters)
            }
          } catch {}
        }
        setChapters(allChapters)
      })
      .catch(() => setChapters([]))
      .finally(() => setLoading(false))
  }, [])

  const filtered = chapters.filter(ch =>
    ch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ch.course.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalLessons = chapters.reduce((acc, ch) => acc + (ch.lessons?.length || 0), 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar currentPage="chapters" />

      <main className="lg:ml-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Capítulos e Aulas</h1>
            <p className="text-gray-600">Gerencie a estrutura de conteúdo de todos os cursos.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{loading ? '—' : chapters.length}</p>
                  <p className="text-sm text-gray-500">Capítulos</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{loading ? '—' : totalLessons}</p>
                  <p className="text-sm text-gray-500">Aulas</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {loading ? '—' : chapters.filter(ch => ch.isPublished).length}
                  </p>
                  <p className="text-sm text-gray-500">Publicados</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar por capítulo ou curso..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* List */}
          {loading ? (
            <div className="space-y-3">
              {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-20 rounded-xl" />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                {searchQuery ? 'Nenhum resultado encontrado' : 'Nenhum capítulo cadastrado'}
              </h2>
              <p className="text-gray-500 mb-4">
                {searchQuery
                  ? 'Tente ajustar o termo de busca.'
                  : 'Adicione cursos e capítulos para que apareçam aqui.'}
              </p>
              <Link
                href="/admin/courses"
                className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Ir para Cursos <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map(chapter => (
                <Card key={chapter.id} className="hover:shadow-sm transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                            {chapter.course.title}
                          </span>
                          <ChevronRight className="w-3 h-3 text-gray-300" />
                          <span className="text-xs text-gray-400">Cap. {chapter.position}</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 truncate">{chapter.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {chapter.lessons?.length || 0} {chapter.lessons?.length === 1 ? 'aula' : 'aulas'}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Badge
                          variant={chapter.isPublished ? 'default' : 'secondary'}
                          className={chapter.isPublished
                            ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                            : 'bg-gray-100 text-gray-600'}
                        >
                          {chapter.isPublished ? 'Publicado' : 'Rascunho'}
                        </Badge>
                      </div>
                    </div>

                    {/* Lessons list */}
                    {chapter.lessons && chapter.lessons.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-100 space-y-1">
                        {chapter.lessons.sort((a, b) => a.position - b.position).map(lesson => (
                          <div key={lesson.id} className="flex items-center gap-2 text-sm text-gray-600">
                            <FileText className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                            <span className="truncate">{lesson.title}</span>
                            {lesson.isPublished && (
                              <Badge className="ml-auto text-xs bg-emerald-50 text-emerald-600 flex-shrink-0">✓</Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
