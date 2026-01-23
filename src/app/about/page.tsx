'use client'

import { Sidebar } from '@/components/layout/sidebar'
import { Card, CardContent } from '@/components/ui/card'
import { BookOpen, Users, Trophy, Target } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPage="home" />

      <main className="lg:ml-64">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Sobre a Casa dos Painéis
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Nossa missão é transformar carreiras através de educação de qualidade e acessível.
            </p>
          </div>

          {/* Mission */}
          <Card className="mb-8 bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
            <CardContent className="p-8 text-center">
              <Target className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Nossa Missão
              </h2>
              <p className="text-gray-700 text-lg">
                Democratizar o acesso a educação de alta qualidade em tecnologia, permitindo que pessoas de todo o Brasil
                desenvolvam habilidades práticas e construam carreiras de sucesso na área de desenvolvimento e automação.
              </p>
            </CardContent>
          </Card>

          {/* Values */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Nossos Valores
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Excelência</h3>
                  <p className="text-sm text-gray-600">
                    Conteúdo de alta qualidade desenvolvido por profissionais experientes.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Comunidade</h3>
                  <p className="text-sm text-gray-600">
                    Rede de apoio e colaboração entre estudantes e instrutores.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Resultado</h3>
                  <p className="text-sm text-gray-600">
                    Foco em resultados práticos e aplicáveis no mercado de trabalho.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Story */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Nossa História
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  A Casa dos Painéis nasceu da necessidade de cursos práticos e focados no mercado brasileiro de tecnologia.
                  Nossa fundadora, depois de anos de experiência desenvolvendo sistemas complexos, percebeu que a educação
                  tradicional muitas vezes deixava lacunas importantes entre teoria e prática.
                </p>
                <p>
                  Em 2025, decidimos criar uma plataforma onde estudantes pudessem aprender fazendo, com projetos reais
                  e ferramentas modernas utilizadas pelas melhores empresas do mercado.
                </p>
                <p>
                  Hoje, somos uma comunidade em crescimento, com milhares de alunos que já transformaram suas carreiras
                  através dos nossos cursos em desenvolvimento web, automação, e gestão visual.
                </p>
                <p>
                  Continuamos investindo em conteúdo novo e tecnologia de ponta para oferecer a melhor experiência de
                  aprendizado possível.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
