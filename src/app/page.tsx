'use client'

import { Sidebar } from '@/components/layout/sidebar'
import { CourseCard } from '@/components/course/course-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, CheckCircle2, BookOpen, Star, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  // Mock courses data - será substituído por dados do backend
  const featuredCourses = [
    {
      id: '1',
      title: 'Painéis Profissionais com Next.js',
      description: 'Aprenda a criar painéis administrativos modernos e responsivos usando Next.js, Tailwind CSS e Shadcn/UI.',
      imageUrl: undefined,
      price: 297,
      category: 'Frontend',
      isPurchased: false,
      totalLessons: 24,
      completedLessons: 0
    },
    {
      id: '2',
      title: 'Automação de Processos Empresariais',
      description: 'Dominando ferramentas de automação para otimizar fluxos de trabalho e aumentar a produtividade.',
      imageUrl: undefined,
      price: 397,
      category: 'Automação',
      isPurchased: true,
      progress: 45,
      totalLessons: 32,
      completedLessons: 14
    },
    {
      id: '3',
      title: 'Gestão Visual de Projetos com Kanban',
      description: 'Implemente painéis Kanban poderosos para gerenciar projetos com clareza e eficiência.',
      imageUrl: undefined,
      price: 197,
      category: 'Gestão',
      isPurchased: false,
      totalLessons: 18,
      completedLessons: 0
    }
  ]

  const stats = [
    { label: 'Cursos Disponíveis', value: '50+' },
    { label: 'Alunos Ativos', value: '2,500+' },
    { label: 'Horas de Conteúdo', value: '800+' },
    { label: 'Taxa de Satisfação', value: '98%' }
  ]

  const features = [
    'Acesso vitalício aos cursos',
    'Certificado de conclusão',
    'Suporte da comunidade',
    'Atualizações gratuitas',
    'Projetos práticos',
    'Mentoria em grupo'
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPage="home" />

      {/* Main Content */}
      <main className="lg:ml-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <section className="mb-16">
            <div className="text-center space-y-6 py-12">
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                🚀 Nova Plataforma LMS
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
                Casa dos Painéis
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Transforme sua carreira com cursos práticos sobre automação,
                gestão visual e desenvolvimento de painéis profissionais.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/courses">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white text-lg px-8">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Ver Todos os Cursos
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline" className="text-lg px-8">
                    Saiba Mais
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 text-center">
                  <p className="text-3xl font-bold text-emerald-600 mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Features Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Por que escolher a Casa dos Painéis?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Oferecemos uma experiência de aprendizado completa e prática.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg border border-gray-200">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Courses Section */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Cursos em Destaque
                </h2>
                <p className="text-gray-600">
                  Explore nossos cursos mais populares e comece a aprender hoje.
                </p>
              </div>
              <Button variant="outline" className="hidden sm:flex">
                Ver Todos
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCourses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Button variant="outline" className="w-full">
                Ver Todos
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-8 lg:p-12 text-white mb-16">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 className="text-3xl font-bold">
                Pronto para começar sua jornada?
              </h2>
              <p className="text-emerald-100 text-lg">
                Junte-se a milhares de alunos que estão transformando suas carreiras
                com a Casa dos Painéis.
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-emerald-700 hover:bg-gray-100 text-lg px-8"
              >
                Criar Conta Grátis
              </Button>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Casa dos Painéis</h3>
                <p className="text-sm text-gray-600">
                  Transforme sua carreira com cursos práticos sobre automação, gestão visual e desenvolvimento.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Cursos</h3>
                <ul className="space-y-2">
                  <li><Link href="/courses" className="text-sm text-gray-600 hover:text-emerald-600">Todos os Cursos</Link></li>
                  <li><Link href="/categories" className="text-sm text-gray-600 hover:text-emerald-600">Categorias</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Empresa</h3>
                <ul className="space-y-2">
                  <li><Link href="/about" className="text-sm text-gray-600 hover:text-emerald-600">Sobre Nós</Link></li>
                  <li><Link href="/faq" className="text-sm text-gray-600 hover:text-emerald-600">FAQ</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Suporte</h3>
                <ul className="space-y-2">
                  <li><Link href="/contact" className="text-sm text-gray-600 hover:text-emerald-600">Fale Conosco</Link></li>
                  <li><a href="/setup" className="text-sm text-gray-600 hover:text-emerald-600">Configurar Sistema</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
              <p>© 2025 Casa dos Painéis. Todos os direitos reservados.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
