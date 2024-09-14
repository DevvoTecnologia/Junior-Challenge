import Slider from "react-slick";
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";
import { deleteRing, Ring } from '../../api/rings';
import { useNavigate } from 'react-router-dom';
import './styles.scss'

import { toast } from 'react-toastify'

interface RingSliderProps {
    rings: Ring[];
    setRings: (rings: Ring[]) => void;
}


const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,

    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 1
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

const RingSlider: React.FC<RingSliderProps> = ({ rings, setRings }) => {
    const navigate = useNavigate()

    const handleEdit = (ringId: number) => {
        navigate(`editar/${ringId}`);
    };

    console.log(rings)
    const handleDeleteRing = async (ringId: number) => {
        try {
            await deleteRing(ringId, setRings);
            toast.success("Anel deletado com sucesso")
        } catch (error: any) {
            toast.error(`Erro ao deletar reserva: ${error.message}`);
        }
    };
    return (
        <div className="ring-slider-container">
            <Slider {...settings}>
                {rings.map((ring) => (
                    <div className="slick-slide" key={ring.id}>
                        <div className="ring-details">
                            <h2>{ring.nome}</h2>
                            <p>Poder</p>
                            <div className='detail'>{ring.poder}</div>

                            <p>Portador</p>
                            <div className='detail'>{ring.portador}</div>

                            <p>Forjado Por</p>
                            <div className='detail'>{ring.forjadoPor}</div>
                        </div>
                        <div className="ring-item">
                            <img src={ring.imagem} alt={ring.nome} />
                            <div className="ring-actions">
                                <button onClick={() => handleEdit(ring.id)} type="button">Editar Anel</button>
                                <button onClick={() => handleDeleteRing(ring.id)} type="button">Deletar Anel</button>
                            </div>
                            <button className='add-btn' type="button" onClick={() => navigate('add')}>Adicionar anel</button>
                        </div>
                    </div>
                ))}
            </Slider>

        </div>
    )
}

export default RingSlider;
