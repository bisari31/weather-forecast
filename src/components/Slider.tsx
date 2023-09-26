import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SliderWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Slider
      dots={false}
      infinite={false}
      slidesToScroll={5}
      arrows={false}
      variableWidth
      responsive={[
        {
          breakpoint: 862,
          settings: {
            slidesToScroll: 4,
          },
        },
        {
          breakpoint: 712,
          settings: {
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 562,
          settings: {
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 412,
          settings: {
            slidesToScroll: 1,
          },
        },
      ]}
    >
      {children}
    </Slider>
  );
};

export default SliderWrapper;
