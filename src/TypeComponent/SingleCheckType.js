import { useEffect, useState } from "react";
import './SingleCheckType.css';
import axios from 'axios'; // 설문 정보를 가져오기 위한 HTTP 요청에 axios를 사용합니다.

function SingleCheckType({ selectedType }) {
  const [survey, setSurvey] = useState({
    sTitle: '',
    questions: [],
  });

  useEffect(() => {
    // API 엔드포인트나 식별자에 기반하여 설문 정보를 가져옵니다.
    axios.get('설문_API_엔드포인트')
      .then((response) => {
        setSurvey(response.data); // API에서 설문 제목과 질문 정보가 제대로 반환된다고 가정합니다.
      })
      .catch((error) => {
        console.error('설문 정보를 가져오는 중 오류 발생:', error);
      });
  }, [selectedType]);

  return (
    <div className="addCheck">
      <h1>{survey.sTitle}</h1>
      <div className="questions-container">
        {survey.questions.map((question, questionIndex) => (
          <div key={questionIndex}>
            <p>{question.sqQuestion}</p>
            <div className="options-container">
              {question.sOptions.map((option, optionIndex) => (
                <label className="Qlabel" key={optionIndex}>
                  <input
                    type="radio"
                    className="radioBtn"
                    name={`options-${questionIndex}`}
                    value={option}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SingleCheckType;
