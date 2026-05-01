import { config } from 'dotenv'
import { PrismaClient } from '../src/generated/prisma/client'
import bcrypt from 'bcryptjs'

config({ path: '.env' })

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('123456', 10)

  await prisma.user.upsert({
    where: { email: 'teste@exemplo.com' },
    update: {},
    create: {
      name: 'Usuário',
      surname: 'Teste',
      email: 'teste@exemplo.com',
      password: hashedPassword,
      plan: 'free'
    }
  })


}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })