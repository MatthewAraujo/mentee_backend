import { PrismaUsersRepository } from "@/repositories/prisma/user/prisma-users-repository"
import { AuthenticateUseCase } from "@/use-cases/user/authenticate"

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(usersRepository)

  return authenticateUseCase
}
