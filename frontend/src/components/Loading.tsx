export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoadingIcon />
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function LoadingIcon() {
  return (
    <svg
      className={`h-12 w-12 animate-spin text-blue-500`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.966 7.966 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
