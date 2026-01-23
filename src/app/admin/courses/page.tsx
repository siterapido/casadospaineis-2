'use client'

import { useEffect, useState } from 'react'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  BookOpen,
  Users,
  DollarSign
} from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'
import Link from 'next/link'

interface Course {
  id: string
  title: string
  description: string
  imageUrl: string | null
  price: number
  isPublished: boolean
  category: {
    id: string
    name: string
  }
  _count: {
    chapters: number
    purchases: number
  }
  createdAt: string
}

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const res = await fetch('/api/admin/courses')
      if (res.ok) {
        const data = await res.json()
        setCourses(data)
      }
    } catch (error) {
      console.error('Error fetching courses:', error)
      toast.error('Erro ao carregar cursos')
    } finally {
      setLoading(false)
    }
  }

  const handlePublish = async (courseId: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/admin/courses/${courseId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !currentStatus })
      })

      if (res.ok) {
        toast.success(currentStatus ? 'Curso despublicado' : 'Curso publicado com sucesso!')
        fetchCourses()
      } else {
        toast.error('Erro ao atualizar status do curso')
      }
    } catch (error) {
      console.error('Error publishing course:', error)
      toast.error('Erro ao atualizar status do curso')
    }
  }

  const handleDelete = async (courseId: string) => {
    if (!confirm('Tem certeza que deseja excluir este curso? Esta ação não pode ser desfeita.')) {
      return
    }

    try {
      const res = await fetch(`/api/admin/courses/${courseId}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        toast.success('Curso excluído com sucesso!')
        fetchCourses()
      } else {
        toast.error('Erro ao excluir curso')
      }
    } catch (error) {
      console.error('Error deleting course:', error)
      toast.error('Erro ao excluir curso')
    }
  }

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar currentPage="courses" />

      <main className="lg:ml-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Gerenciar Cursos
              </h1>
              <p className="text-gray-600">
                Crie, edite e gerencie todos os cursos da plataforma.
              </p>
            </div>
            <Link href="/admin/courses/new">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Novo Curso
              </Button>
            </Link>
          </div>

          {/* Filters */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Buscar cursos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Courses List */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map(i => (
                <Skeleton key={i} className="h-32 rounded-xl" />
              ))}
            </div>
          ) : filteredCourses.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {searchQuery ? 'Nenhum curso encontrado' : 'Nenhum curso criado'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchQuery
                    ? 'Tente ajustar a busca para encontrar o curso.'
                    : 'Comece criando seu primeiro curso.'}
                </p>
                {!searchQuery && (
                  <Link href="/admin/courses/new">
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Criar Primeiro Curso
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-6">
                      {/* Thumbnail */}
                      <div className="w-32 h-24 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-10 h-10 text-emerald-600" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-900 text-lg mb-1">
                              {course.title}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-1">
                              {course.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={course.isPublished ? "default" : "secondary"}>
                              {course.isPublished ? 'Publicado' : 'Rascunho'}
                            </Badge>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="w-5 h-5" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                  <Link href={`/courses/${course.id}`}>
                                    <Eye className="w-4 h-4 mr-2" />
                                    Visualizar
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link href={`/admin/courses/${course.id}`}>
                                    <Pencil className="w-4 h-4 mr-2" />
                                    Editar
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handlePublish(course.id, course.isPublished)}
                                >
                                  {course.isPublished ? 'Despublicar' : 'Publicar'}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDelete(course.id)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Excluir
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <DollarSign className="w-4 h-4" />
                            <span className="font-semibold text-gray-900">
                              {formatPrice(course.price)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Users className="w-4 h-4" />
                            <span>{course._count.purchases} alunos</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <BookOpen className="w-4 h-4" />
                            <span>{course._count.chapters} capítulos</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Badge variant="outline" className="text-xs">
                              {course.category.name}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
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
