import './SurveyQ.css';
import InsertBtn from "../QComponent/InsertBtn";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const SurveyQ = () => {
const { useState, useEffect } = require("react");
const navigate = useNavigate();  



const [sTitle, setSTitle] = useState('');
const [swriter, setSwriter] = useState('');
const [sQType, setSQType] = useState([]); 
const [sqQuestion, setSqQuestion] = useState([]); // 질문 목록을 배열로 관리
const [sOption, setSOption] = useState([]); 
const [selectedCategory, setSelectedCategory] = useState('');

const handleSqQuestionChange = (newSqQuestion) => {
  setSqQuestion(newSqQuestion);
};



const handleTypeSelect = (selectedType) => {
  let TypeValue;
  let category;

  switch (selectedType) {
    case '객관식':
      TypeValue = 1;
      category = 'Fun';
      break;
    case '단답형':
      TypeValue  = 2;
      category = 'Fun';
      break;
    case '다중체크':
      TypeValue  = 3;
      category = 'Survey';
      break;
    case '장문형':
      TypeValue  = 4;
      category = 'Survey';
      break;
   
  }

  setSQType(TypeValue );
  setSelectedCategory(category);
};



const [SurveyQ, setSurveyQ] = useState({
  sTitle : '',
  surveyCategory : '', 
  swriter : '',
});

const [CreateQ, setCreateQ] = useState({
  sqQuestion : '',
  sqType : '',
  sOption : '',
});

const surveyQAllTrue = Object.values(SurveyQ).every(Boolean); 


const handleKeyDown = (event) => {
  if (event.key === 'Enter') {
   setStitleWrapVisible(false);
  }
  console.log("stitle: " + sTitle);
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
  
  useEffect(() => {
    console.log(sTitle);
  }, [sTitle]);


 
  const handleSTitleClick = () => {
    setStitleWrapVisible(true);
    setSTitle('');
  };
  
  // handleQuestionTitleClick 함수는 questionTitle 입력란을 클릭할 때 호출되며
  // 이 함수에서 setStitleWrapVisible(true)을 호출하여 StitleWrap을 다시 표시하고
  // setQuestionTitle('')을 사용하여 questionTitle을 지움

  // 이렇게 하면 questionTitle을 다시 클릭할 때 StitleWrap이 다시 보이고 questionTitle의 내용이 지워짐


  const handleDeleteStitle = () => {
    setSTitle('');    
  };
  

  const changeValue = (e) => {
    // setSTitle({
    //   ...sTitle,
    //   [e.target.name]:e.target.value
    // });
    setSTitle(e.target.value); // Stitle 상태를 입력한 값으로 업데이트
    console.log("stitle: " + sTitle);
  }
  

  const addQuestion = () => {
    setSqQuestion([...sqQuestion, '']);
  };


   const CompleteS= () =>{
    const SurveyQ = {
      sTitle: sTitle,
      surveyCategory: selectedCategory,
      swriter: swriter,
      sqQuestion: sqQuestion,
      sOption: sOption
    };

    console.log('surveyCategory:', selectedCategory);
    console.log('SQType:', sQType);
    console.log('sOption:', sOption);
    console.log('sTitle:', sTitle);
    console.log('sqQuestion:', sqQuestion);

    axios.post(`${process.env.REACT_APP_SERVER_URL}/SurveyQ`, SurveyQ)
    .then(response=>{
      alert("✏️ 설문생성이 완료되었어요 ");
      navigate('/'); 
    }).catch(error=>{
      console.log(error);
      alert("완료되지 않은 질문이 있어요🙅");  
    })
  }


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
   <input className="SurTitle" placeholder="l 설문제목을 입력하세요" onKeyDown={handleKeyDown} value={sTitle} id="title" name={sTitle}
  onChange={changeValue} 
   ></input>
   <button type="button" className="Qdelete-btn"
    onClick={handleDeleteStitle} 
    > X </button>
   </div>

  </div>

  <div className="submitQ">
    <div className="createText">
      <p className="CreateS">CREATE<br/>
      A SURVEY</p>
      <button type="submit" className={`Qsumit-btn ${surveyQAllTrue ? '' : 'disabled'}`}  onClick={CompleteS} > 설문 생성 </button>   
    </div>
  </div>
</div>


<div className="QGroupBox">
<div className="QGroup">
<div className="InsertBtnContainer">

  <InsertBtn onClick={addQuestion} handleTypeSelect={handleTypeSelect} sqQuestion={sqQuestion} onSqQuestionChange={handleSqQuestionChange} setSOption={setSOption}/>
  </div>
   </div>
</div>


</>

  );
  };

  export default SurveyQ;

