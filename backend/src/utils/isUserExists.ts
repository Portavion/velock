import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function isUserExist(userId: number): Promise<boolean> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return false;
  } else {
    return true;
  }
}

export default isUserExist;
