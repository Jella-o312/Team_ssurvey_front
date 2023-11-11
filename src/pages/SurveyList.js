import { Navigate, useNavigate } from "react-router-dom";
import './SurveyList.css';

const SurveyList = () => {
  const navigate = useNavigate();


  return(
<>
<p className="StypeText">설문 조사는 SSURVEY!</p>
<p className="StypeSelect">📝설문 유형을 선택해 주세요</p>
    <div className="SListWrap">
  <div className="Fun-Btn" onClick={()=> {navigate('/FunQ')}}>Fun</div>
  <div className="Survey-Btn" onClick={()=> {navigate('/SurveyQ')}}>Survey</div>
    </div>
    </>
);
}

  export default SurveyList;