import Fastify from 'Fastify'
import cors from '@fastify/cors'

const app = Fastify()

app.register(cors)

app.get('/', () => {
  return 'Hello My Friend'
})

app.listen({ port: 3333 }).then(() => console.log('Server Running...'))