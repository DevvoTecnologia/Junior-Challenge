import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Input } from '../Input';
import { ringServiceInstance } from '../../services/ringService';
import { Select } from '../Select';
import { Button } from '../Button';
import { RequestRing } from '../../types/requestRing';
import { ResponseRing } from '../../types/resposneRing';

import './styles.css';

interface RingFormProps {
  buttonLabel: string;
  onSubmit: (ringData: RequestRing) => Promise<void>;
  initialData?: ResponseRing;
}

export function RingForm({
  initialData,
  buttonLabel,
  onSubmit,
}: RingFormProps) {
  const [name, setName] = useState('');
  const [power, setPower] = useState('');
  const [owner, setOwner] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [forgersOptions, setForgersOptions] = useState<string[]>([]);
  const [forger, setForger] = useState('');
  const [isLoadingOptions, setIsLoadingOptions] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = name && power && owner && forger && imageUrl;

  useEffect(() => {
    setIsLoadingOptions(true);

    ringServiceInstance
      .getForges()
      .then(forgers => setForgersOptions(forgers))
      .catch(error => toast.error(error.message))
      .finally(() => setIsLoadingOptions(false));
  }, []);

  // Atualizando os campos quando initialData mudar
  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setPower(initialData.power || '');
      setOwner(initialData.owner || '');
      setForger(initialData.forgedBy || '');
      setImageUrl(initialData.image || '');
    }
  }, [initialData]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    await onSubmit({
      name,
      power,
      owner,
      image: imageUrl,
      forgedBy: forger,
    });

    setIsSubmitting(false);
  }

  return (
    <form className="ring-form-container" onSubmit={handleSubmit} noValidate>
      <Input
        placeholder="Nome"
        value={name}
        onChange={event => setName(event.target.value)}
        disabled={isSubmitting}
      />
      <Input
        placeholder="Poder"
        value={power}
        onChange={e => setPower(e.target.value)}
        disabled={isSubmitting}
      />
      <Input
        placeholder="Dono"
        value={owner}
        onChange={e => setOwner(e.target.value)}
        disabled={isSubmitting}
      />
      <Input
        placeholder="ImageUrl"
        value={imageUrl}
        onChange={e => setImageUrl(e.target.value)}
        disabled={isSubmitting}
      />
      <Select
        defaultValue={forger}
        onChange={({ target }) => setForger(target.value)}
        disabled={isLoadingOptions || isSubmitting}
      >
        <option value="">Selecione o forjador</option>

        {forgersOptions.map(forger => (
          <option key={forger} value={forger}>
            {forger}
          </option>
        ))}
      </Select>
      <Button type="submit" disabled={!isFormValid} isLoading={isSubmitting}>
        {buttonLabel}
      </Button>
    </form>
  );
}
