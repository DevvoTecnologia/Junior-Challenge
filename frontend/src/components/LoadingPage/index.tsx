import { TailSpin } from "react-loader-spinner";
import { LoadingContainer } from "./styles";

const LoadingPage = () => {
  return (
    <>
      <LoadingContainer>
        <TailSpin width={34} height={34} color="rgba(167, 41, 245, 1)" />
      </LoadingContainer>
    </>
  );
};

export default LoadingPage;
