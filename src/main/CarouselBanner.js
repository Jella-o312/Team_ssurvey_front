import { Carousel, Container } from "react-bootstrap";
import './CarouselBanner.css';
import { Link } from "react-router-dom";

const CarouselBanner = () => {
  const imagePaths = [
    {
      imagePath: "/img/SS01.png",
      title: "Image 1",
      url: "/SurveyList",
    },
    {
      imagePath: "/img/SS02.png",
      title: "Image 2",
      url: "/FunPage",
    },
    {
      imagePath: "/img/SS03.png",
      title: "Image 3",
      url: "/SurveyPage",
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
