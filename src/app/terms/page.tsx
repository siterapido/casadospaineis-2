import { Sidebar } from '@/components/layout/sidebar'
import { Card, CardContent } from '@/components/ui/card'
import { FileText } from 'lucide-react'

export const metadata = {
  title: 'Termos de Uso | Casa dos Painéis',
  description: 'Termos e condições de uso da plataforma Casa dos Painéis.',
}

const sections = [
  {
    title: '1. Aceitação dos Termos',
    content: 'Ao acessar e utilizar a plataforma Casa dos Painéis, você concorda com estes Termos de Uso. Se não concordar com qualquer parte destes termos, não utilize nossos serviços.',
  },
  {
    title: '2. Descrição dos Serviços',
    content: 'A Casa dos Painéis oferece uma plataforma de ensino online (LMS) voltada para cursos de energia solar fotovoltaica, automação e áreas correlatas. O acesso a determinados conteúdos pode requerer aquisição prévia.',
  },
  {
    title: '3. Cadastro e Conta',
    content: 'Para acessar cursos, é necessário criar uma conta fornecendo informações verídicas e atualizadas. Você é responsável por manter a confidencialidade de suas credenciais de acesso e por todas as atividades realizadas em sua conta.',
  },
  {
    title: '4. Pagamentos e Reembolsos',
    content: 'Os preços dos cursos são exibidos em reais (BRL). Reembolsos podem ser solicitados em até 7 dias após a compra, desde que menos de 20% do conteúdo do curso tenha sido consumido. Após esse prazo, não são elegíveis a reembolso.',
  },
  {
    title: '5. Propriedade Intelectual',
    content: 'Todo o conteúdo disponível na plataforma — incluindo vídeos, materiais de apoio, textos e imagens — é de propriedade exclusiva da Casa dos Painéis ou de seus parceiros licenciados. É proibida a reprodução, distribuição ou comercialização sem autorização prévia por escrito.',
  },
  {
    title: '6. Conduta do Usuário',
    content: 'O usuário compromete-se a não compartilhar acesso à conta, não distribuir materiais protegidos por direitos autorais, não utilizar a plataforma para fins ilegais ou que prejudiquem outros usuários ou a integridade do sistema.',
  },
  {
    title: '7. Modificações dos Termos',
    content: 'Reservamo-nos o direito de modificar estes termos a qualquer momento. Alterações significativas serão comunicadas por email ou notificação na plataforma. O uso continuado após as modificações implica aceitação dos novos termos.',
  },
  {
    title: '8. Limitação de Responsabilidade',
    content: 'A Casa dos Painéis não se responsabiliza por danos indiretos, incidentais ou consequenciais decorrentes do uso ou impossibilidade de uso da plataforma. Nossa responsabilidade é limitada ao valor pago pelos serviços.',
  },
  {
    title: '9. Contato',
    content: 'Em caso de dúvidas sobre estes termos, entre em contato pelo email contato@casadospaineis.com.br ou acesse a página de contato.',
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPage="home" />

      <main className="lg:ml-64">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
              <FileText className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Termos de Uso</h1>
              <p className="text-gray-600 text-sm mt-1">Última atualização: Janeiro de 2026</p>
            </div>
          </div>

          <Card className="mb-6 bg-amber-50 border-amber-200">
            <CardContent className="p-5">
              <p className="text-sm text-amber-800">
                Por favor, leia atentamente estes Termos de Uso antes de utilizar a plataforma Casa dos Painéis.
                O uso da plataforma constitui aceitação integral destes termos.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {sections.map((section, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-3">{section.title}</h2>
                  <p className="text-gray-700 leading-relaxed">{section.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
