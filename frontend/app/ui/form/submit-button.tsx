import { useFormStatus } from 'react-dom';

export default function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} aria-busy={pending}>
      {pending ? 'Enviando...' : text}
    </button>
  );
}
