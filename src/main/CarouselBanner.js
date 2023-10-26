import { Carousel, Container } from "react-bootstrap";
import './CarouselBanner.css';

const CarouselBanner = () => {
  const imagePaths = [
    "../img/camping_main_01.jpg",
    "../img/camping_main_02.jpg",
    "../img/camping_main_03.jpg",
  ];

  return (
    <>
      <Container className="carouselimg">
        <Carousel fade>
          {imagePaths.map((imagePath, index) => (
            <Carousel.Item key={index}>
              <Carousel.Caption className="imgBox">
                <img src={imagePath} alt={`Image ${index + 1}`} />
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </>
  );
}

export default CarouselBanner;
