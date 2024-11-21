declare module 'react-slick' {
    import { Component, ReactNode } from 'react';
  
    interface SliderProps {
      dots?: boolean;
      infinite?: boolean;
      speed?: number;
      slidesToShow?: number;
      slidesToScroll?: number;
      autoplay?: boolean;
      arrows?: boolean;
      // Agora adicionamos o children como parte das props
      children?: ReactNode;
    }
  
    export default class Slider extends Component<SliderProps> {}
  }
  