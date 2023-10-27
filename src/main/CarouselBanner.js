import { Carousel, Container } from "react-bootstrap";
import './CarouselBanner.css';

const CarouselBanner = () => {
  const imagePaths = [
    "/img/survey-banner1.jpg", 
    "/img/survey-banner2.jpg", 
    "/img/survey-banner3.jpg", 
  ];

  return (
    <Container className="carousel-container">
      <Carousel fade>
        {imagePaths.map((imagePath, index) => (
          <Carousel.Item key={index}>
          <img
            src={process.env.PUBLIC_URL + imagePath}
            alt=""
            className="imgBox"
          />
        </Carousel.Item>
        
        
        ))}
      </Carousel>
    </Container>
  );
}

export default CarouselBanner;
