import { FastifyInstance } from 'fastify'

import { prisma } from "./lib/prisma"

export async function appRoutes(app: FastifyInstance) {
  app.get('/getHabit', async () => {
    return prisma.habit.findMany()
  })
}