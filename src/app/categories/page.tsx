'use client'

import { useEffect, useState } from 'react'
import { Sidebar } from '@/components/layout/sidebar'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { BookOpen, ArrowRight, Tag } from 'lucide-react'
import Link from 'next/link'

interface Category {
  id: string
  name: string
  description: string | null
  _count?: {
    courses: number
  }
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.ok ? res.json() : [])
      .then(data => setCategories(data))
      .catch(() => setCategories([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPage="home" />

      <main className="lg:ml-64">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Categorias</h1>
            <p className="text-gray-600">Explore os cursos por área de conhecimento.</p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-40 rounded-xl" />
              ))}
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-16">
              <Tag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Nenhuma categoria disponível</h2>
              <p className="text-gray-500">As categorias aparecerão aqui quando forem cadastradas.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map(category => (
                <Link key={category.id} href={`/courses?category=${category.id}`}>
                  <Card className="h-full hover:shadow-md transition-all border-2 hover:border-emerald-300 group cursor-pointer">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>

                      <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">
                        {category.name}
                      </h2>

                      {category.description && (
                        <p className="text-sm text-gray-600 flex-1 mb-4">{category.description}</p>
                      )}

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                        {category._count !== undefined ? (
                          <Badge variant="secondary" className="bg-emerald-50 text-emerald-700">
                            {category._count.courses} {category._count.courses === 1 ? 'curso' : 'cursos'}
                          </Badge>
                        ) : (
                          <span />
                        )}
                        <span className="text-emerald-600 group-hover:translate-x-1 transition-transform flex items-center gap-1 text-sm font-medium">
                          Ver cursos <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
