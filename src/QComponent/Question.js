import { useEffect, useRef, useState } from 'react';
import './Question.css';



const Question = ({ sqQuestion, onSqQuestionChange }) => {
 
  const [Question, setQuestion] = useState(sqQuestion);
  const inputRef = useRef();


  useEffect(() => {
    console.log({sqQuestion}); 
    setQuestion(sqQuestion); 
  }, [sqQuestion]);


  const handlesqQuestionChange = (e) => {
    setQuestion(e.target.value);
    onSqQuestionChange(e.target.value);
    console.log("sqQuestion: " + e.target.value);
  };


  
useEffect(() => {
  function handleClickOutside(event) {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      // Clicked outside the input field, save the value
    onSqQuestionChange(sqQuestion);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [Question,  onSqQuestionChange]);


return (
  <div>
    <input type="text" placeholder='질문을 입력하세요'
    name={sqQuestion} id="sqQuestion" onChange={handlesqQuestionChange}  ref={inputRef}
    className="InsertQ"
     />   
<hr className='Qhr'/> 


     </div>

);
  }

export default Question ;