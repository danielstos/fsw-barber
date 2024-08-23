import { db } from "@/app/_lib/prisma"
import { notFound } from "next/navigation"

export const getBarbershopId = async (id: string) => {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id,
    },
    include: {
      services: true,
    },
  })

  if (!barbershop) {
    return notFound()
  }

  return barbershop
}
