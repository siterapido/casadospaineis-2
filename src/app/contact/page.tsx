'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/layout/sidebar'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate sending (no backend yet)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPage="home" />

      <main className="lg:ml-64">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Fale Conosco
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tem alguma dúvida ou sugestão? Estamos aqui para ajudar.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                      <p className="text-sm text-gray-600">contato@casadospaineis.com.br</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Telefone / WhatsApp</h3>
                      <p className="text-sm text-gray-600">(11) 99999-9999</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Localização</h3>
                      <p className="text-sm text-gray-600">Brasil</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Horário de Atendimento</h3>
                  <p className="text-sm text-gray-600">Segunda a Sexta</p>
                  <p className="text-sm font-medium text-emerald-700">08:00 – 18:00</p>
                </CardContent>
              </Card>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-8">
                  {submitted ? (
                    <div className="text-center py-8">
                      <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Mensagem Enviada!</h2>
                      <p className="text-gray-600 mb-6">
                        Obrigado pelo contato. Retornaremos em breve.
                      </p>
                      <Button
                        onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }) }}
                        variant="outline"
                      >
                        Enviar outra mensagem
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
                          <Input
                            required
                            value={formData.name}
                            onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Seu nome"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                          <Input
                            required
                            type="email"
                            value={formData.email}
                            onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="seu@email.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Assunto *</label>
                        <Input
                          required
                          value={formData.subject}
                          onChange={e => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                          placeholder="Qual é o assunto?"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mensagem *</label>
                        <textarea
                          required
                          rows={6}
                          value={formData.message}
                          onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                          placeholder="Descreva sua dúvida ou sugestão..."
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
                      >
                        {loading ? (
                          'Enviando...'
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Enviar Mensagem
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
