import { FastifyInstance } from 'fastify'
import dayjs from 'dayjs'
import { z } from 'zod'

import { prisma } from "./lib/prisma"

export async function appRoutes(app: FastifyInstance) {
  app.post('/habits', async (request) => {
    const createHabitBody = z.object({
      title: z.string(),
      weekdays: z.array(z.number().min(0).max(6))
    })
    const { title, weekdays } = createHabitBody.parse(request.body)

    const today = dayjs().startOf('day').toDate()

    return prisma.habit.create({
      data: {
        title,
        created_at: today,
        weekDays: { create: weekdays.map(weekDay => ({ week_day: weekDay })) }
      }
    })
  })
}