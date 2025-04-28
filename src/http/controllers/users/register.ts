import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exist-error'
import { makeRegisterUseCase } from '@/use-cases/factories/user/make-register-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  request.log.info("Starting register router")
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })


  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      name,
      email,
      password,
    })

    request.log.info("Success register router")
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }


    request.log.info("Failed register router")
    throw err
  }

  request.log.info("Finish register router")

  return reply.status(201).send()
}
