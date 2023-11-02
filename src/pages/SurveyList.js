import { Navigate, useNavigate } from "react-router-dom";

const SurveyList = () => {
  const navigate = useNavigate();


  return(
    <>
  <button onClick={()=> {navigate('/SurveyQ')}}>설문신청으로 이동하세요</button>
    </>
);
}

  export default SurveyList;