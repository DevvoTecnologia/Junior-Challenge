import React, { useState, useEffect } from 'react';
import './cards.css';
import '../../assets/styles/Buttons/button.css';

// Defina um tipo para os dados dos anéis
interface Ring {
    id: string;
    imageURL: string;
    name: string;
    power: string;
    carrier: string;
    forger: string;
    info: string;
}

// Função para buscar os dados da API
const fetchRings = async (): Promise<Ring[]> => {
    try {
        const response = await fetch('http://localhost:3333/allrings');
        if (!response.ok) {
            throw new Error('Erro ao buscar os dados');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

// Função para deletar um anel
const deleteRing = async (id: string): Promise<void> => {
    try {
        const response = await fetch(`http://localhost:3333/deleterings/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Erro ao deletar o anel');
        }
    } catch (error) {
        console.error(error);
    }
};

const Cards: React.FC = () => {
    const [rings, setRings] = useState<Ring[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getRings = async () => {
            const data = await fetchRings();
            if (data.length === 0) {
                setError('Nenhum anel encontrado.');
            }
            setRings(data);
        };
        getRings();
    }, []);

    const handleDelete = async (id: string) => {
        await deleteRing(id);
        setRings(rings.filter(ring => ring.id !== id));
    };

    return (
        <div className='box-cards'>
            {error && <div className="error-message">{error}</div>}
            {rings.length === 0 ? (
                <p>Carregando...</p>
            ) : (
                rings.map((item) => (
                    <div key={item.id} className='card'>
                        <img className='card-img' src={item.imageURL} alt={item.name} width={200} />
                        <div className='card-tags'>
                            <p className='tag'><span>Nome:</span> {item.name}</p>
                            <p className='tag'><span>Poder:</span> {item.power}</p>
                            <p className='tag'><span>Portador:</span> {item.carrier}</p>
                            <p className='tag'><span>Forjador:</span> {item.forger}</p>
                        </div>
                        <div className='card-info'>
                            <p className='info'>{item.info}</p>
                        </div>
                        <button className='btn-delete' onClick={() => handleDelete(item.id)}>DESTRUIR ANEL</button>
                    </div>
                ))
            )}
        </div>
    );
}

export default Cards;
