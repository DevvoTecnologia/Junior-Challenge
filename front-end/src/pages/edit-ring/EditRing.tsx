import React, { useEffect, useState } from 'react';
import RingForm from '../../components/ring-form/RingForm';
import { getRingById, Ring, RingForCreation, updateRing } from '../../api/rings';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify'
import '../../components/ring-form/styles.scss'


const EditRing: React.FC = () => {
    const [initialValues, setInitialValues] = useState<Ring | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { ringId } = useParams<{ ringId: string }>();
    const navigate = useNavigate()

    useEffect(() => {
        if (ringId) {
            const loadRing = async () => {
                try {
                    const id = Number(ringId);
                    if (isNaN(id)) {
                        throw new Error("ID inválido.");
                    }
                    const data = await getRingById(id);
                    setInitialValues(data);

                } catch (error) {
                    console.error('Erro ao carregar anel:', error);
                    setError('Erro ao carregar anel.');
                }
            };

            loadRing();
        }
    }, [ringId]);

    const handleSubmit = async (data: RingForCreation) => {
        if (ringId) {
            try {
                await updateRing(Number(ringId), {
                    ...data,
                    id: Number(ringId)
                });
                toast.success('Anel atualizado com sucesso!');
                navigate('/aneis');
            } catch (error: any) {
                toast.error(error.message);
            }
        }
    };

    return (
        <div className='add-edit-ring'>
            <h1>Editar Anel</h1>
            {error ? <p className="error">{error}</p> :
                <RingForm
                    initialValues={initialValues ? {
                        nome: initialValues.nome,
                        poder: initialValues.poder,
                        portador: initialValues.portador,
                        forjadoPor: initialValues.forjadoPor,
                        imagem: initialValues.imagem
                    } : undefined}
                    onSubmit={handleSubmit}
                    isEditing
                />}
        </div>
    );
};

export default EditRing;
