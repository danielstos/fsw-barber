import HeaderSearch from "@/app/_components/header-with-search"
import OpeningHours from "@/app/_components/openg-hours"
import PhoneItem from "@/app/_components/phone-item"
import ServiceItem from "@/app/_components/service-item"
import SidebarSheet from "@/app/_components/sidebar-sheet"
import { Button } from "@/app/_components/ui/button"
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet"
import { getBarbershopById } from "@/app/bookings/_data/get-barbershop-id"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// id do barbeiro passado como parametro na url
interface BarbershopPageProps {
  params: {
    id: string
  }
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  // Chamar o banco de dados
  const barbershop = await getBarbershopById(params)

  return (
    <div className="md:flex md:flex-col md:items-center">
      <div className="hidden md:block md:w-[1520px]">
        <HeaderSearch />
      </div>
      <div className="md:flex md:h-[1113px] md:w-[1440px] md:flex-row md:items-start md:gap-[40px] md:p-[40px_128px_0]">
        <div className="md:flex md:h-[1073px] md:w-[758px] md:flex-col md:items-start md:gap-[40px] md:p-0">
          {/* Imagem */}
          <div className="relative h-[250px] w-full md:h-[485.9px]">
            <Image
              alt={barbershop.name}
              src={barbershop?.imageUrl}
              fill
              className="object-cover"
            />
            <div className="md:hidden">
              <Button
                size="icon"
                variant="secondary"
                className="absolute left-4 top-4"
                asChild
              >
                <Link href="/">
                  <ChevronLeftIcon />
                </Link>
              </Button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute right-4 top-4"
                  >
                    <MenuIcon />
                  </Button>
                </SheetTrigger>
                <SidebarSheet />
              </Sheet>
            </div>
          </div>

          {/* Título */}
          <div className="border-b border-solid p-5 md:w-full">
            <h1 className="mb-3 text-xl font-bold md:text-3xl">
              {barbershop.name}
            </h1>
            <div className="md:flex md:w-full md:justify-between">
              <div className="mb-2 flex items-center gap-1">
                <MapPinIcon className="text-primary" />
                <p className="text-sm">{barbershop?.address}</p>
              </div>
              <div className="flex items-center gap-1">
                <StarIcon size={28} className="fill-primary text-primary" />
                <div className="md:flex md:flex-col">
                  <p className="mdd:font-bold text-sm md:text-lg">
                    5,0{" "}
                    <span className="text-sm md:text-xs">
                      (499 avaliações )
                    </span>{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Descrição */}
          <div className="block space-y-3 border-b border-solid p-5 md:hidden">
            <h2 className="text-xs font-bold uppercase text-gray-400">
              Sobre nós
            </h2>
            <p className="text-justify text-sm">{barbershop?.description} </p>
          </div>

          {/* Serviços */}

          <div>
            <h2 className="mb-3 p-5 text-xs font-bold uppercase text-gray-400">
              Serviços
            </h2>
            <div className="p-2 md:mb-[80px] md:grid md:h-auto md:w-[758px] md:grid-cols-2 md:gap-[20px] md:p-0">
              <div className="space-y-3 p-2">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
                  {barbershop.services.slice(0, 3).map((service) => (
                    <ServiceItem
                      key={service.id}
                      barbershop={JSON.parse(JSON.stringify(barbershop))}
                      service={JSON.parse(JSON.stringify(service))}
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-3 p-2">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
                  {barbershop.services.slice(3, 6).map((service) => (
                    <ServiceItem
                      key={service.id}
                      barbershop={JSON.parse(JSON.stringify(barbershop))}
                      service={JSON.parse(JSON.stringify(service))}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contato */}
          <div className="block p-5 md:hidden">
            {barbershop.phones.map((phone) => (
              <PhoneItem key={phone} phone={phone} />
            ))}
          </div>
        </div>
        <div className="md:flex-grow-1 md:order-1 md:flex md:h-[829.01px] md:w-[386px] md:flex-col md:items-center md:gap-5 md:rounded-lg md:bg-[#1A1B1F] md:px-5 md:py-5">
          <div className="relative h-[180px] w-full">
            <Image
              className="hidden md:block"
              alt="localização da barbearia"
              src="/barbershopcard.png"
              layout="fill"
              objectFit="cover"
            />
          </div>
          {/* Descrição */}
          <div className="hidden space-y-3 border-b border-solid md:block">
            <h2 className="text-xs font-bold uppercase text-gray-400">
              Sobre nós
            </h2>
            <p className="line-clamp-4 text-justify text-sm">
              {barbershop?.description}{" "}
            </p>
          </div>
          {/* Contato */}
          <div className="hidden w-full space-y-3 border-b border-solid p-5 md:block">
            {barbershop.phones.map((phone) => (
              <PhoneItem key={phone} phone={phone} />
            ))}
          </div>
          <div className="hidden w-full space-y-3 border-b border-solid md:block">
            <OpeningHours />
          </div>
          <Image
            className="hidden md:block"
            alt="barbearia parceira"
            src="/Frame.png"
            width={346}
            height={62}
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  )
}

export default BarbershopPage
