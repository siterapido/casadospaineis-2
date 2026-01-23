'use client'

import { useEffect, useState } from 'react'
import { Sidebar } from '@/components/layout/sidebar'
import { CourseCard } from '@/components/course/course-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, SlidersHorizontal, ArrowRight } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

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
  totalLessons: number
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    filterCourses()
  }, [courses, searchQuery, selectedCategory])

  const fetchData = async () => {
    try {
      // Fetch courses
      const coursesRes = await fetch('/api/courses')
      if (coursesRes.ok) {
        const coursesData = await coursesRes.json()
        setCourses(coursesData)
      }

      // Fetch categories
      const categoriesRes = await fetch('/api/categories')
      if (categoriesRes.ok) {
        const categoriesData = await categoriesRes.json()
        setCategories(categoriesData)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterCourses = () => {
    let filtered = courses

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(course => course.category.name === selectedCategory)
    }

    setFilteredCourses(filtered)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPage="courses" />

      {/* Main Content */}
      <main className="lg:ml-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Todos os Cursos
            </h1>
            <p className="text-gray-600">
              Explore nossa catálogo completo de cursos e encontre o ideal para você.
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
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
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2 items-center">
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                  className={selectedCategory === null ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                >
                  Todos
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.name ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.name)}
                    className={selectedCategory === category.name ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                  >
                    {category.name}
                    {category._count?.courses > 0 && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {category._count.courses}
                      </Badge>
                    )}
                  </Button>
                ))}
              </div>
            </div>

            {/* Results count */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                {loading ? (
                  <Skeleton className="h-4 w-32" />
                ) : (
                  <>
                    Mostrando <span className="font-semibold text-gray-900">{filteredCourses.length}</span> de{' '}
                    <span className="font-semibold text-gray-900">{courses.length}</span> cursos
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Courses Grid */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
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
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Nenhum curso encontrado
              </h3>
              <p className="text-gray-600 mb-4">
                Tente ajustar os filtros ou a busca para encontrar o que você procura.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory(null)
                }}
              >
                Limpar Filtros
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  id={course.id}
                  title={course.title}
                  description={course.description || ''}
                  imageUrl={course.imageUrl || undefined}
                  price={course.price}
                  category={course.category.name}
                  isPurchased={false}
                  totalLessons={course.totalLessons}
                  completedLessons={0}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
