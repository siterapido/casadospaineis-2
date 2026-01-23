'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Loader2, Database, Zap } from 'lucide-react'

export function SetupWizard() {
  const [isSetupRunning, setIsSetupRunning] = useState(false)
  const [setupComplete, setSetupComplete] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const runSetup = async () => {
    setIsSetupRunning(true)
    setError(null)

    try {
      // Call the seed API
      const response = await fetch('/api/seed', {
        method: 'POST'
      })

      if (!response.ok) {
        throw new Error('Failed to setup database')
      }

      const data = await response.json()

      // Create test user
      await fetch('/api/users/test', {
        method: 'POST'
      })

      setSetupComplete(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsSetupRunning(false)
    }
  }

  const setupSteps = [
    'Criando tabelas do banco de dados',
    'Populando categorias de cursos',
    'Criando cursos de exemplo',
    'Adicionando capítulos e aulas',
    'Criando usuário de teste',
    'Configurando dados de exemplo'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-600 text-white mb-4">
            <Database className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Configuração Inicial - Casa dos Painéis
          </h1>
          <p className="text-gray-600">
            Configure o banco de dados e crie dados de exemplo para começar a usar a plataforma.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-emerald-600" />
              Assistente de Configuração
            </CardTitle>
            <CardDescription>
              Este assistente irá configurar o banco de dados e criar dados de exemplo.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!setupComplete && !isSetupRunning && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  Ao clicar em "Iniciar Configuração", o sistema irá:
                </p>
                <ul className="mt-2 space-y-1 text-sm text-blue-700">
                  {setupSteps.map((step, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {isSetupRunning && (
              <div className="space-y-4">
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-12 h-12 text-emerald-600 animate-spin" />
                </div>
                <p className="text-center text-gray-600">
                  Configurando o banco de dados. Aguarde...
                </p>
                <div className="space-y-2">
                  {setupSteps.map((step, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {setupComplete && (
              <div className="space-y-4">
                <div className="flex items-center justify-center py-8">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <p className="text-lg font-semibold text-gray-900">
                    Configuração concluída com sucesso!
                  </p>
                  <p className="text-gray-600">
                    O banco de dados foi configurado e os dados de exemplo foram criados.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary">3 Cursos</Badge>
                  <Badge variant="secondary">3 Categorias</Badge>
                  <Badge variant="secondary">3 Capítulos</Badge>
                  <Badge variant="secondary">7 Aulas</Badge>
                  <Badge variant="secondary">1 Usuário de Teste</Badge>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-800 font-medium">
                  Erro ao configurar o banco de dados
                </p>
                <p className="text-sm text-red-600 mt-1">{error}</p>
              </div>
            )}

            <div className="flex gap-3">
              {!setupComplete && !isSetupRunning && (
                <Button
                  onClick={runSetup}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                  size="lg"
                >
                  <Database className="w-5 h-5 mr-2" />
                  Iniciar Configuração
                </Button>
              )}

              {setupComplete && (
                <Button
                  onClick={() => window.location.href = '/'}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                  size="lg"
                >
                  Ir para a Plataforma
                </Button>
              )}

              {error && (
                <Button
                  onClick={runSetup}
                  variant="outline"
                  className="flex-1"
                  size="lg"
                >
                  Tentar Novamente
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
