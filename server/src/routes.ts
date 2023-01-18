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

  
  app.get('/day', async (request) => {
    const getDayParams = z.object({
      date: z.coerce.date() // Convert the received param into date
    })

    const { date } = getDayParams.parse(request.query)

    const parsedDate = dayjs(date).startOf('day')
    const weekDay = dayjs(parsedDate).get('day')

    const possibleHabits = await prisma.habit.findMany({ 
      where: { 
        created_at: { lte: date }, 
        weekDays: { some: { week_day: weekDay }} 
      } 
    })

    const day = await prisma.day.findUnique({
      where: { date: parsedDate.toDate() },
      include: { dayHabits: true }
    })
    
    const completedHabits = day?.dayHabits.map(dayHabit =>  dayHabit.habit_id ) ?? []

    return { possibleHabits, completedHabits }
  })
}