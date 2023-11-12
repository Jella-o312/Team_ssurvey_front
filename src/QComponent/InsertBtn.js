import ButtonGroup from 'react-bootstrap/ButtonGroup';
import './InsertBtn.css';
import { useState } from 'react';
import CreateQ from './CreateQ';



function InsertBtn({handleAddQ, surveyList, setSurveyList, type} ) {

  const [Qnum, setQnum] = useState(1);  //Id 혹은 k값으로 생성하기 위해 만든 임의 변수 (설문생성 눌렀을때 다시 0으로 초기화 해줘야함)


  // 🟡🟡🟡(보류) 설문 한덩이 삭제 핸들러
  function deleteQuestionContainer(index) {   
    if (surveyList.length > 1) {
      setSurveyList( surveyList.filter(data => data.id !== index))
    }
  };



// "추가" 버튼을 클릭할 때 CreateQ 컴포넌트 추가
const addCreateQComponent = () => {
  let k = Qnum +1;
  setQnum(k);

  setSurveyList([
  ...surveyList,
  {
    id: k,
    sqQuestion: '',
    sqType: '',
    option: []
  }
]);


};



const handleWriteButtonClick = () => {
// 원하는 작업 수행
console.log("✏️ 버튼 클릭");
alert("🙅 준비 중이에요 🙅");
};


const handleAddImageButtonClick = () => {

console.log("📷 버튼 클릭");
alert("🙅 준비 중이에요 🙅");
};


const handleAddVideoButtonClick = () => {

console.log("🎥 버튼 클릭");
alert("🙅 준비 중이에요 🙅");
};


  return (
    <>
  <div className="QContainer">
  <div>      
    {
      surveyList.map((data) => {
        return (
          <CreateQ key={data.id} data={data}  handleAddQ={handleAddQ} surveyList={surveyList} setSurveyList={setSurveyList} deleteQuestionContainer={ deleteQuestionContainer} type={type} />
        );
      })
    }
    </div>
    <ButtonGroup vertical className='Insert-btn-group'>       
      <button id="Insert-btn" className="Insert-btn" onClick={addCreateQComponent}>➕</button>
      <button  id="Insert-write-btnn" className="Insert-write-btn" onClick={handleWriteButtonClick}>✏️</button>
      <button  id="addImage-btn" className="addImage-btn" onClick={handleAddImageButtonClick }>📷</button>
      <button  id="addVideo-btn" className="addVideo-btn" onClick={handleAddVideoButtonClick}>🎥</button>       
    </ButtonGroup>
  </div>
    </>
  );
}


export default InsertBtn;