import { Ring } from "@/domain/Rings"
import Link from "next/link"
import Slider from "react-slick"

interface Props {
  subtitle: React.ReactNode
  rings: Ring[]
}

export function Carousel({ subtitle, rings }: Props) {
  const settings = {
    speed: 500,
    slidesToShow: 1,
  }

  return (
    <section className="flex flex-col gap-4 whitespace-nowrap">
      <h3 className="text-neutral-300">{subtitle} ({rings.length})</h3>

      <div className={`${rings.length ? "hidden" : ""}`}>
        <p>Os humanos não possuem nenhum anel.</p>
        <Link href="/rings/create" className="text-primary-400">Forje aqui um anel para eles.</Link>
      </div>

      <div className={`${rings.length ? "" : "hidden"} py-1 inline-block flex-1 whitespace-nowrap overflow-x-auto snap-x snap-mandatory scroll-smooth`}>
        {/* <Slider easing="ease-in-out" draggable centerMode swipeToSlide vertical={undefined} arrows={undefined} {...settings} > */}
        {rings.map((ring) => (
          <div
            key={ring.id}
            className={`inline-block relative max-w-full ${rings.length === 1 ? "min-w-[97%]" : "min-w-[80%]"} mr-2 aspect-[4/3] bg-neutral-950 border border-neutral-700 text-neutral-50 rounded-lg snap-center 
            hover:-translate-y-1 hover:bg-neutral-700 hover:border-primary-400 hover:shadow-md hover:shadow-primary-400/50 duration-150 ease-in-out`}
          >
            <img src={!ring.imagem ? ring.imagem : "/ring.jpg"} alt={ring.nome} className="absolute aspect-[4/3] object-cover rounded-lg after:absolute after:content-[''] before:inset-0 before:bg-gradient-to-t before:from-transparent before:to-neutral-950" />
            {/* //  <p className="absolute">💍</p> */}
            <div className="w-full h-full flex flex-col p-4">
              <p className="z-50">{ring.nome}</p>
              <p className="mt-auto z-50">{ring.portador}</p>
            </div>
          </div>
        ))}
        {/* </Slider> */}

      </div>
    </section>
  )
}