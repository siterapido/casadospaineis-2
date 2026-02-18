'use client'

import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Settings, Globe, Database, Shield, Zap } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export default function AdminSettingsPage() {
  const [seeding, setSeeding] = useState(false)

  const handleSeed = async () => {
    if (!confirm('Isso irá popular o banco com dados de exemplo. Continuar?')) return
    setSeeding(true)
    try {
      const res = await fetch('/api/seed', { method: 'POST' })
      if (res.ok) {
        toast.success('Banco populado com dados de exemplo!')
      } else {
        toast.error('Erro ao popular banco de dados.')
      }
    } catch {
      toast.error('Erro de conexão.')
    } finally {
      setSeeding(false)
    }
  }

  const platformInfo = [
    { label: 'Nome da Plataforma', value: 'Casa dos Painéis' },
    { label: 'Versão', value: 'v1.0.0' },
    { label: 'Framework', value: 'Next.js 15 (App Router)' },
    { label: 'Banco de Dados', value: 'PostgreSQL (Neon)' },
    { label: 'Autenticação', value: 'Clerk' },
    { label: 'Hospedagem', value: 'Vercel' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar currentPage="settings" />

      <main className="lg:ml-64">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Configurações</h1>
            <p className="text-gray-600">Informações e configurações do sistema.</p>
          </div>

          <div className="space-y-6">
            {/* Platform Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Globe className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">Informações da Plataforma</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {platformInfo.map(item => (
                    <div key={item.label} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <span className="text-sm text-gray-600">{item.label}</span>
                      <span className="text-sm font-medium text-gray-900">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Environment */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">Status dos Serviços</h2>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'Banco de Dados (Neon PostgreSQL)', status: 'operational' },
                    { name: 'Autenticação (Clerk)', status: 'operational' },
                    { name: 'Hospedagem (Vercel)', status: 'operational' },
                  ].map(service => (
                    <div key={service.name} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <span className="text-sm text-gray-700">{service.name}</span>
                      <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                        Operacional
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Database Actions */}
            <Card className="border-amber-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Database className="w-5 h-5 text-amber-600" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">Banco de Dados</h2>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-5">
                  <p className="text-sm text-amber-800">
                    <strong>Atenção:</strong> As ações abaixo afetam diretamente o banco de dados de produção.
                    Use com cautela.
                  </p>
                </div>

                <div className="flex items-center justify-between py-3 border border-gray-200 rounded-lg px-4">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Popular dados de exemplo</p>
                    <p className="text-xs text-gray-500 mt-0.5">Insere cursos, categorias e aulas de demonstração</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSeed}
                    disabled={seeding}
                    className="gap-2"
                  >
                    <Zap className="w-4 h-4" />
                    {seeding ? 'Aguarde...' : 'Seed'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* About */}
            <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
              <CardContent className="p-6 text-center">
                <Settings className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Casa dos Painéis LMS</h3>
                <p className="text-sm text-gray-600">
                  Plataforma de ensino online especializada em energia solar fotovoltaica.
                </p>
                <p className="text-xs text-gray-500 mt-3">
                  © 2026 Casa dos Painéis. Todos os direitos reservados.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
