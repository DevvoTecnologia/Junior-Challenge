import styled from 'styled-components'
import colors from '../../styles/colors'
import Slider from 'react-slick'

export const Carrousel = styled(Slider)`
  .slick-track {
    display: flex;
    flex-direction: row-reverse;
    margin-left: 20px;
  }

  .slick-slide {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: auto;
  }

  @media (max-width: 578px) {
    max-width: 578px;
    width: 100%;
    margin-left: 0 !important;
    .slick-track {
      margin-left: 0;
    }
    .slick-slide {
      width: 80%;
      margin-left: 0 !important;
      align-items: center !important;
      justify-content: center !important;
      margin-bottom: 15px;
    }
  }
  .container-slider .slick-slide {
    display: flex;
    justify-content: center;
  }

  .container-slider .slick-slide > div {
    margin: 0 auto;
  }

  .container-slider .slick-track {
    display: flex;
  }

  .container-slider .slick-slide img {
    width: 100%;
    object-fit: cover; /* ou 'contain' dependendo do comportamento desejado */
  }
`

export const ArrowSlider = styled.div`
  font-size: 30px;
  background-color: ${colors?.gray};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  text-align: center;
  display: flex;
  padding: 10px;

  &:hover {
    background-color: ${colors?.gray};
  }
`
