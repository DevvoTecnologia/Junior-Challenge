import styled from "styled-components";

const CardStyled = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 327px;
  height: 579px;
  background: #fff;
  border: 1px solid #000;
  border-radius: 1rem;
  gap: 24px;
  justify-content: space-around;

  @media (max-width:500px) {
    /* transform: translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) scale(0.8) !important; */
    width: 300px;
  }
  
`;

const PictureStyled = styled.img`
  height: 134px;
  object-fit: contain;
  padding-top: 18px;
  filter: drop-shadow(5px 5px 4px #000000b3);
`;

const TitleStyled = styled.div`
  align-items: center;
  align-self: center;
  :first-child {
    font-size: 12px;
    font-family: "Cinzel", system-ui;
  }
  :nth-child(2) {
    font-size: 24px;
    font-family: "Cinzel Decorative", system-ui;
    font-weight: 700;
    text-align: center;
    width: 320px;
    border: 0px solid transparent;
    height: fit-content;
  }

  @media (max-width:500px) {
    /* transform: translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) scale(0.8) !important; */
    :nth-child(2){
      width: 290px;
    }
  }

  textarea {
    resize: none;
  }

  input:disabled,
  textarea:disabled {
    cursor: default;
    background-color: transparent;
    color: #000 !important;
  }

  select {
    font-size: 24px !important;
    font-family: "Cinzel Decorative", system-ui;
    font-weight: 700;
    background: transparent;
  }

  option{
    font-size: 24px !important;
    font-family: "Cinzel Decorative", system-ui;
    font-weight: 700;
  }

`;

const ContainerIconStyled = styled.div`
  display: flex;
  gap: 90px;
  justify-content: center;
  padding-bottom: 1rem;
  .lucide {
    cursor: pointer;
  }

  button{
    background: transparent;
    border: 0px solid transparent;
  }
`;

export { CardStyled, PictureStyled, TitleStyled, ContainerIconStyled };
