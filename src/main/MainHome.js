import SurveyReply from "../SurveyReplyPage/SurveyReply";
import CarouselBanner from "./CarouselBanner";
import FunBoard from "./FunBoard";
import SurveyBoard from "./SurveyBoard";

function MainHome() {
  return (
      <>
      <CarouselBanner />
        <FunBoard />
        <SurveyBoard />
      </>
  );
}

export default MainHome;