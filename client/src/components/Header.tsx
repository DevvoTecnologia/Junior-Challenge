import { useRouter } from "next/router";

interface Props {
  hasPrevious?: boolean;
}

export function Header({ hasPrevious = false }: Props) {
  const router = useRouter();

  return (
    <header className="w-full flex gap-4 py-4 mb-12">
      {hasPrevious && (
        <button onClick={() => router.back()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#5f6368"
            className="w-6 h-6 fill-neutral-300"
          >
            <path d="m432-480 156 156q11 11 11 28t-11 28q-11 11-28 11t-28-11L348-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 28-11t28 11q11 11 11 28t-11 28L432-480Z" />
          </svg>
        </button>
      )}
      <p className="font-semibold">Tolkien&apos;s Rings</p>
    </header>
  );
}
