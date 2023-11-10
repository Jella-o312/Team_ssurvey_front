import { useEffect, useState } from "react";
import './SingleCheckType.css';

import axiosInstance from "../axioslnstance";

const SingleCheckType = () => {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    axiosInstance.get('/survey')
      .then((response) => {
        setSurveys(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('설문 정보를 가져오는 중 오류 발생:', error);
      });
  }, []);

  const HandleQtype = (e) => {
    let eQTDataset = e.target.sTitle.field;
    let eQTValue = e.target.value;
    // setEjoinUser({...ejoinUser, [`user${ eQTDataset}`] : eQTValue})
    // 이후 로직은 주석 처리되어 있어 필요에 따라 활성화할 수 있습니다.
  };

  return (
    <div className="singleCheckType">
      
      <div className="questions-container">
        {/* <select onChange={HandleQtype} data-field="Type"> */}
          <option value="none" />
          {surveys.map((survey) => (
            <option key={survey.survey_no} value={survey.survey_category}>
              {survey.survey_category}
            </option>
          ))}
        {/* </select> */}
      </div>
    </div>
  );
}

export default SingleCheckType;
