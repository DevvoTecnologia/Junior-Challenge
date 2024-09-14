export default function ApiErrorMessage({ message }: { message: string }) {
  return (
    <div className="text-center">
      <p>
        <mark>{message}</mark>
      </p>
    </div>
  );
}
