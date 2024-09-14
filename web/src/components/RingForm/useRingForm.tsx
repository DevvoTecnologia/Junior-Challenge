import { useEffect, useImperativeHandle, useState } from 'react';

// CustomHooks
import useErrors from '../../hooks/useErrors';
import { RequestRing } from '../../types/requestRing';
import { ringServiceInstance } from '../../services/ringService';
import { toast } from 'react-toastify';

interface useRingFormProps {
  onSubmit: (ringData: Partial<RequestRing>) => Promise<void>;
}

interface useRingFormRef {
  setFieldsValues: (ringData: RequestRing) => void;
  resetFields: () => void;
}

// interface UseContactFormReturn {
//   handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
//   getErrorMessageByFieldName: (fieldName: string) => string | undefined;
//   handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   name: string;
//   isSubmitting: boolean;
//   email: string;
//   handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   phone: string;
//   handlePhoneChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   isLoadingCategories: boolean;
//   categoryId: string;
//   setCategoryId: (id: string) => void;
//   categories: string[];
//   isFormValid: boolean;
// }

export function useRingForm(
  { onSubmit }: useRingFormProps,
  ref: React.Ref<useRingFormRef>,
) {
  const [name, setName] = useState('');
  const [power, setPower] = useState('');
  const [owner, setOwner] = useState('');
  const [forger, setForger] = useState('');
  const [forgersOptions, setForgersOptions] = useState<string[]>([]);
  const [isLoadingOptions, setIsLoadingOptions] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = name && power && owner && forger;

  useImperativeHandle(
    ref,
    () => ({
      setFieldsValues: (ring: RequestRing) => {
        setName(ring.name ?? '');
        setPower(ring.power ?? '');
        setOwner(ring.owner ?? '');
        setForger(ring.forgedBy ?? '');
      },
      resetFields: () => {
        setName('');
        setPower('');
        setOwner('');
        setForger('');
      },
    }),
    [],
  );

  useEffect(() => {
    setIsLoadingOptions(true);

    ringServiceInstance
      .getForges()
      .then(forgers => setForgersOptions(forgers))
      .catch(error => toast.error(error.message))
      .finally(() => setIsLoadingOptions(false));
  }, [setForgersOptions, setIsLoadingOptions]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    await onSubmit({
      name,
      power,
      owner,
      forgedBy: forger,
    });

    setIsSubmitting(false);
  }

  return {
    handleSubmit,
    name,
    isSubmitting,
    isLoadingOptions,
    forger
    setForger,
    forgersOptions
    isFormValid,
    name,
      power,
      owner,
      forgedBy: forger,
  };
}

export default useContactForm;
