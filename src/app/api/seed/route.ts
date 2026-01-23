import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST() {
  try {
    // Create categories
    const frontendCategory = await db.category.upsert({
      where: { name: 'Frontend' },
      update: {},
      create: {
        name: 'Frontend',
        description: 'Cursos de desenvolvimento front-end moderno'
      }
    })

    const automationCategory = await db.category.upsert({
      where: { name: 'Automação' },
      update: {},
      create: {
        name: 'Automação',
        description: 'Cursos sobre automação de processos'
      }
    })

    const gestaoCategory = await db.category.upsert({
      where: { name: 'Gestão' },
      update: {},
      create: {
        name: 'Gestão',
        description: 'Cursos de gestão de projetos e visual'
      }
    })

    // Create courses
    const course1 = await db.course.upsert({
      where: { id: 'course-1' },
      update: {},
      create: {
        id: 'course-1',
        title: 'Painéis Profissionais com Next.js',
        description: 'Aprenda a criar painéis administrativos modernos e responsivos usando Next.js, Tailwind CSS e Shadcn/UI.',
        price: 297,
        categoryId: frontendCategory.id,
        isPublished: true
      }
    })

    const course2 = await db.course.upsert({
      where: { id: 'course-2' },
      update: {},
      create: {
        id: 'course-2',
        title: 'Automação de Processos Empresariais',
        description: 'Dominando ferramentas de automação para otimizar fluxos de trabalho e aumentar a produtividade.',
        price: 397,
        categoryId: automationCategory.id,
        isPublished: true
      }
    })

    const course3 = await db.course.upsert({
      where: { id: 'course-3' },
      update: {},
      create: {
        id: 'course-3',
        title: 'Gestão Visual de Projetos com Kanban',
        description: 'Implemente painéis Kanban poderosos para gerenciar projetos com clareza e eficiência.',
        price: 197,
        categoryId: gestaoCategory.id,
        isPublished: true
      }
    })

    // Create chapters and lessons for course 1
    const chapter1 = await db.chapter.upsert({
      where: { id: 'chapter-1-1' },
      update: {},
      create: {
        id: 'chapter-1-1',
        title: 'Introdução ao Next.js',
        position: 1,
        courseId: course1.id,
        isPublished: true
      }
    })

    await db.lesson.createMany({
      data: [
        {
          title: 'Configurando o ambiente de desenvolvimento',
          videoUrl: 'https://www.youtube.com/embed/watch?v=example1',
          position: 1,
          isFreePreview: true,
          isPublished: true,
          chapterId: chapter1.id
        },
        {
          title: 'Estrutura do projeto Next.js',
          videoUrl: 'https://www.youtube.com/embed/watch?v=example2',
          position: 2,
          isFreePreview: false,
          isPublished: true,
          chapterId: chapter1.id
        },
        {
          title: 'Rotas e componentes básicos',
          videoUrl: 'https://www.youtube.com/embed/watch?v=example3',
          position: 3,
          isFreePreview: false,
          isPublished: true,
          chapterId: chapter1.id
        }
      ]
    })

    const chapter2 = await db.chapter.upsert({
      where: { id: 'chapter-1-2' },
      update: {},
      create: {
        id: 'chapter-1-2',
        title: 'Tailwind CSS e Shadcn/UI',
        position: 2,
        courseId: course1.id,
        isPublished: true
      }
    })

    await db.lesson.createMany({
      data: [
        {
          title: 'Configurando Tailwind CSS',
          videoUrl: 'https://www.youtube.com/embed/watch?v=example4',
          position: 1,
          isFreePreview: false,
          isPublished: true,
          chapterId: chapter2.id
        },
        {
          title: 'Introdução ao Shadcn/UI',
          videoUrl: 'https://www.youtube.com/embed/watch?v=example5',
          position: 2,
          isFreePreview: false,
          isPublished: true,
          chapterId: chapter2.id
        }
      ]
    })

    // Create chapters for course 2
    const chapter3 = await db.chapter.upsert({
      where: { id: 'chapter-2-1' },
      update: {},
      create: {
        id: 'chapter-2-1',
        title: 'Fundamentos de Automação',
        position: 1,
        courseId: course2.id,
        isPublished: true
      }
    })

    await db.lesson.createMany({
      data: [
        {
          title: 'O que é automação de processos?',
          videoUrl: 'https://www.youtube.com/embed/watch?v=example6',
          position: 1,
          isFreePreview: true,
          isPublished: true,
          chapterId: chapter3.id
        },
        {
          title: 'Identificando oportunidades de automação',
          videoUrl: 'https://www.youtube.com/embed/watch?v=example7',
          position: 2,
          isFreePreview: false,
          isPublished: true,
          chapterId: chapter3.id
        }
      ]
    })

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
      created: {
        categories: 3,
        courses: 3,
        chapters: 3,
        lessons: 7
      }
    })
  } catch (error) {
    console.error('Error seeding database:', error)
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    )
  }
}
