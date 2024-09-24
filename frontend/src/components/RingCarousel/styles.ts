import styled from "styled-components";
import Modal from "react-modal";

export const Container = styled.div``;

export const Title = styled.h1``;

export const RowSlider = styled.div`
  width: fit-content;
  height: 100%;
`;

export const SliderText = styled.h3`
  width: fit-content;
`;

export const StyledModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  width: 50%;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;
