import './Answer.css';
import AnswerForm from "../AComponent/AnswerForm";
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Axios } from 'axios';




const Answer = ({SurveyQ, setSurveyQ}) => {
  const navigate = useNavigate();  
  const [sTitle, setSTitle] = useState('');

  const CompleteA = () => {
    // 원하는 작업 수행
     alert("✏️ 설문제출이 완료되었어요 ");
     navigate('/Home')
   };



useEffect(()=>{
Axios.post("/api/users").then((response)=>{
if(response.data){
  console.log(response.data);
  setSurveyQ(response.data);
}else{
  alert("failed to ");
}

});

},[]);



  return(
<>
<div className="QHeader">
  <div className="Abox">
  <div className="questionQ">
   <p>Q.</p>
   <p className="SQTitle"
    value="sTitle" 
   >{SurveyQ.sTitle}</p>

     </div>
   </div>
 
  <div className="submitA">
    <div className="createText">
      <p className="CreateS">SUBMIT<br/>
      A SURVEY</p>
      <button type="submit" className="Asumit-btn" onClick={CompleteA}> 답변 제출 </button>
    </div>
  </div>
</div>


<AnswerForm />

</>

  );
  };

  export default Answer;

