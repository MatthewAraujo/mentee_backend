import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from '@/env'
import { usersRoutes } from '@/http/controllers/users/routes'
import { eventsRoutes } from './http/controllers/events/routes'
import cors from '@fastify/cors'


export const app = fastify({
  logger: true
})


app.register(cors, {
  allowedHeaders: '*',
  origin: '*'
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})
app.register(fastifyCookie)

app.register(usersRoutes)
app.register(eventsRoutes)
app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
