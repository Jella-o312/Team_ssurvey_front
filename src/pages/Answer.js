import { useEffect, useState } from "react";
import './Answer.css';
import axiosInstance from "../axioslnstance";
import { useNavigate } from "react-router-dom";

const Answer = ({ surveyNo, surveyTitle, userInfo }) => {
  const [surveyInfo, setSurveyInfo] = useState({});
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const [showResultModal, setShowResultModal] = useState(false);


  const [answerList, setAnswerList] = useState([
    {
      sqNo: '',
      answer: ''
    }
  ]);

  useEffect(() => {
    // surveyNo가 있고 surveyTitle이 존재하면 해당 설문의 정보를 가져옴
    if (surveyNo !== '' && surveyTitle !=='') {
      setSurveyInfo({
        surveyNo,
        surTitle: surveyTitle,
      });

      axiosInstance.get(`/surveyQ/${surveyNo}`)
        .then((response) => {
          console.log(response.data);
          setQuestions(response.data);
        })
        .catch((error) => {
          console.error('설문의 질문 정보를 가져오는 중 오류 발생:', error);
        });
    }
  }, [surveyNo, surveyTitle]);

 


  const handleAnswer = (e) => {
    let name = e.target.name;
    let value = e.target.value;
  
    // answerList의 첫 번째 요소를 제외한 나머지를 유지
    const updatedAnswerList = answerList.filter((item) => item.sqNo !== '');
  
    // 기존 답을 업데이트하거나 새로운 답을 추가
    const updatedAnswers = updatedAnswerList.map((item) => {
      if (item.sqNo === name) {
        return { ...item, 'answer': value };
      }
      return item;
    });
  
    // 이미 해당 질문에 대한 답이 없는 경우, 새로운 답을 추가
    if (!updatedAnswerList.some((item) => item.sqNo === name)) {
      updatedAnswers.push({ sqNo: name, answer: value });
    }
  
    setAnswerList(updatedAnswers);
  };
  
  
  const isEmptyAnswerList = questions.length === answerList.length ? true : false;
  // 질문에 대한 답이 모두 들어가 있는지 확인
  const answerFull = answerList.every(item => item.answer !== ''); 




  const renderQuestionComponent = (question) => {
    if (question.sqType === '객관식') {
      // 객관식일 경우 라디오 버튼을 렌더링
      return (
        <div>
          {question.option.map((item, i) => (
            <div className="radiobtn" key={i} >
              <label >
                <input className="radioinput" type="radio" name={question.sqNo} value={item} onClick={handleAnswer} />
                {item}
              </label>
            </div>
          ))}
        </div>
      );
    } else if (question.sqType === '다중 체크') {
      // 다중 체크일 경우 체크박스를 렌더링
      return (
        <div>
          {question.option.map((item, i) => (
            <div className="checkboxbtn" key={i}>
              <label>
              <input className="checkboxinput" type="checkbox" name={question.sqNo} value={item} onClick={handleAnswer}/>
              {item}</label>
            </div>
          ))}
        </div>
      );
    } else if (question.sqType === '단답형') {
      // 단답형일 경우 텍스트 입력을 렌더링
      return <input className="shorttextinput" type="text" placeholder="답변을 입력하세요"  name={question.sqNo} onChange={handleAnswer}/>;
    } else if (question.sqType === '장문형') {
      // 장문형일 경우 텍스트 에어리어를 렌더링
      return <textarea className="longtextinput" placeholder="답변을 입력하세요" name={question.sqNo} onChange={handleAnswer}/>;
    } else {
      // 다른 유형에 대한 처리를 원하는 대로 추가할 수 있습니다.
      return null;
    }
  };
  
  // const SurveyForm = ({ questions }) => {
  //   return (
  //     <div className="question-container">
  //       {questions.map((question) => (
  //         <div key={question.id}>
  //           <p>{question.sqQuestion}</p>
  //           {renderQuestionComponent(question)}
  //         </div>
  //       ))}
  //     </div>
  //   );
  // };





  const submitA = ()=>{
    if(isEmptyAnswerList && answerFull){
      axiosInstance.post(`/surveyA`, answerList, {params : {"username" : userInfo.username}})
      .then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      })
      alert('✏️ 설문제출이 완료되었어요');
      // setShowResultModal(false);
      navigate('/survey');
    }else{
      alert('답변하지 않은 항목이 있어요!');
    }
  }

  return (
    <>
      <div className="QHeader">
        <div className="Abox">
          <div className="AquestionQ">
            <p>Q.</p>
            {surveyInfo.surveyNo && <p className="SSQTitle">{surveyInfo.surTitle}</p>}
          </div>
        </div>
        <div className="submitA">
          <div className="createText">
            <p className="CreateS">SUBMIT<br />A SURVEY</p>
            <button type="submit" className="Asumit-btn" onClick={submitA}> 답변 제출 </button>
          </div>
        </div>
      </div>

      <div className='AWrap'>
        <div className="BBox">
          <div className="question-container">
            {questions.map((question, i) => (
              <div className="quessssy" key={i}>
                <p className="questionstyle">{i+1}. {question.sqQuestion}</p>
                
                {renderQuestionComponent(question)}
              </div>
            ))}
            
          </div>
          
        </div>
      </div>
    </>
  );
}

export default Answer;
