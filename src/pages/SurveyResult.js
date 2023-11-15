import { useEffect, useState } from "react";
import './SurveyResult.css';
import axiosInstance from "../axioslnstance";


const SurveyResult = ({ surveyNo, surveyTitle, userInfo }) => {
    // const [surveyInfo, setSurveyInfo] = useState(userInfo);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState('');
    
  

    useEffect(() => {
        // useEffect 내부에서 비동기 함수를 호출할 경우, 함수를 정의하고 그 안에서 호출하는 것이 좋습니다.
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(`/surveyResult/${surveyNo}`);
                setAnswers(response.data);

                const response2 = await axiosInstance.get(`/surveyQ/${surveyNo}`);
                setQuestions(response2.data);   //질문 옵션 받아오기 위해 만듦

            } catch (error) {
                console.error(error);
                alert("오류가 발생했습니다.");
            }
        };

        // fetchData 함수를 실행하고, 의존성 배열에 surveyNo를 넣어 최초 마운트 시에만 실행되도록 함
        fetchData();
    }, [surveyNo]);
         
    console.log(questions);

    const CompleteA = () => {
        // 원하는 작업 수행
        alert("✏️ 설문제출이 완료되었어요 ");
        // 답변을 백엔드에 저장하는 등의 작업이 필요할 수 있습니다.
    };


    // console.log(userInfo);

    return (
        <>
            <div className="qrHeader">
                <div className="ARbox">
                    <div className="questionQ" style={{display: 'flex', alignItems:'center', justifyContent: 'center'}}>   
                    </div>
                </div>
            </div>

            <div className='AWrap'>
                <div className="ABox">
                <h3 style={{backgroundColor: '#628ef3',color:'white' , padding:'10px', borderRadius: '7px', marginBottom: '30px'}}>{surveyTitle}</h3>     
                    {
                        questions.map((question, i) => (   
                        <div key={i}>
                            <h5 className="result-que">{i + 1}. {question.sqQuestion}</h5>
                            {
                                question.sqType === "객관식" ? 
                                <div>
                                    {question.option.map((op, index)=>(
                                        <div style={{display: 'flex'}}>   {/*⭐⭐⭐ 이 div 나중에 table형식으로 만드는게 깔끔할듯*/}
                                           <h6 className="result-ans">{op}</h6> &nbsp;&nbsp;
                                            <p className="result-cnt" style={{color: '#628ef3'}}>{answers[i][index]} 표</p>
                                        </div>
                                    ))
                                    }
                                </div>
                                :
                                
                                <div style={{marginLeft : '35px', marginRight : '35px', marginTop : '20px' }}>
                                    {
                                        answers[i].map((answer, k)=>(
                                            <p  style={{color: '#628ef3' }}> ( {k+1} ) {answer} <hr/></p>
                                            ))
                                            
                                    }


                                </div>    
                            }
                            
                        </div>
                        ))
                    }
                

                    
                </div>
            </div>
        </>
    );
}

export default SurveyResult;



// <h5 className='sendedQ'>질문</h5>
// <hr />
// <div className="question-container">
//     {questions && questions.map((question) => (
//         <div key={question.sqNo}>
//             <p>{question.sqQuestion}</p>
//             {/* 여기에 유형에 따른 추가 컴포넌트를 렌더링할 수 있습니다. */}
//         </div>
//     ))}
// </div>
// <hr />
// <p className='sendedAForm'>답변 통계</p>