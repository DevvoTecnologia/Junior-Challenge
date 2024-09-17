import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel"
import axios from "axios"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Pencil, Trash } from "lucide-react"
import { Forger, RingFormModal } from "./RingForm"

export type RingTypes = {
    _id: string;
    name: string;
    power: string;
    carrier: string;
    forgedBy: Forger;
    image: string;
}

export function RingsCarousel() {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)
    const [rings, setRings] = useState<RingTypes[]>([])
    const [selectedRing, setSelectedRing] = useState<RingTypes | null>(null)
    const [isCreating, setIsCreating] = useState(false)
    const [open, setOpen] = useState(false)

    const getRings = async () => {
        try {
            const allRings = await axios.get('http://localhost:8080/rings')
            setRings(allRings.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    useEffect(() => {
        getRings()
    }, [])

    const openCreateModal = () => {
        setIsCreating(true)
        setSelectedRing(null) 
        setOpen(true)
    }

    const openEditModal = (ring: RingTypes) => {
        setIsCreating(false)
        setSelectedRing(ring) 
        setOpen(true)
    }

    const closeModal = () => {
        setOpen(false)
        setSelectedRing(null) 
    }

    const onDeleteRing = async (ring: RingTypes) => {
        try {
            await axios.delete(`http://localhost:8080/rings/${ring?._id}`)
            getRings()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Carousel setApi={setApi} className="w-full max-w-xs">
                <CarouselContent>
                    {rings.map((ring, index) => (
                        <CarouselItem key={index}>
                            <Card>
                                <CardContent className="flex flex-col items-center justify-center p-6 min-h-80 relative">
                                    <img src={ring.image} alt="Foto de um anel" className="w-52 h-52" />
                                    <span className="text-2xl font-semibold">{ring.name}</span>

                                    <div className="flex flex-col gap-2 mt-5">
                                        <span>Portador: <span className="text-zinc-600">{ring.carrier}</span></span>
                                        <span>Forjado por: <span className="text-zinc-600">{ring.forgedBy}</span></span>
                                        <span>Poder: <span className="text-zinc-600">{ring.power}</span></span>
                                    </div>

                                    <Button
                                        className="absolute top-3 left-3 p-1.5 rounded-full"
                                        onClick={() => openEditModal(ring)}
                                    >
                                        <Pencil />
                                    </Button>

                                    <Button 
                                        className="absolute top-3 right-3 p-1.5 rounded-full bg-red-500 hover:bg-red-300"
                                        onClick={() => onDeleteRing(ring)}    
                                    >
                                        <Trash />
                                    </Button>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

            <div className="py-2 text-center text-sm text-muted-foreground">
                Anel {current} de {count}
            </div>

            <div className="mt-3 w-full">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button className="w-full py-6" onClick={() => openCreateModal()}>
                            Criar novo anel
                        </Button>
                    </DialogTrigger>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{isCreating ? "Criar novo Anel" : "Editar Anel"}</DialogTitle>
                        </DialogHeader>

                        <RingFormModal
                            ring={selectedRing}
                            isCreating={isCreating}
                            onClose={closeModal}
                            updateRings={getRings}
                        />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
