import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import Card from "../../../../components/Card";
import CustomButton from "../../../../components/CustomButton";
import LoadingPage from "../../../../components/LoadingPage";
import { ICard } from "../../../../interface/interface";
import api from "../../../../services/api";
import {
  Container,
  ContainerHeader,
  ContainerRingNotFound,
  ListContainer,
} from "./styles";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const Home = () => {
  const [listRings, setListRings] = useState<ICard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadRings() {
      try {
        const { data } = await api.get(`/api/rings`);
        setListRings(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao carregar os anéis", error);
      }
    }

    loadRings();
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await api.delete(`/api/rings/${id}`);
      toast.success(response.data.message || "Anel excluído com sucesso!");
      setListRings((prevRings) => prevRings.filter((ring) => ring.id !== id));
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Erro ao deletar o anel.");
      } else {
        toast.error("Erro desconhecido ao deletar o anel.");
      }
      console.error("Erro ao deletar o anel", error);
    }
  };

  return (
    <Container>
      <ContainerHeader>
        <h1>Listagem de Anéis</h1>
        <CustomButton onClick={() => navigate("/rings/new")}>
          Adicionar novo anel
        </CustomButton>
      </ContainerHeader>

      {isLoading ? (
        <LoadingPage />
      ) : (
        <ListContainer>
          {listRings.length > 0 ? (
            <Slider {...settings}>
              {listRings.map((item: ICard) => (
                <Card
                  key={item.id}
                  id={item.id}
                  carrier={item.carrier}
                  forgedBy={item.forgedBy}
                  image_url={item.image_url}
                  name={item.name}
                  power={item.power}
                  onEdit={() => {
                    navigate(`/rings/edit/${item.id}`);
                  }}
                  onDelete={handleDelete}
                />
              ))}
            </Slider>
          ) : (
            <ContainerRingNotFound>
              <p>Nenhum anel encontrado.</p>
            </ContainerRingNotFound>
          )}
        </ListContainer>
      )}
    </Container>
  );
};

export default Home;
