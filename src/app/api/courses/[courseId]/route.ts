import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const course = await db.course.findUnique({
      where: {
        id: params.courseId
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
              orderBy: {
                position: 'asc'
              }
            }
          },
          orderBy: {
            position: 'asc'
          }
        }
      }
    })

    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      )
    }

    // Transform data to include total lessons
    const courseWithStats = {
      ...course,
      totalLessons: course.chapters.reduce((acc, chapter) => acc + chapter.lessons.length, 0)
    }

    return NextResponse.json(courseWithStats)
  } catch (error) {
    console.error('Error fetching course:', error)
    return NextResponse.json(
      { error: 'Failed to fetch course' },
      { status: 500 }
    )
  }
}
