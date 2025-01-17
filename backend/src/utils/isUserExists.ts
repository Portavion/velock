import prisma from "../prisma/prisma";

async function isUserExist(userId: number): Promise<boolean> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return false;
  } else {
    return true;
  }
}

export default isUserExist;
