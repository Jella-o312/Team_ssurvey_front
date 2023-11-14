import CarouselBanner from "./CarouselBanner";
import Survey from "./Survey";


function MainHome({userInfo}) {

  return (
    <>
      <CarouselBanner />
      <Survey userInfo={userInfo} />
      {/* <Survey boardType="fun" /> Header - Fun 게시판 */}
      {/* <Survey boardType="survey" /> Header - Survey 게시판 */}
      
    </>
  );
}

export default MainHome;