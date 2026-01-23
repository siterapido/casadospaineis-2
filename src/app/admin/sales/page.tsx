'use client'

import { useEffect, useState } from 'react'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  DollarSign,
  TrendingUp,
  ShoppingBag,
  Users
} from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

interface Sale {
  id: string
  createdAt: string
  course: {
    id: string
    title: string
    price: number
  }
  user: {
    id: string
    email: string
    name: string | null
  }
}

export default function AdminSalesPage() {
  const [sales, setSales] = useState<Sale[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSales()
  }, [])

  const fetchSales = async () => {
    try {
      const res = await fetch('/api/admin/sales')
      if (res.ok) {
        const data = await res.json()
        setSales(data)
      }
    } catch (error) {
      console.error('Error fetching sales:', error)
    } finally {
      setLoading(false)
    }
  }

  const totalRevenue = sales.reduce((acc, sale) => acc + sale.course.price, 0)
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar currentPage="purchases" />

      <main className="lg:ml-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Relatório de Vendas
            </h1>
            <p className="text-gray-600">
              Acompanhe as vendas e receitas da plataforma.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Receita Total</p>
                    <p className="text-2xl font-bold text-emerald-600">
                      {loading ? <Skeleton className="h-8 w-24" /> : formatPrice(totalRevenue)}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-100">
                    <DollarSign className="w-6 h-6 text-emerald-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total de Vendas</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {loading ? <Skeleton className="h-8 w-16" /> : sales.length}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-100">
                    <ShoppingBag className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Ticket Médio</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {loading ? (
                        <Skeleton className="h-8 w-16" />
                      ) : sales.length > 0
                        ? formatPrice(totalRevenue / sales.length)
                        : formatPrice(0)}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-purple-100">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Compradores</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {loading ? (
                        <Skeleton className="h-8 w-16" />
                      ) : new Set(sales.map(s => s.user.id)).size}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-orange-100">
                    <Users className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sales Table */}
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Vendas</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Skeleton key={i} className="h-20 rounded-xl" />
                  ))}
                </div>
              ) : sales.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Nenhuma venda registrada
                  </h3>
                  <p className="text-gray-600">
                    As vendas aparecerão aqui quando os alunos comprarem cursos.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm text-gray-600 border-b">
                        <th className="pb-3 font-medium">Data</th>
                        <th className="pb-3 font-medium">Aluno</th>
                        <th className="pb-3 font-medium">Curso</th>
                        <th className="pb-3 font-medium text-right">Valor</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sales.map((sale) => (
                        <tr key={sale.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4">
                            <p className="text-sm text-gray-600">
                              {new Date(sale.createdAt).toLocaleDateString('pt-BR')}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(sale.createdAt).toLocaleTimeString('pt-BR')}
                            </p>
                          </td>
                          <td className="py-4">
                            <p className="font-medium text-gray-900">
                              {sale.user.name || 'Sem nome'}
                            </p>
                            <p className="text-sm text-gray-600">
                              {sale.user.email}
                            </p>
                          </td>
                          <td className="py-4">
                            <p className="text-gray-900">{sale.course.title}</p>
                          </td>
                          <td className="py-4 text-right">
                            <p className="font-semibold text-emerald-600">
                              {formatPrice(sale.course.price)}
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
