import { makeGetUserProfileUseCase } from '@/use-cases/factories/user/make-get-user-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = makeGetUserProfileUseCase()

  const { user } = await getUserProfile.execute({
    userId: request.user.sign.sub,
  })


  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  })
}
