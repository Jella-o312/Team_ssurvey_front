import { Carousel, Container } from "react-bootstrap";
import './CarouselBanner.css';
import { Link } from "react-router-dom";

const CarouselBanner = () => {
  const imagePaths = [
    {
      imagePath: "/img/survey-banner1.jpg",
      title: "Image 1",
      url: "/detail/image1",
    },
    {
      imagePath: "/img/survey-banner2.jpg",
      title: "Image 2",
      url: "/detail/image2",
    },
    {
      imagePath: "/img/survey-banner3.jpg",
      title: "Image 3",
      url: "/detail/image3",
    },
  ];
  

  return (
    <Container className="carousel-container">
      <Carousel fade>

      {imagePaths.map((image, index) => (
  <Carousel.Item key={index}>
    <Link to={image.url}>
      <img
        src={process.env.PUBLIC_URL + image.imagePath}
        alt={image.title}
        className="imgBox"
      />
    </Link>
  </Carousel.Item>
))}


      </Carousel>
    </Container>
  );
}

export default CarouselBanner;
