import './SurveyQ.css';
import InsertBtn from "../QComponent/InsertBtn";
import { useNavigate } from "react-router-dom";





const SurveyQ = () => {
const { useState, useEffect } = require("react");
const navigate = useNavigate();  



const handleKeyDown = (event) => {
  if (event.key === 'Enter') {
    // dispatch(setSTitle(event.target.value)); // Redux 스토어에 sTitle을 업데이트(지금 오류원인임)
    setStitleWrapVisible(false);
  }
};


  // const SurveyQ = useContext(QContext);

  // const [createQComponents, setCreateQComponents] = useState([]);


  // // "추가" 버튼을 클릭할 때마다 CreateQ 컴포넌트를 추가
  // const addCreateQComponent = () => {
  //   // CreateQ 컴포넌트 배열에 새로운 항목을 추가
  //   setCreateQComponents((prevComponents) => [
  //     ...prevComponents,
  //     <CreateQ key={prevComponents.length} />,
  //   ]);
  // };

  const [isStitleWrapVisible, setStitleWrapVisible] = useState(true);
  const [sTitle, setSTitle] = useState(''); // State to hold the Stitle value


  
  useEffect(() => {
    console.log(sTitle); // 이 위치에서 console.log를 호출
  }, [sTitle]);


 
  const handleSTitleClick = () => {
    setStitleWrapVisible(true);
    setSTitle(''); // Clear the questionTitle
  };
  
  // handleQuestionTitleClick 함수는 questionTitle 입력란을 클릭할 때 호출되며
  // 이 함수에서 setStitleWrapVisible(true)을 호출하여 StitleWrap을 다시 표시하고
  // setQuestionTitle('')을 사용하여 questionTitle을 지움

  // 이렇게 하면 questionTitle을 다시 클릭할 때 StitleWrap이 다시 보이고 questionTitle의 내용이 지워짐


  const handleDeleteStitle = () => {
    setSTitle(''); 
   
  };

  

  const CompleteS = () => {
    // 원하는 작업 수행
     alert("✏️ 설문생성이 완료되었어요 ");
     navigate('/Home')
   };


   //에이젝스로 정보보내기

  return(
<>
<div className="QHeader">
  <div className="Qbox">
  <div className="questionQ">
   <p>Q.</p>
   <input className="STitle"
    defaultValue={sTitle}   
    onClick={handleSTitleClick} 
   ></input>
    
   </div>
   <div className="StitleWrap" style={{ display: isStitleWrapVisible ? 'block' : 'none' }}>
   <input className="SurTitle" placeholder="l 설문제목을 입력하세요" onKeyDown={handleKeyDown}  value={sTitle}
   onChange={(e) => setSTitle(e.target.value)} 
   ></input>
   <button type="button" className="Qdelete-btn"
    onClick={handleDeleteStitle} // Handle the click on Qdelete-btn
    > X </button>
   </div>

  </div>

  <div className="submitQ">
    <div className="createText">
      <p className="CreateS">CREATE<br/>
      A SURVEY</p>
      <button type="submit" className="Qsumit-btn"  onClick={CompleteS}> 설문 생성 </button>
    </div>
  </div>
</div>


<div className="QGroupBox">
<div className="QGroup">
<div className="InsertBtnContainer">
  <InsertBtn />
  </div>
   </div>
</div>


</>

  );
  };

  export default SurveyQ;
 




