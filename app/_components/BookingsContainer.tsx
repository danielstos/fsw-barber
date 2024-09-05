"use client"
import { useState } from "react"
import BookingItem from "./booking-item"
import BookingDetails from "./booking-details"

interface BookingsContainerProps {
  bookings: any[]
}

const BookingsContainer = ({ bookings }: BookingsContainerProps) => {
  const [selectedBooking, setSelectedBooking] = useState<any>(null)

  const handleBookingClick = (booking: any) => {
    setSelectedBooking(booking)
  }

  return (
    <div className="flex flex-col md:flex-row md:items-start md:justify-center md:gap-[40px] md:px-[40px] md:pt-[40px]">
      {/* Lista de Agendamentos */}
      <div className="space-y-3 p-5 md:w-[450px]">
        <h1 className="text-xl font-bold">Agendamentos</h1>
        {bookings.length === 0 && (
          <p className="text-gray-400">Você não tem agendamentos</p>
        )}
        {bookings.length > 0 &&
          bookings.map((booking) => (
            <BookingItem
              key={booking.id}
              booking={{
                ...booking,
                price: booking.price ? booking.price.toString() : "0", // ou qualquer valor padrão que faça sentido
              }}
              onClick={() => handleBookingClick(booking)}
            />
          ))}
      </div>

      {/* Detalhes do Agendamento para telas grandes */}
      <div className="md:w-1/2">
        {selectedBooking ? (
          <BookingDetails booking={selectedBooking} />
        ) : (
          <div className="hidden h-[740px] w-[444px] items-start justify-center bg-card sm:block md:flex">
            <h1 className="mt-12 text-xl font-bold">Informacões da Reserva</h1>
          </div>
        )}
      </div>
    </div>
  )
}

export default BookingsContainer
