'use client'

import { useEffect, useState, Suspense } from 'react'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, Save, Upload, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

function CourseFormContent() {
  const searchParams = useSearchParams()
  const courseId = searchParams.get('id')
  const isEditing = !!courseId

  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [categories, setCategories] = useState<any[]>([])
  const [imageUrl, setImageUrl] = useState<string>('')
  const [uploading, setUploading] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    categoryId: '',
    isPublished: false
  })

  useEffect(() => {
    fetchCategories()
    if (isEditing && courseId) {
      fetchCourse()
    }
  }, [courseId])

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories')
      if (res.ok) {
        const data = await res.json()
        setCategories(data)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const fetchCourse = async () => {
    if (!courseId) return

    try {
      setFetching(true)
      const res = await fetch(`/api/admin/courses/${courseId}`)
      if (res.ok) {
        const data = await res.json()
        setFormData({
          title: data.title,
          description: data.description || '',
          price: data.price,
          categoryId: data.categoryId,
          isPublished: data.isPublished
        })
        setImageUrl(data.imageUrl || '')
      }
    } catch (error) {
      console.error('Error fetching course:', error)
      toast.error('Erro ao carregar curso')
    } finally {
      setFetching(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.categoryId) {
      toast.error('Preencha todos os campos obrigatórios')
      return
    }

    setLoading(true)
    try {
      const url = isEditing
        ? `/api/admin/courses/${courseId}`
        : '/api/admin/courses'

      const res = await fetch(url, {
        method: isEditing ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          imageUrl: imageUrl || null
        })
      })

      if (res.ok) {
        toast.success(isEditing ? 'Curso atualizado com sucesso!' : 'Curso criado com sucesso!')
        window.location.href = '/admin/courses'
      } else {
        const data = await res.json()
        toast.error(data.error || 'Erro ao salvar curso')
      }
    } catch (error) {
      console.error('Error saving course:', error)
      toast.error('Erro ao salvar curso')
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validar tamanho (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('A imagem deve ter no máximo 5MB')
      return
    }

    // Validar tipo
    if (!file.type.startsWith('image/')) {
      toast.error('O arquivo deve ser uma imagem')
      return
    }

    setUploading(true)
    try {
      // Convert to base64 for now (idealmente usar serviço de upload)
      const reader = new FileReader()
      reader.onload = async (event) => {
        const base64 = event.target?.result as string
        setImageUrl(base64)
        toast.success('Imagem carregada com sucesso!')
        setUploading(false)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('Error uploading image:', error)
      toast.error('Erro ao carregar imagem')
      setUploading(false)
    }
  }

  if (fetching) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 mb-4">
            <Upload className="w-6 h-6 text-emerald-600 animate-spin" />
          </div>
          <p className="text-gray-600">Carregando curso...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar currentPage="courses" />

      <main className="lg:ml-64">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <Link href="/admin/courses">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isEditing ? 'Editar Curso' : 'Novo Curso'}
            </h1>
            <p className="text-gray-600">
              {isEditing ? 'Atualize as informações do curso.' : 'Preencha as informações para criar um novo curso.'}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Imagem */}
              <Card>
                <CardHeader>
                  <CardTitle>Imagem do Curso</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {imageUrl ? (
                      <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={imageUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => setImageUrl('')}
                        >
                          Remover
                        </Button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-emerald-400 transition-colors">
                        <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-sm text-gray-600 mb-4">
                          Arraste uma imagem ou clique para selecionar
                        </p>
                        <input
                          type="file"
                          id="image-upload"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={uploading}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById('image-upload')?.click()}
                          disabled={uploading}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          {uploading ? 'Carregando...' : 'Selecionar Imagem'}
                        </Button>
                      </div>
                    )}
                    <p className="text-xs text-gray-500">
                      Formatos aceitos: JPG, PNG, GIF. Tamanho máximo: 5MB.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Informações Básicas */}
              <Card>
                <CardHeader>
                  <CardTitle>Informações Básicas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Título *</Label>
                    <Input
                      id="title"
                      placeholder="Ex: Desenvolvimento Web com Next.js"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      placeholder="Descreva o que os alunos vão aprender neste curso..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={6}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Preço (R$)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        value={formData.price || ''}
                        onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="category">Categoria *</Label>
                      <Select
                        value={formData.categoryId}
                        onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Publicação */}
              <Card>
                <CardHeader>
                  <CardTitle>Status de Publicação</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">Publicar Curso</p>
                      <p className="text-sm text-gray-600">
                        Quando publicado, o curso ficará visível para todos os alunos.
                      </p>
                    </div>
                    <Switch
                      checked={formData.isPublished}
                      onCheckedChange={(checked) => setFormData({ ...formData, isPublished: checked })}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                  disabled={loading}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? 'Salvando...' : isEditing ? 'Atualizar Curso' : 'Criar Curso'}
                </Button>
                <Link href="/admin/courses" className="flex-1">
                  <Button type="button" variant="outline" className="w-full">
                    Cancelar
                  </Button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export default function CourseFormPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 mb-4">
            <Upload className="w-6 h-6 text-emerald-600 animate-spin" />
          </div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    }>
      <CourseFormContent />
    </Suspense>
  )
}
