import BarbershopItem from "../_components/barbershop-item"
import Header from "../_components/header"
import Search from "../_components/search"
import { getBarbershops } from "../bookings/_data/get-barbershops"

interface BarbershopsPageProps {
  searchParams: {
    title?: string
    service?: string
  }
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  const babershops = await getBarbershops(searchParams)

  return (
    <div className="mx-auto min-h-screen">
      <Header />

      <div className="my-6 px-5">
        <Search />
      </div>
      <div className="p-5 md:mx-auto md:max-w-[1440px]">
        <h2 className="mb-4 md:text-lg">
          Resultados para {searchParams?.title || searchParams?.service}{" "}
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {babershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BarbershopsPage
