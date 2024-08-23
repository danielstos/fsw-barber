"use server"
import { db } from "@/app/_lib/prisma"
import { notFound } from "next/navigation"

export const getBarbershopById = async (params: { id: string }) => {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
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
