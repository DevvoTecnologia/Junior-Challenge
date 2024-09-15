import Slider from 'react-slick';
import Button from '../Button';
import './carousel.scss';

interface Ring {
    id: number;
    nome: string;
    poder: string;
    portador: string;
    forjadoPor: string;
    imagem?: string;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const RingCarousel = ({ rings, onEdit, onDelete }: { rings: Ring[], onEdit: (id: number) => void, onDelete: (id: number) => void }) => {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true
                }
            }
        ]
    };

    console.log(rings)
    return (
        <Slider {...settings} className="carousel">
            {rings.map(ring => (
                <div key={ring.id} className="carousel-item">
                    {ring.imagem && (
                        <img
                            src={ring.imagem}
                            alt={ring.nome}
                            className="carousel-image"
                        />
                    )}
                    <div className="carousel-content">
                        <h3>{ring.nome}</h3>
                        <p><strong>Poder:</strong> {ring.poder}</p>
                        <p><strong>Portador:</strong> {ring.portador}</p>
                        <p><strong>Forjado por:</strong> {ring.forjadoPor}</p>
                        <div className="carousel-actions">
                            <Button onClick={() => onEdit(ring.id)}>Edit</Button>
                            <Button onClick={() => onDelete(ring.id)}>Delete</Button>
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
    );
};

export default RingCarousel;
