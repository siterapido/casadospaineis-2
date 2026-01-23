'use client'

import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Clock, Users, PlayCircle, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'

export interface CourseCardProps {
  id: string
  title: string
  description: string
  imageUrl?: string
  price: number
  category: string
  progress?: number
  isPurchased?: boolean
  totalLessons?: number
  completedLessons?: number
}

export function CourseCard({
  title,
  description,
  imageUrl,
  price,
  category,
  progress = 0,
  isPurchased = false,
  totalLessons = 0,
  completedLessons = 0
}: CourseCardProps) {
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white border-gray-200">
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-emerald-100 to-emerald-200">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <PlayCircle className="w-16 h-16 text-emerald-600 opacity-50" />
          </div>
        )}
        <Badge className="absolute top-3 right-3 bg-emerald-600 hover:bg-emerald-700">
          {category}
        </Badge>
      </div>

      <CardContent className="p-6">
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">
          {title}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          {totalLessons > 0 && (
            <div className="flex items-center gap-1">
              <PlayCircle className="w-4 h-4" />
              <span>{totalLessons} aulas</span>
            </div>
          )}
          {isPurchased && completedLessons > 0 && (
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-600">{completedLessons} concluídas</span>
            </div>
          )}
        </div>

        {/* Progress Bar (for purchased courses) */}
        {isPurchased && progress > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">Progresso</span>
              <span className="font-semibold text-emerald-600">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </CardContent>

      <CardFooter className="p-6 pt-0 flex items-center justify-between border-t border-gray-100">
        <div>
          {isPurchased ? (
            <span className="text-sm font-semibold text-emerald-600">
              Já comprado
            </span>
          ) : price === 0 ? (
            <span className="text-sm font-semibold text-emerald-600">Gratuito</span>
          ) : (
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(price)}
            </span>
          )}
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
          {isPurchased ? 'Continuar' : 'Comprar'}
        </Button>
      </CardFooter>
    </Card>
  )
}
