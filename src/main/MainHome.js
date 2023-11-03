import SurveyReply from "../SurveyReplyPage/SurveyReply";
import CarouselBanner from "./CarouselBanner";
import FunBoard from "./FunBoard";
import SurveyBoard from "./SurveyBoard";

function MainHome() {
  return (
      <>
      <CarouselBanner />
          <SurveyReply />
          <FunBoard />
          <SurveyBoard />
      </>
  );
}

export default MainHome;