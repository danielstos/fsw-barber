// _components/bookings.tsx
import { getServerSession } from "next-auth"
import Header from "../_components/header"
import { authOptions } from "../_lib/auth"
import { notFound } from "next/navigation"
import { getConfirmedBookings } from "./_data/get-confirmed-bookings"
import { getConcludedBookings } from "./_data/get-concluded-bookings"
import BookingsContainer from "../_components/BookingsContainer"

const Bookings = async () => {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    // TODO: mostrar pop-up de login
    return notFound()
  }

  // Obter dados de agendamentos
  const confirmedBookings = await getConfirmedBookings()
  const concludedBookings = await getConcludedBookings()

  // Concatenar todos os agendamentos e converter o campo 'price'
  const allBookings = [...confirmedBookings, ...concludedBookings].map(
    (booking) => ({
      ...booking,
      service: {
        ...booking.service,
        price: Number(booking.service.price.toString()), // Convertendo o Decimal para número
      },
    }),
  )

  return (
    <>
      <Header />
      <div className="md:flex md:h-auto md:w-[1440px] md:flex-col md:items-start md:gap-[40px] md:px-[256px] md:pb-0 md:pt-[40px]">
        <BookingsContainer bookings={allBookings} />
      </div>
    </>
  )
}

export default Bookings
