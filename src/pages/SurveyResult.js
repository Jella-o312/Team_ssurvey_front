import { useEffect, useState } from "react";
import './SurveyResult.css';
import axiosInstance from "../axioslnstance";


const SurveyResult = () => {
    const [surveyInfo, setSurveyInfo] = useState({});
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [selectedSurvey, setSelectedSurvey] = useState(null);
    const [selectedSurveyNo, setSelectedSurveyNo] = useState(null);
    const [selectedSurveyTitle, setSelectedSurveyTitle] = useState(null);

    // const myData = [{ angle: 1 }, { angle: 5 }, { angle: 2 }] //예시 값

    useEffect(() => {
        axiosInstance.get('/surveys')
            .then((response) => {
                const firstSurvey = response.data[0];

                if (firstSurvey) {
                    // surveyInfo에 surveyNo와 surveyTitle 추가
                    setSurveyInfo({
                        surveyNo: firstSurvey.surveyNo,
                        surveyTitle: firstSurvey.surTitle,
                    });

                    axiosInstance.get(`/surveys/${firstSurvey.surveyNo}`)
                        .then((response) => {
                            console.log('Survey Data:', response.data);
                            setQuestions(response.data.questions);
                            setAnswers(response.data.answers);
                        })
                        .catch((error) => {
                            console.error('설문의 질문 정보를 가져오는 중 오류 발생:', error);
                        });
                }
            })
            .catch((error) => {
                console.error('설문 목록을 가져오는 중 오류 발생:', error);
            });
    }, []);

    // const handleParticipateClick = (surveyNo, surveyTitle) => {
    //     setSelectedSurveyNo(surveyNo);
    //     setSelectedSurveyTitle(surveyTitle); // 선택한 설문의 타이틀을 설정
    //     setShowParticipateModal(true);
    //   };

    const CompleteA = () => {
        // 원하는 작업 수행
        alert("✏️ 설문제출이 완료되었어요 ");
        // 답변을 백엔드에 저장하는 등의 작업이 필요할 수 있습니다.
    };

    return (
        <>
            <div className="qrHeader">
                <div className="ARbox">
                    <div className="questionQ">
                  
                        {/* <h5 className="SQTitle">surveyNo={selectedSurvey?.surveyNo} surveyTitle={selectedSurvey?.surTitle}</h5>
                        여길 또 어떻게 받아오노 하..
                        */}
                    </div>
                </div>
            </div>

            <div className='AWrap'>
                <div className="ABox">
                    <p className='sendedQ'>질문</p>
                    <hr />
                    <div className="question-container">
                        {questions && questions.map((question) => (
                            <div key={question.sqNo}>
                                <p>{question.sqQuestion}</p>
                                {/* 여기에 유형에 따른 추가 컴포넌트를 렌더링할 수 있습니다. */}
                            </div>
                        ))}
                    </div>
                    <hr />
                    <p className='sendedAForm'>답변 통계</p>
                    {/* 답변 정보를 렌더링하는 부분 */}
                    {/* <RadialChart
                        data={myData}
                        width={300}
                        height={300} /> 
                        npm install react-vis 라이브러리 설치해서 사용 해야함 */}
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

export default SurveyResult;
