'use client'

import { Sidebar } from '@/components/layout/sidebar'
import { Card, CardContent } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQPage() {
  const faqs = [
    {
      question: "Como funcionam os cursos?",
      answer: "Nossos cursos são 100% online e você pode assistir no seu próprio ritmo. Cada curso é dividido em módulos (capítulos) e aulas. Ao comprar um curso, você tem acesso vitalício a todo o conteúdo."
    },
    {
      question: "Quanto tempo tenho acesso aos cursos?",
      answer: "Uma vez comprado, você tem acesso vitalício ao curso. Pode assistir quantas vezes quiser, sem limite de tempo."
    },
    {
      question: "Os cursos têm certificado?",
      answer: "Sim! Ao completar todas as aulas de um curso, você recebe um certificado digital que pode ser compartilhado no LinkedIn e adicionado ao seu currículo."
    },
    {
      question: "Posso pedir reembolso?",
      answer: "Sim, oferecemos garantia de 7 dias. Se você não estiver satisfeito com o curso, pode solicitar o reembolso integral neste período."
    },
    {
      question: "Preciso de experiência prévia?",
      answer: "Depende do curso. Temos cursos para todos os níveis, desde iniciantes até avançados. Cada página de curso informa o nível recomendado e os pré-requisitos."
    },
    {
      question: "Posso pagar em parcelas?",
      answer: "Sim, para a maioria dos cursos oferecemos parcelamento via cartão de crédito. As opções são exibidas na hora do checkout."
    },
    {
      question: "Preciso de algum software específico?",
      answer: "A maioria dos nossos cursos usa ferramentas gratuitas ou com versões gratuitas. Para cada curso, listamos todos os requisitos técnicos antes do início."
    },
    {
      question: "Tenho suporte durante o curso?",
      answer: "Sim! Você terá acesso a nossa comunidade de alunos e pode tirar dúvidas diretamente com os instrutores através do fórum do curso."
    },
    {
      question: "Posso assistir nos dispositivos móveis?",
      answer: "Sim! Nossa plataforma é 100% responsiva e funciona em computadores, tablets e smartphones. Você pode assistir a qualquer hora e em qualquer lugar."
    },
    {
      question: "Como faço para me inscrever?",
      answer: "Basta criar uma conta gratuita, escolher o curso desejado e realizar o pagamento. Após a confirmação, o curso estará disponível imediatamente no seu dashboard."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPage="home" />

      <main className="lg:ml-64">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Perguntas Frequentes
            </h1>
            <p className="text-xl text-gray-600">
              Tire suas dúvidas sobre a Casa dos Painéis e nossos cursos.
            </p>
          </div>

          {/* FAQ Accordion */}
          <Card>
            <CardContent className="p-8">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Contact CTA */}
          <Card className="mt-8 bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Não encontrou sua resposta?
              </h2>
              <p className="text-gray-700 mb-6">
                Entre em contato conosco e teremos prazer em ajudá-lo.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
              >
                Fale Conosco
              </a>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
