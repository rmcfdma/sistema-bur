import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const usuarios = await prisma.usuarios.findMany()
    console.log(usuarios)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })