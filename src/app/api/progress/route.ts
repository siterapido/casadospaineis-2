import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { userId, lessonId, isCompleted } = body

    if (!userId || !lessonId) {
      return NextResponse.json(
        { error: 'userId and lessonId are required' },
        { status: 400 }
      )
    }

    // Check if progress exists
    const existingProgress = await db.userProgress.findUnique({
      where: {
        userId_lessonId: {
          userId,
          lessonId
        }
      }
    })

    if (existingProgress) {
      // Update existing progress
      const progress = await db.userProgress.update({
        where: {
          userId_lessonId: {
            userId,
            lessonId
          }
        },
        data: {
          isCompleted: isCompleted !== undefined ? isCompleted : !existingProgress.isCompleted
        }
      })

      return NextResponse.json(progress)
    } else {
      // Create new progress
      const progress = await db.userProgress.create({
        data: {
          userId,
          lessonId,
          isCompleted: isCompleted !== undefined ? isCompleted : true
        }
      })

      return NextResponse.json(progress)
    }
  } catch (error) {
    console.error('Error updating progress:', error)
    return NextResponse.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const courseId = searchParams.get('courseId')

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      )
    }

    const whereClause: any = {
      userId
    }

    if (courseId) {
      // Get all lesson IDs for this course
      const course = await db.course.findUnique({
        where: { id: courseId },
        include: {
          chapters: {
            include: {
              lessons: {
                select: { id: true }
              }
            }
          }
        }
      })

      if (course) {
        const lessonIds = course.chapters.flatMap(chapter =>
          chapter.lessons.map(lesson => lesson.id)
        )
        whereClause.lessonId = { in: lessonIds }
      }
    }

    const progress = await db.userProgress.findMany({
      where: whereClause,
      include: {
        lesson: {
          include: {
            chapter: {
              include: {
                course: true
              }
            }
          }
        }
      }
    })

    return NextResponse.json(progress)
  } catch (error) {
    console.error('Error fetching progress:', error)
    return NextResponse.json(
      { error: 'Failed to fetch progress' },
      { status: 500 }
    )
  }
}
