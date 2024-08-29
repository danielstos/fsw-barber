const OpeningHours = () => {
  const hours = [
    { day: "Segunda", hours: "Fechado" },
    { day: "Terça-Feira", hours: "09:00 - 21:00" },
    { day: "Quarta-Feira", hours: "09:00 - 21:00" },
    { day: "Quinta-Feira", hours: "09:00 - 21:00" },
    { day: "Sexta-Feira", hours: "09:00 - 21:00" },
    { day: "Sábado", hours: "08:00 - 17:00" },
    { day: "Domingo", hours: "Fechado" },
  ]

  return (
    <div className="w-full rounded-lg bg-transparent p-5">
      <ul className="w-full space-y-2">
        {hours.map((item, index) => (
          <li key={index} className="flex justify-between text-sm">
            <span className="text-gray-500">{item.day}</span>
            <span>{item.hours}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default OpeningHours
