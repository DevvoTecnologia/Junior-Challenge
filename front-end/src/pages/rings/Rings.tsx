import { useEffect, useState } from "react"
import './styles.scss'
import { getRings } from "../../api/rings"
import { Ring } from '../../api/rings'
import RingSlider from "../../components/slider/Slider";
import { useNavigate } from "react-router-dom";

const Rings: React.FC = () => {
    const [rings, setRings] = useState<Ring[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate()

    useEffect(() => {
        const loadRings = async () => {
            try {
                const data = await getRings();
                setRings(data);
            } catch (error: any) {
                console.error("Erro ao buscar anéis:", error);
                setError("Erro ao carregar anéis.");
            } finally {
                setLoading(false);
            }
        };
        loadRings()
    }, [])


    return (
        <div className="rings-container">
            <h1>Anéis</h1>

            {loading ? (
                <p>Carregando anéis...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : rings.length === 0 ? (
                <div className="empty-rings">
                    <p>Nenhum anel encontrado.</p>
                    <button
                        className="add-ring-button"
                        onClick={() => navigate('add')}
                    >
                        Adicionar Anel
                    </button>
                </div>
            ) : (
                <RingSlider rings={rings} setRings={setRings} />
            )}
        </div>
    )
}

export default Rings