// _components/booking-details.tsx
"use client"

import { Prisma } from "@prisma/client"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { isFuture } from "date-fns" // Importação corrigida
import Image from "next/image"
import PhoneItem from "./phone-item"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { toast } from "sonner"
import { deleteBooking } from "../_actions/delete-booking"
import { useState } from "react"
import BookingSummary from "./book-summary"

interface BookingDetailsProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }
  }>
}

const BookingDetails = ({ booking }: BookingDetailsProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const {
    service: { barbershop },
  } = booking
  const isConfirmed = isFuture(booking.date)

  const handleCancelBooking = async () => {
    try {
      await deleteBooking(booking.id)
      setIsDialogOpen(false)
      toast.success("Reserva cancelada com sucesso!")
    } catch (error) {
      console.log(error)
      toast.error("Erro ao cancelar reserva. Tente novamente!")
    }
  }

  return (
    <Card className="hidden md:block md:min-h-[740px] md:w-[444px]">
      <CardContent className="flex flex-col gap-4 p-5">
        <h1 className="mt-6 text-center text-xl font-bold">
          Informacões da Reserva
        </h1>
        <div className="relative mt-6 flex h-[180px] w-full items-end">
          <Image
            src="/map.png"
            alt={`mapa da Barbearia ${booking.service.barbershop.name}`}
            fill
            className="rounded-xl object-cover"
          />
          <Card className="z-10 mx-5 mb-3 w-full rounded-xl">
            <CardContent className="flex w-full gap-3 px-5 py-3">
              <Avatar>
                <AvatarImage src={barbershop.imageUrl} />
              </Avatar>
              <div>
                <h3 className="font-bold">{barbershop.name}</h3>
                <p className="text-xs">{barbershop.address}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-xs font-bold uppercase text-gray-400">Sobre nós</h2>

        <div className="flex items-center gap-2">
          <p className="text-justify text-sm">{barbershop?.description} </p>
        </div>
        {barbershop.phones.map((phone, index) => (
          <PhoneItem key={index} phone={phone} />
        ))}
        <div className="flex items-center justify-between">
          <Badge
            className="w-fit"
            variant={isConfirmed ? "default" : "secondary"}
          >
            {isConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>
        </div>
        <div className="mt-2">
          <BookingSummary
            barbershop={barbershop}
            service={booking.service}
            selectedDate={booking.date}
          />
        </div>
        {isConfirmed && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive">Cancelar Reserva</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Você deseja cancelar sua reserva?</DialogTitle>
                <DialogDescription>
                  Ao cancelar, você perderá sua reserva e não poderá
                  recuperá-la. Essa ação é irreversível.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="secondary">Voltar</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button variant="destructive" onClick={handleCancelBooking}>
                    Confirmar
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  )
}

export default BookingDetails
