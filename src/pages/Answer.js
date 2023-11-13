import { useEffect, useState } from "react";
import './Answer.css';
import axiosInstance from "../axioslnstance";

const Answer = ({ surveyNo, surveyTitle }) => {
  const [surveyInfo, setSurveyInfo] = useState({});
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    // surveyNo가 있고 surveyTitle이 존재하면 해당 설문의 정보를 가져옴
    if (surveyNo && surveyTitle) {
      setSurveyInfo({
        surveyNo,
        surTitle: surveyTitle,
      });

      axiosInstance.get(`/surveys/${surveyNo}`)
        .then((response) => {
          console.log('Survey Data:', response.data);
          setQuestions(response.data.questions);
          setAnswers(response.data.answers);
        })
        .catch((error) => {
          console.error('설문의 질문 정보를 가져오는 중 오류 발생:', error);
        });
    }
  }, [surveyNo, surveyTitle]);

  const CompleteA = () => {
    // 원하는 작업 수행
    alert("✏️ 설문제출이 완료되었어요 ");
    // 답변을 백엔드에 저장하는 등의 작업이 필요할 수 있습니다.
  };

  return (
    <>
      <div className="QHeader">
        <div className="Abox">
          <div className="questionQ">
            <p>Q.</p>
            {/* surveyNo가 있을 때만 제목을 표시 */}
            {surveyInfo.surveyNo && <p className="SQTitle">{surveyInfo.surTitle}</p>}
          </div>
        </div>
        <div className="submitA">
          <div className="createText">
            <p className="CreateS">SUBMIT<br/>A SURVEY</p>
            <button type="submit" className="Asumit-btn" onClick={CompleteA}> 답변 제출 </button>
          </div>
        </div>
      </div>

      <div className='AWrap'>
        <div className="ABox">
          <p className='sendedQ'>받아온 질문</p>
          <hr />
          <div className="question-container">
            {questions && questions.map((question) => (
              <div key={question.sqNo}>
                <p>{question.sqQuestion}</p>
                {/* 여기에 유형에 따른 추가 컴포넌트를 렌더링할 수 있습니다. */}
              </div>
            ))}
          </div>
          <hr/>
          <p className='sendedAForm'>받아온 답변창</p>
          {/* 답변 정보를 렌더링하는 부분 */}
          {answers && answers.map((answer) => (
            <div key={answer.saNo}>
              <p>{answer.saAnswer}</p>
              {/* 다른 유형에 따른 컴포넌트 추가 */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Answer;
