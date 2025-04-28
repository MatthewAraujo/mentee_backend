import { PrismaUsersRepository } from '@/repositories/prisma/user/prisma-users-repository'
import { RegisterUseCase } from '@/use-cases/user/register'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(usersRepository)

  return registerUseCase
}
