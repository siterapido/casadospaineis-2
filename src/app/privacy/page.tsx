import { Sidebar } from '@/components/layout/sidebar'
import { Card, CardContent } from '@/components/ui/card'
import { Shield } from 'lucide-react'

export const metadata = {
  title: 'Política de Privacidade | Casa dos Painéis',
  description: 'Saiba como coletamos, usamos e protegemos seus dados pessoais.',
}

const sections = [
  {
    title: '1. Informações que Coletamos',
    content: 'Coletamos informações que você nos fornece diretamente, como nome, email e dados de pagamento durante o cadastro e compra de cursos. Também coletamos automaticamente dados de uso, como páginas visitadas, progresso nos cursos e endereço IP.',
  },
  {
    title: '2. Como Utilizamos suas Informações',
    content: 'Utilizamos seus dados para: fornecer e melhorar nossos serviços; processar pagamentos; enviar comunicações relevantes sobre cursos e atualizações; personalizar sua experiência de aprendizado; e cumprir obrigações legais.',
  },
  {
    title: '3. Compartilhamento de Dados',
    content: 'Não vendemos ou alugamos seus dados pessoais a terceiros. Podemos compartilhar informações com prestadores de serviços (processadores de pagamento, provedores de hospedagem) estritamente para operar nossa plataforma, sempre sob acordos de confidencialidade.',
  },
  {
    title: '4. Segurança dos Dados',
    content: 'Adotamos medidas técnicas e organizacionais para proteger seus dados contra acesso não autorizado, alteração, divulgação ou destruição. Utilizamos criptografia HTTPS e práticas seguras de armazenamento.',
  },
  {
    title: '5. Cookies e Tecnologias Similares',
    content: 'Utilizamos cookies para manter sua sessão autenticada, analisar o uso da plataforma e melhorar a experiência. Você pode gerenciar cookies nas configurações do seu navegador, mas isso pode afetar o funcionamento de algumas funcionalidades.',
  },
  {
    title: '6. Seus Direitos (LGPD)',
    content: 'Conforme a Lei Geral de Proteção de Dados (Lei 13.709/2018), você tem direito a: acessar seus dados; corrigir informações incorretas; solicitar a exclusão de dados desnecessários; portabilidade dos dados; e revogar consentimentos.',
  },
  {
    title: '7. Retenção de Dados',
    content: 'Mantemos seus dados pelo tempo necessário para prestação dos serviços ou cumprimento de obrigações legais. Após o encerramento da conta, dados pessoais são excluídos em até 90 dias, exceto quando a lei exigir retenção por período maior.',
  },
  {
    title: '8. Menores de Idade',
    content: 'Nossos serviços são destinados a maiores de 18 anos. Não coletamos intencionalmente dados de menores. Se identificarmos dados de menores coletados indevidamente, procederemos com sua exclusão imediata.',
  },
  {
    title: '9. Alterações nesta Política',
    content: 'Podemos atualizar esta política periodicamente. Notificaremos sobre mudanças significativas por email. A data da última atualização estará sempre indicada no topo desta página.',
  },
  {
    title: '10. Contato — Encarregado de Dados (DPO)',
    content: 'Para exercer seus direitos ou tirar dúvidas sobre esta política, entre em contato pelo email: privacidade@casadospaineis.com.br',
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPage="home" />

      <main className="lg:ml-64">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Política de Privacidade</h1>
              <p className="text-gray-600 text-sm mt-1">Última atualização: Janeiro de 2026</p>
            </div>
          </div>

          <Card className="mb-6 bg-blue-50 border-blue-200">
            <CardContent className="p-5">
              <p className="text-sm text-blue-800">
                Esta Política de Privacidade descreve como a Casa dos Painéis coleta, utiliza e protege
                suas informações pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD).
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
