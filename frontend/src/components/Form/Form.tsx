import React, { useState, useEffect } from 'react';
import styles from './Form.module.css';
import Button from '../Button/Button';
import Text from '../Text/Text';
import TextInput from '../TextInput/TextInput';
import Toast from '../Toast/Toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { GiHammerDrop } from "react-icons/gi";
import { TiArrowBackOutline, TiPencil } from "react-icons/ti";

const Form: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ring = location.state || {};

  const handleBackHome = () => {
    navigate('/');
  };

  const [formData, setFormData] = useState({
    ring_name: '',
    ring_power: '',
    ring_carrier: '',
    ring_forged_by: '',
    ring_image_url: '',
  });

  const [errors, setErrors] = useState({
    ring_name: '',
    ring_power: '',
    ring_carrier: '',
    ring_forged_by: '',
    ring_image_url: '',
  });

  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  useEffect(() => {
    if (ring && Object.keys(ring).length > 0) {
      setFormData({
        ring_name: ring.name || '',
        ring_power: ring.power || '',
        ring_carrier: ring.carrier || '',
        ring_forged_by: ring.forgedBy || '',
        ring_image_url: ring.imgSrc || '',
      });
      setIsUpdate(true);
    } else {
      setIsUpdate(false);
    }
  }, [ring]);

  const validate = () => {
    const newErrors = { 
      ring_name: '', 
      ring_power: '', 
      ring_carrier: '', 
      ring_forged_by: '', 
      ring_image_url: '' 
    };

    if (!formData.ring_name) newErrors.ring_name = 'O nome do anel é obrigatório';
    if (!formData.ring_power) newErrors.ring_power = 'O poder do anel é obrigatório';
    if (!formData.ring_carrier) newErrors.ring_carrier = 'O portador do anel é obrigatório';
    if (!formData.ring_forged_by) newErrors.ring_forged_by = 'O forjador do anel é obrigatório';
    if (!formData.ring_image_url) newErrors.ring_image_url = 'A imagem do anel é obrigatória';
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate()) {
      setLoading(true);
      try {
        if (isUpdate) {
          setToastMessage('Formulário atualizado com sucesso!');
          setToastType('success');
        } else {
          setToastMessage('Formulário enviado com sucesso!');
          setToastType('success');
        }
        setFormData({ ring_name: '', ring_power: '', ring_carrier: '', ring_forged_by: '', ring_image_url: '' });
      } catch (error) {
        setToastMessage('Erro ao enviar o formulário: ' + error);
        setToastType('error');
      } finally {
        setLoading(false);
        setToastVisible(true);
      }
    }
  };

  const handleToastClose = () => {
    setToastVisible(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.titleForm}>
          <Text content={isUpdate ? "Atualize o anel" : "Crie um anel"} color={"#4c2e03"} size={"extra-large"} bold={true} />
        </div>

        <TextInput
          type={"text"}
          id="ring_name"
          name="ring_name"
          label="Nome"
          value={formData.ring_name}
          onChange={handleChange}
          error={errors.ring_name}
          placeholder={"Digite o nome do anel"}
        />

        <TextInput
          type={"text"}
          id="ring_power"
          name="ring_power"
          label="Poder"
          value={formData.ring_power}
          onChange={handleChange}
          error={errors.ring_power}
          placeholder={"Digite o poder do anel"}
        />

        <TextInput
          type={"text"}
          id="ring_carrier"
          name="ring_carrier"
          label="Portador"
          value={formData.ring_carrier}
          onChange={handleChange}
          error={errors.ring_carrier}
          placeholder={"Digite quem é o portador do anel"}
        />

        <TextInput
          type={"select"}
          id="ring_forged_by"
          name="ring_forged_by"
          label="Forjado por"
          value={formData.ring_forged_by}
          onChange={handleChange}
          error={errors.ring_forged_by}
          placeholder={"Digite quem forjou o anel"}
        />

        <TextInput
          type={"text"}
          id="ring_image_url"
          name="ring_image_url"
          label="Imagem"
          value={formData.ring_image_url}
          onChange={handleChange}
          error={errors.ring_image_url}
          placeholder={"Cole a url de uma imagem do anel"}
        />

        <div className={styles.footerBtns}>
          <Button type={"button"} onClick={handleBackHome} text={"Voltar"} color={"#000"} icon={TiArrowBackOutline} />
          <Button 
            type={"submit"} 
            text={isUpdate ? "Atualizar" : "Forjar"} 
            color={"#714411"} 
            icon={isUpdate ? TiPencil : GiHammerDrop} 
            disabled={loading} 
          />
        </div>
      </form>
      {toastVisible && (
        <Toast message={toastMessage} type={toastType} onClose={handleToastClose} />
      )}
    </>
  );
};

export default Form;