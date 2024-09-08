"use server"
import { db } from "@/app/_lib/prisma"

export const getBarbershops = async (searchParams?: {
  title?: string
  service?: string
  search?: string
}) => {
  const searchTitle = searchParams?.title || searchParams?.search
  const searchService = searchParams?.service || searchParams?.search
  return await db.barbershop.findMany({
    where: {
      OR: [
        searchTitle
          ? {
              name: {
                contains: searchTitle,
                mode: "insensitive",
              },
            }
          : {},
        searchService
          ? {
              services: {
                some: {
                  name: {
                    contains: searchService,
                    mode: "insensitive",
                  },
                },
              },
            }
          : {},
      ],
    },
  })
}
