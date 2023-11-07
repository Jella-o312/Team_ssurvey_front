  import ButtonGroup from 'react-bootstrap/ButtonGroup';
  import './InsertBtn.css';
import { useState } from 'react';
import CreateQ from './CreateQ';
  
  function InsertBtn({surveyCategory}) {


  console.log('surveyCategory:', surveyCategory);

  const deleteQuestionContainer = (index) => {
    console.log("인  : "  + index);   
    if (index >= 0) {
      const updatedComponents = [...createQComponents]; // createQComponents 배열 복사
      // index에 해당하는 요소 삭제 (1개만 삭제하도록 설정)
      updatedComponents.splice(1, 1);
      console.log(updatedComponents)
      // setCreateQComponents에 업데이트된 배열을 설정
      setCreateQComponents([...updatedComponents]);
    }
  };
  
  const [createQComponents, setCreateQComponents] = useState([<CreateQ k={0}  deleteQuestionContainer={deleteQuestionContainer} />]);
  //delete함수 구현 후 보내줘야함(순서 중요)                               // ↑↑↑  k로 적혀있던거 key로 바꿈
  
 // "➕" 버튼을 클릭할 때 CreateQ 컴포넌트 추가
 const addCreateQComponent = () => {
  let k = createQComponents.length
  console.log(k);
  setCreateQComponents([
    ...createQComponents,
    <CreateQ k={k} deleteQuestionContainer={deleteQuestionContainer} surveyCategory={selectedCategory}/>,
          // ↑↑↑  k로 적혀있던거 key로 바꿈
  ]);
  console.log(createQComponents);
  console.log("➕ 버튼 클릭");
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
      {createQComponents}
      </div>
      <ButtonGroup vertical className='Insert-btn-group'>       
        <button id="Insert-btn" className="Insert-btn" onClick={addCreateQComponent} >➕</button>
        <button id="write-btn" className="Insert-write-btn" onClick={handleWriteButtonClick}>✏️</button>
        <button id="addImage-btn" className="addImage-btn" onClick={handleAddImageButtonClick }>📷</button>
        <button id="addVideo-btn" className="addVideo-btn" onClick={handleAddVideoButtonClick}>🎥</button>       
      </ButtonGroup>
    </div>
      </>
    );
  }
  
  
  export default InsertBtn;