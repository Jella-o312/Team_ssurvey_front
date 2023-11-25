import { useEffect, useRef, useState } from 'react';
import './Question.css';



const Question = ({ data , handleAddQ, surveyList, setSurveyList}) => {
 
  // const [Question, setQuestion] = useState(sqQuestion);


  // const handlesqQuestionChange = (e) => {
  //   setQuestion(e.target.value);
  //   onSqQuestionChange(e.target.value);
  //   console.log("sqQuestion: " + e.target.value);
  // };


return (
  <div>
    <input type="text" placeholder='질문을 입력하세요'
      className="InsertQ" onChange={(e) =>  handleAddQ(e, data, 'sqQuestion')} 
     />   
<hr className='Qhr'/> 


     </div>

);
  }

export default Question ;
