'use client'

import { useEffect, useState } from 'react'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Users, BookOpen, TrendingUp } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

interface Student {
  id: string
  email: string
  name: string | null
  _count: {
    purchases: number
  }
  createdAt: string
}

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      const res = await fetch('/api/admin/students')
      if (res.ok) {
        const data = await res.json()
        setStudents(data)
      }
    } catch (error) {
      console.error('Error fetching students:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredStudents = students.filter(student =>
    student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.name?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar currentPage="students" />

      <main className="lg:ml-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Gestão de Alunos
            </h1>
            <p className="text-gray-600">
              Visualize e gerencie todos os alunos da plataforma.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total de Alunos</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {loading ? <Skeleton className="h-8 w-16" /> : students.length}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-100">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Cursos Comprados</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {loading ? (
                        <Skeleton className="h-8 w-16" />
                      ) : students.reduce((acc, s) => acc + s._count.purchases, 0)}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-100">
                    <BookOpen className="w-6 h-6 text-emerald-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Média por Aluno</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {loading ? (
                        <Skeleton className="h-8 w-16" />
                      ) : students.length > 0
                        ? (students.reduce((acc, s) => acc + s._count.purchases, 0) / students.length).toFixed(1)
                        : '0'}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-purple-100">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Buscar alunos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Students List */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map(i => (
                <Skeleton key={i} className="h-24 rounded-xl" />
              ))}
            </div>
          ) : filteredStudents.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {searchQuery ? 'Nenhum aluno encontrado' : 'Nenhum aluno cadastrado'}
                </h3>
                <p className="text-gray-600">
                  {searchQuery
                    ? 'Tente ajustar a busca para encontrar o aluno.'
                    : 'Os alunos aparecerão aqui quando se cadastrarem na plataforma.'}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredStudents.map((student) => (
                <Card key={student.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-semibold text-emerald-600">
                          {student.name?.charAt(0) || student.email.charAt(0)}
                        </span>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900">
                          {student.name || 'Sem nome'}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {student.email}
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-6 text-sm">
                        <div className="text-right">
                          <p className="text-gray-600">Cursos</p>
                          <p className="font-semibold text-gray-900">
                            {student._count.purchases}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-600">Desde</p>
                          <p className="font-semibold text-gray-900">
                            {new Date(student.createdAt).toLocaleDateString('pt-BR')}
                          </p>
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
