'use client'
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import SlideFromLeft from "@/components/animations/SlideFromLeft";
import { BounceWrapper } from "@/components/animations/Bounce";
import { Button } from "@/components/ui/button";
import { Pencil1Icon, TrashIcon, PlusIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import AnimatedArrowIcon from "../ui/AnimatedArrow";
import CreateRingForm from "@/forms/CreateRingForm";
import Dialog from "@/Factory/Dialog"; // Add the Dialog import
import { Fade } from "../animations/Fade";

export const Rings = ({ setRoute, setParams }: any) => {
    const [api, setApi] = useState<CarouselApi>();
    const [aneis, setAneis] = useState<any>([]);
    const [anelInfo, setAnelInfo] = useState<number>(0);
    const [raceCounts, setRaceCounts] = useState({
        homem: 0,
        elfos: 0,
        anao: 0,
        sauron: 0,
    });
    const [openDialog, setOpenDialog] = useState<boolean>(false); // Dialog state
    const [selectedAnelId, setSelectedAnelId] = useState<number | null>(null); // Store the selected ring for deletion
    const [message, setMessage] = useState<string>(''); // For dialog message

    useEffect(() => {
        const fetchAneis = async () => {
            try {
                const token = localStorage.getItem('TOKEN');
                const headers = new Headers();
                if (token) {
                    headers.append('Authorization', `Bearer ${token}`);
                }

                const response = await fetch('http://localhost:3000/api/aneis', { headers });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAneis(data.data);
                // Calculate race counts
                const raceCounts: any = {
                    homem: 0,
                    elfos: 0,
                    anao: 0,
                    sauron: 0,
                };

                data.data.forEach((anel: any) => {
                    if (anel.portador && anel.portador.race) {
                        raceCounts[anel.portador.race] += 1;
                    }
                });

                setRaceCounts(raceCounts);
            } catch (error: any) {
                console.error(error.message);
            }
        };

        fetchAneis();
    }, []);

    useEffect(() => {
        if (!api) {
            return
        }

        api.on("select", () => {
            setAnelInfo(api.selectedScrollSnap())
        })
    }, [api])

    const goToCreateView = () => {
        setRoute('create');
    };

    const goToEditView = (anel: object) => {
        setParams(anel)

        console.log(anel)
        setRoute("create");
    };

    const handleDelete = async (id: number) => {
        try {
            const token = localStorage.getItem('TOKEN');
            const headers = new Headers();
            if (token) {
                headers.append('Authorization', `Bearer ${token}`);
            }

            const response = await fetch(`http://localhost:3000/api/aneis/${id}`, {
                method: 'DELETE',
                headers,
            });

            if (!response.ok) {
                throw new Error('Failed to delete the ring');
            }

            const result = await response.json();
            setMessage(result.status);
            setOpenDialog(false);
            setAnelInfo(aneis.filter((anel: any) => anel.id !== id).length - 1)

            setAneis(aneis.filter((anel: any) => anel.id !== id));
            const raceCounts: any = {
                homem: 0,
                elfos: 0,
                anao: 0,
                sauron: 0,
            };

            aneis.forEach((anel: any) => {
                if (anel.portador && anel.portador.race) {
                    raceCounts[anel.portador.race] += 1;
                }
            });

            setRaceCounts(raceCounts);
        } catch (error: any) {
            setMessage(error.message);
            setOpenDialog(true);
        }
    };

    const confirmDelete = (id: number) => {
        console.log(id)
        setSelectedAnelId(id);
        setMessage('Tem certeza que deseja deletar este anel?');
        setOpenDialog(true);
    };

    return (
        <div className="sm:flex-col sm:flex-wrap md:flex-col md:flex-wrap md:p-4 w-9/12 ">
            <div className="w-full">
                <SlideFromLeft>
                    <h2 className="font-bold">Os Anéis do Poder</h2>
                </SlideFromLeft>
                <Separator className="my-4" />
            </div>
            <div className=" xl:flex-col xl:flex-wrap md:w-auto md:flex-col md:flex-wrap   items-center ">
                <BounceWrapper className="mt-4 ">
                    <Badge className="md:w-auto w-full sm:mx-0 md:mx-2 p-2 bg-purple-900" onClick={goToCreateView}>
                        Forjar Novo Anel
                    </Badge>
                </BounceWrapper>

                <Badge className=" md:w-auto w-full sm:mx-0 md:mx-2 p-2 bg-blue-400">N° Total de Anéis: {aneis.length}</Badge>
                <Badge className=" md:w-auto w-full sm:mx-0 md:mx-2 p-2 bg-amber-900 ">Anéis dos Homens: {raceCounts.homem}</Badge>
                <Badge className=" md:w-auto w-full sm:mx-0 md:mx-2 p-2 bg-yellow-600 ">Anéis dos Elfos: {raceCounts.elfos}</Badge>
                <Badge className=" md:w-auto w-full sm:mx-0 md:mx-2 p-2 bg-green-800 -">Anéis dos Anões: {raceCounts.anao}</Badge>
                <Badge className=" md:w-auto w-full sm:mx-0 md:mx-2 p-2 bg-red-500 ">Anéis de Sauron: {raceCounts.sauron}</Badge>
            </div>
            <Fade className={"w-full flex m-4 flex-col flex-wrap"} >
                <div
                // className="sm:flex-row sm:flex-nowrap  "
                >

                    <div
                        className="sm:flex-row sm:flex-nowrap md:flex-col md:flex-wrap flex justify-center  "
                    >
                        {aneis.length>0?(
                            <>
                              <div
                            className=" flex justify-center"
                        >
                            {aneis && (
                                <Carousel className="  mx-12" setApi={setApi} >
                                    <CarouselContent>
                                        {aneis.reverse().map((anel: any, index: number) => {
                                            return (
                                                <CarouselItem key={index}>
                                                    <span className="text-center">{anel.nome}</span>
                                                    <Separator className="my-2" />
                                                    <div
                                                        className="relative group w-full rounded-xl overflow-hidden flex justify-center"
                                                    >
                                                        <motion.img
                                                            src={anel.imagem}
                                                            alt={anel.nome}
                                                            className="object-contain h-52 w-52 transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:shadow-lg"
                                                            whileHover={{ scale: 1.1 }}
                                                        />
                                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 bg-black bg-opacity-50">
                                                            <span className="text-white text-lg font-semibold">
                                                                <Button className="mr-2" onClick={() => goToEditView(anel)}>
                                                                    <Pencil1Icon className="mr-2" />
                                                                    Editar
                                                                </Button>
                                                                <Button variant="destructive" onClick={() => confirmDelete(anel.id)}>
                                                                    <TrashIcon className="mr-2" />
                                                                    Deletar
                                                                </Button>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </CarouselItem>
                                            );
                                        })}
                                    </CarouselContent>
                                    <CarouselPrevious />
                                    <CarouselNext />
                                </Carousel>
                            )}
                        </div>
                        
                        <div
                            className="flex flex-row flex-wrap gap-2 justify-center mt-4"

                        >
                            <SlideFromLeft
                                className="w-5/12"
                            // className="sm:ml-0  sm:w-1/4 sm:flex-row sm:flex-nowrap md:flex-col md:flex-wrap md:mt-4 w-full "
                            >
                                <div
                                // className="  flex justify-center  "
                                >

                                    <Card className=" h-64 bg-gray-800 text-white">
                                        <CardHeader>
                                            <CardTitle>{aneis[anelInfo] && aneis[anelInfo].nome}</CardTitle>

                                        </CardHeader>
                                        <Separator />
                                        <CardContent className="mt-2">
                                            <p><span className="font-bold">Poder: </span> {aneis[anelInfo] && aneis[anelInfo].poder}</p>
                                            <p><span className="font-bold">Forjado Por: </span>{aneis[anelInfo] && aneis[anelInfo].forjadoPor.nome}</p>
                                            <p><span className="font-bold">Em posse de: </span>{aneis[anelInfo] && aneis[anelInfo].portador.nome}</p>
                                            <p className="p-4 bg-gray-950 rounded-md">"{aneis[anelInfo] && aneis[anelInfo].descricao}"</p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </SlideFromLeft>

                         
                        </div>
                            </>
                        ):(<h2>Não existem anéis</h2>)}
                      
                    </div>
                </div>

            </Fade>

            {/* Dialog for delete confirmation */}
            <Dialog
                state={{
                    op: openDialog,
                    setOp: (state: boolean) => setOpenDialog(state),
                    message: message,
                    confirmAction: () => selectedAnelId && handleDelete(selectedAnelId),
                }}
            />
        </div>
    );
};

export const Create = ({ setRoute, params, setParams }: any) => {
    const goBack = () => {
        setParams({})
        setRoute('main')
    }
    return (

        <div className="w-9/12 flex p-4 flex-col">
            <div className="w-full ">
                <SlideFromLeft>
                    <h2 className=" font-bold flex items-center"><AnimatedArrowIcon onClick={goBack} /> {Object.keys(params).length > 0 ? 'Editar' : 'Forjar'} Anel</h2>
                </SlideFromLeft>
                <Separator className="my-4" />
                <CreateRingForm params={params} goBack={goBack}/>
            </div>




        </div>
    )


}