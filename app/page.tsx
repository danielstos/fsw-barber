import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import Image from "next/image"
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"
import { quickSearchOptions } from "./_constants/search"
import BookingItem from "./_components/booking-item"
import Search from "./_components/search"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "./_lib/auth"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { getConfirmedBookings } from "./bookings/_data/get-confirmed-bookings"

const Home = async () => {
  const session = await getServerSession(authOptions)
  //chamar seu banco de dados
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })
  const confirmedBookings = await getConfirmedBookings()

  return (
    <div>
      {/* header */}

      <div className="md:mx-auto md:w-[100%]">
        <Header />
      </div>
      <div className="p-5 md:mx-auto md:flex md:max-w-[1440px] md:flex-col md:items-center">
        <div className="grid grid-cols-1 gap-4 md:h-[463px] md:w-[1440px] md:grid-cols-2 md:gap-[128px] md:p-[64px_128px]">
          <div>
            <h2 className="text-xl font-bold">
              {" "}
              <span className="text-sm font-light md:text-2xl">Olá, </span>
              {session?.user ? session.user.name : "Bem vindo"}!
            </h2>
            <p className="text-sm font-light">
              <span className="capitalize">
                {" "}
                {format(new Date(), "EEEE", { locale: ptBR })}
              </span>
              , {format(new Date(), "dd", { locale: ptBR })} <span>de</span>{" "}
              <span className="capitalize">
                {format(new Date(), "MMMM", { locale: ptBR })}
              </span>
            </p>
            {/* Buscar */}
            <div className="mt-6">
              <Search />
            </div>
            {/* Busca rapida */}
            <div className="mt-6 flex gap-2 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
              {quickSearchOptions.map((option) => (
                <Button
                  className="gap-2"
                  variant="secondary"
                  key={option.title}
                  asChild
                >
                  <Link href={`/barbershops?service=${option.title}`}>
                    <Image
                      src={option.imageUrl}
                      width={16}
                      height={16}
                      alt={option.title}
                    />
                    {option.title}
                  </Link>
                </Button>
              ))}
            </div>
            {/* Banner */}
            <div className="relative mb-4 mt-6 block h-[150px] w-full md:hidden">
              <Image
                alt="e nos melhores com FSW Barber"
                src="/banner-01.svg"
                fill
                className="rounded-xl object-cover"
              />
            </div>
            {confirmedBookings.length > 0 && (
              <>
                <h2 className="mb-4 mt-2 text-sm font-bold uppercase text-gray-400 md:text-base">
                  Agendamentos
                </h2>
              </>
            )}
            {/* Agendamento */}
            <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
              {confirmedBookings.map((booking) => (
                <BookingItem
                  key={booking.id}
                  booking={JSON.parse(JSON.stringify(booking))}
                />
              ))}
            </div>
          </div>
          <div>
            <h2 className="mb-4 mt-6 text-xs font-bold uppercase text-gray-400">
              Recomendados
            </h2>
            <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
              {barbershops.map((barbershop) => (
                <BarbershopItem key={barbershop.id} barbershop={barbershop} />
              ))}
            </div>
          </div>
        </div>
        <div className="md:h-[463px] md:w-[1440px] md:p-[40px_128px]">
          <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
            Populares
          </h2>
          <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
            {popularBarbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
