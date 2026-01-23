import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, courseId } = body

    if (!userId || !courseId) {
      return NextResponse.json(
        { error: 'userId and courseId are required' },
        { status: 400 }
      )
    }

    // Check if purchase already exists
    const existingPurchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId
        }
      }
    })

    if (existingPurchase) {
      return NextResponse.json(
        { error: 'Course already purchased' },
        { status: 400 }
      )
    }

    // Create purchase
    const purchase = await db.purchase.create({
      data: {
        userId,
        courseId
      },
      include: {
        course: {
          include: {
            category: true
          }
        }
      }
    })

    return NextResponse.json(purchase, { status: 201 })
  } catch (error) {
    console.error('Error creating purchase:', error)
    return NextResponse.json(
      { error: 'Failed to create purchase' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      )
    }

    const purchases = await db.purchase.findMany({
      where: {
        userId
      },
      include: {
        course: {
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
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Get progress for each course
    const coursesWithProgress = await Promise.all(
      purchases.map(async (purchase) => {
        const courseId = purchase.course.id

        // Get all lesson IDs for this course
        const allLessonIds = purchase.course.chapters.flatMap(chapter =>
          chapter.lessons.map(lesson => lesson.id)
        )

        // Get completed lessons count
        const completedProgress = await db.userProgress.findMany({
          where: {
            userId,
            lessonId: { in: allLessonIds },
            isCompleted: true
          }
        })

        const totalLessons = allLessonIds.length
        const completedLessons = completedProgress.length
        const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

        return {
          ...purchase,
          course: {
            ...purchase.course,
            totalLessons,
            completedLessons,
            progress
          }
        }
      })
    )

    return NextResponse.json(coursesWithProgress)
  } catch (error) {
    console.error('Error fetching purchases:', error)
    return NextResponse.json(
      { error: 'Failed to fetch purchases' },
      { status: 500 }
    )
  }
}
