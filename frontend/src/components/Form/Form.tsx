import React, { useState } from 'react';
import styles from './Form.module.css';
import Button from '../Button/Button';
import Text from '../Text/Text';
import TextInput from '../TextInput/TextInput';
import { useNavigate } from 'react-router-dom';
import { GiHammerDrop } from "react-icons/gi";
import { TiArrowBackOutline } from "react-icons/ti";
import Toast from '../Toast/Toast';

const Form: React.FC = () => {
  const navigate = useNavigate();

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
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const validate = () => {
    const newErrors = { ring_name: '', ring_power: '', ring_carrier: '', ring_forged_by: '', ring_image_url: '' };
    if (!formData.ring_name) newErrors.ring_name = 'O nome do anel é obrigatório';
    if (!formData.ring_power) newErrors.ring_power = 'O poder do anel é obrigatório';
    if (!formData.ring_carrier) newErrors.ring_carrier = 'O portador do anel é obrigatório';
    if (!formData.ring_forged_by) newErrors.ring_forged_by = 'O forjador do anel é obrigatório';
    if (!formData.ring_image_url) newErrors.ring_image_url = 'A imagem do anel é obrigatória';
    setErrors(newErrors);

    return !newErrors.ring_name && !newErrors.ring_power && !newErrors.ring_carrier && !newErrors.ring_forged_by && !newErrors.ring_image_url;
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
        setToastType('success');
        setToastMessage('Formulário enviado com sucesso!');
        setFormData({ ring_name: '', ring_power: '', ring_carrier: '', ring_forged_by: '', ring_image_url: '' });
      } catch (error) {
        setToastType('error');
        setToastMessage('Erro ao enviar o formulário: ' + error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {toastMessage && <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage(null)} />}

      <div className={styles.titleForm}>
        <Text content={"Crie um anel"} color={"#4c2e03"} size={"extra-large"} bold={true} />
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
        <Button type={"submit"} text={"Forjar"} color={"#714411"} icon={GiHammerDrop} disabled={loading} />
      </div>
    </form>
  );
};

export default Form;