import React from 'react';
import RingForm from '../../components/ring-form/RingForm';
import { addRing, RingForCreation } from '../../api/rings';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import '../../components/ring-form/styles.scss'

const AddRing: React.FC = () => {
    const navigate = useNavigate()


    const handleSubmit = async (data: RingForCreation) => {
        try {
            await addRing(data);
            navigate('/aneis')
            toast.success('Anel cadastrado com sucesso')
        } catch (error: any) {
            toast.error(error.message)

        }
    };

    return (
        <div className='add-edit-ring'>
            <h1>Adicionar Anel</h1>
            <RingForm onSubmit={handleSubmit} />
        </div>
    );
};

export default AddRing;
