import React, { useEffect, useState } from 'react';
import { RingForCreation } from '../../api/rings';
import { useNavigate } from 'react-router-dom';

interface FormRingProps {
    initialValues?: RingForCreation;
    onSubmit: (data: RingForCreation) => void;
    isEditing?: boolean;
}

const RingForm: React.FC<FormRingProps> = ({ initialValues, onSubmit, isEditing = false }) => {
    const [nome, setNome] = useState(initialValues?.nome || '');
    const [poder, setPoder] = useState(initialValues?.poder || '');
    const [portador, setPortador] = useState(initialValues?.portador || '');
    const [forjadoPor, setForjadoPor] = useState(initialValues?.forjadoPor || 'Elfos');
    const [selectedImage, setSelectedImage] = useState(initialValues?.imagem || '');

    const navigate = useNavigate()

    const imageOptions = [
        "https://varegue.com.br/wp-content/uploads/2021/09/valknut-III-4-min-min.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkvXKoDklPUScu1u7xkEkW6Tph5kHepJ5GAQ&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPmAN3dtq817KFW9Yzu5V-vysKNqPxnYIqlw&s",
        "https://images.tcdn.com.br/img/img_prod/1230092/aliancas_elfico_black_7mm_noivado_e_casamento_tungstenio_167_1_4fb3962cf092274b3b364be90638d776.png",
        "https://http2.mlstatic.com/D_NQ_NP_763005-MLB74496780805_022024-O.webp",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSAkdi0kAIBNRmxRW5bjT11T5M-45bcUMenw&s"
    ];

    useEffect(() => {
        if (initialValues) {
            setNome(initialValues.nome || '');
            setPoder(initialValues.poder || '');
            setPortador(initialValues.portador || '');
            setForjadoPor(initialValues.forjadoPor || 'Elfos');
            setSelectedImage(initialValues.imagem || '');
        }
    }, [initialValues]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data: RingForCreation = {
            nome,
            poder,
            portador,
            forjadoPor,
            imagem: selectedImage
        };
        onSubmit(data);
    };
    return (
        <form className='ring-form' onSubmit={handleSubmit}>
            <label>
                Nome:
                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
            </label>
            <label>
                Poder:
                <input type="text" value={poder} onChange={(e) => setPoder(e.target.value)} required />
            </label>
            <label>
                Portador:
                <input type="text" value={portador} onChange={(e) => setPortador(e.target.value)} required />
            </label>
            <label>
                Forjado Por:
                <select value={forjadoPor} onChange={(e) => setForjadoPor(e.target.value as 'Elfos' | 'Anões' | 'Homens' | 'Sauron')} required>
                    <option value="Elfos">Elfos</option>
                    <option value="Anões">Anões</option>
                    <option value="Homens">Homens</option>
                    <option value="Sauron">Sauron</option>
                </select>
            </label>
            <label>
                Imagem:
                <select value={selectedImage} onChange={(e) => setSelectedImage(e.target.value)} required>
                    <option value="">Selecione uma imagem</option>
                    {imageOptions.map((url, index) => (
                        <option key={index} value={url}>
                            Anel {index + 1}
                        </option>
                    ))}
                </select>
                {selectedImage && (
                    <div className='img-container'>
                        <img
                            src={selectedImage}
                            alt="Selected"
                            style={{
                                border: '2px solid blue',
                                cursor: 'pointer',
                                width: '100px',
                                marginTop: '10px'
                            }}
                        />
                    </div>
                )}
            </label>
            <button type="submit">{isEditing ? 'Atualizar' : 'Adicionar'}</button>
            <button className="back-button" type="button" onClick={() => navigate('/aneis')}>Voltar</button>
        </form>
    );
};

export default RingForm;
