export default function ErrorHeader() {
  return (
    <>
      <hr />
      <p className="text-center">
        <span data-tooltip="Envie novamente para verificar" data-placement="bottom">
          {' '}
          Corrija os erros!
        </span>
      </p>
      <hr />
    </>
  );
}
