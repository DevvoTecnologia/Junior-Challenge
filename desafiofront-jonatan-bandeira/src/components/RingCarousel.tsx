import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import Slider from "react-slick";
import { TAnel } from "../pages/ringList/ViewRings";
import { useEffect, useState } from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { useNavigate } from "react-router-dom";
import { deleteRing } from "../pages/form/_request";

type Props = {
  data: TAnel[];
};

function MultipleItems(props: Props) {
  const navigate = useNavigate();
  const [data, setData] = useState(props.data);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: data.length <= 3 ? data.length : 3.2,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1230,
        settings: {
          slidesToShow: 2.5 ,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: data.length <= 2 ? data.length : 2.2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 748, 
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const goToEditarAnel = (id: number) => navigate(`/aneis/${id}`);

  const deleteR = async (id: number) => {
    await deleteRing(id);
    setData((prev) => {
      const lista = prev.filter((item) => item.id !== id);
      return lista;
    });
  };

  return (
    <div className="px-4 lg:px-32 flex items-center w-full">
      <div className="w-full max-w-[1500px]">
        {data.length ? (
          <Slider {...settings}>
            {data.map((item) => (
              <div key={item.id}>
                <Card className="py-4 w-[300px]">
                  <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <div>
                      <div className="flex justify-between items-center">
                        <p
                          className="uppercase font-bold text-xl w-[230px] text-ellipsis block whitespace-nowrap overflow-hidden"
                          title={item.nome}
                        >
                          {item.nome}
                        </p>
                        <Dropdown>
                          <DropdownTrigger>
                            <span className="text-2xl font-extrabold p-2 cursor-pointer">...</span>
                          </DropdownTrigger>
                          <DropdownMenu aria-label="Static Actions">
                            <DropdownItem
                              onClick={() => goToEditarAnel(item.id)}
                              className="text-slate-800"
                              key="edit"
                            >
                              Editar Anel
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => deleteR(item.id)}
                              key="delete"
                              className="text-danger"
                              color="danger"
                            >
                              Deletar Anel
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                      <small className="text-default-500 block">Forjado por: {item.forjadoPor}</small>
                      <small className="text-default-500 block">Portador: {item.portador.nome}</small>
                      <small className="text-default-500 block">Poder: {item.poder}</small>
                    </div>
                  </CardHeader>
                  <CardBody className="overflow-visible py-2">
                    <Image
                      alt="Card background"
                      className="object-cover rounded-xl"
                      src={item.imagem}
                      width={270}
                    />
                  </CardBody>
                </Card>
              </div>
            ))}
          </Slider>
        ) : "Vazio"}
      </div>
    </div>
  );
}

export default MultipleItems;
