import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true
          },
          include: {
            lessons: {
              where: {
                isPublished: true
              },
              select: {
                id: true
              }
            }
          },
          orderBy: {
            position: 'asc'
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Transform data to include total lessons count
    const coursesWithStats = courses.map(course => ({
      ...course,
      totalLessons: course.chapters.reduce((acc, chapter) => acc + chapter.lessons.length, 0)
    }))

    return NextResponse.json(coursesWithStats)
  } catch (error) {
    console.error('Error fetching courses:', error)
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, description, imageUrl, price, categoryId } = body

    if (!title || !categoryId) {
      return NextResponse.json(
        { error: 'Title and categoryId are required' },
        { status: 400 }
      )
    }

    const course = await db.course.create({
      data: {
        title,
        description: description || null,
        imageUrl: imageUrl || null,
        price: price || 0,
        categoryId,
        isPublished: false
      },
      include: {
        category: true
      }
    })

    return NextResponse.json(course, { status: 201 })
  } catch (error) {
    console.error('Error creating course:', error)
    return NextResponse.json(
      { error: 'Failed to create course' },
      { status: 500 }
    )
  }
}
