import { useEffect, useState } from 'react';
import './Question.css';



const Question = ({sqQuestion, onsqQuestionChange}) => {
 
  const [Question, setQuestion] = useState((''));
 


  useEffect(() => {
    console.log({sqQuestion}); 
  }, [{sqQuestion}]);

const handlesqQuestionChange = (e) => {
  onsqQuestionChange(e.target.value);
  console.log("sqQuestion: " + sqQuestion);
};

  

return (
  <div>
    <input type="text" placeholder='질문을 입력하세요'
    value={sqQuestion} name={sqQuestion} id="sqQuestion" onsqQuestionChange={handlesqQuestionChange}
    className="InsertQ"
     />   
<hr className='Qhr'/> 


     </div>

);
  }

export default Question ;