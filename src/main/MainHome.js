import CarouselBanner from "./CarouselBanner";
import Survey from "./Survey";


function MainHome() {

  return (
    <>
      <CarouselBanner />
      <Survey />
      {/* <Survey boardType="fun" /> Header - Fun 게시판 */}
      {/* <Survey boardType="survey" /> Header - Survey 게시판 */}
      
    </>
  );
}

export default MainHome;