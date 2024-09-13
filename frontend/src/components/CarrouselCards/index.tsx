import React from 'react'
import { IRings } from '../../interfaces/IRings'
import CardRing from '../CardRing'
import { ArrowSlider, Carrousel } from './styles'

interface IProps {
  rings: Array<IRings>
}

const CarrouselCards = ({ rings }: IProps) => {
  const settingsSlider = {
    speed: 700,
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: rings?.length >= 3 ? 3 : rings?.length,
    className: 'container-slider',
    initialSlide: 1,
    slidesToScroll: 1,
    nextArrow: <ArrowSlider />,
    prevArrow: <ArrowSlider />,

    responsive: [
      {
        breakpoint: 1320,
        settings: {
          slidesToShow: rings?.length >= 3 ? 3 : rings?.length,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: rings?.length >= 3 ? 3 : rings?.length,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: rings?.length >= 2 ? 2 : rings?.length,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: rings?.length >= 2 ? 2 : rings?.length,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 710,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  return rings?.length > 1 ? (
    <Carrousel {...settingsSlider}>
      {rings?.map((ring: IRings, index: number) => (
        <CardRing ring={ring} key={index} />
      ))}
    </Carrousel>
  ) : (
    <CardRing ring={rings[0]} key={rings[0]?.id} />
  )
}

export default CarrouselCards
