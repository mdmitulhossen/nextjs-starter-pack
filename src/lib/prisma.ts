import { PrismaClient } from '@prisma/client'

// PrismaClient is attached to the `global` object in development
// to prevent exhausting database connections due to hot reloading
declare global {
  // eslint-disable-next-line no-var, @typescript-eslint/no-redundant-type-constituents
  var prisma: PrismaClient | undefined
}

const prismaClientSingleton = () => {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  })
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const prisma = globalThis.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma
}

export default prisma
