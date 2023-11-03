  import ButtonGroup from 'react-bootstrap/ButtonGroup';
  import './InsertBtn.css';
import { useState } from 'react';
import CreateQ from './CreateQ';
  
  function InsertBtn() {


    const deleteQuestionContainer = (index) => {   
      if (index >= 0) {
      const updatedComponents = createQComponents.slice();
      updatedComponents.splice(index, 1);
      setCreateQComponents(updatedComponents);
      }
  };

    const [createQComponents, setCreateQComponents] = useState([<CreateQ key={0}  deleteQuestionContainer={deleteQuestionContainer}/>]);
//delete함수 구현 후 보내줘야함(순서 중요)                               // ↑↑↑  k로 적혀있던거 key로 바꿈
  


 // "추가" 버튼을 클릭할 때 CreateQ 컴포넌트 추가
 const addCreateQComponent = () => {
  let k = createQComponents.length
  setCreateQComponents([
    ...createQComponents,
    <CreateQ key={k} deleteQuestionContainer={deleteQuestionContainer}/>,
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
        <button id="Insert-btn" className="Insert-btn" onClick={addCreateQComponent}>➕</button>
        <button  id="write-btn" className="write-btn" onClick={handleWriteButtonClick}>✏️</button>
        <button  id="addImage-btn" className="addImage-btn" onClick={handleAddImageButtonClick }>📷</button>
        <button  id="addVideo-btn" className="addVideo-btn" onClick={handleAddVideoButtonClick}>🎥</button>       
      </ButtonGroup>
    </div>
      </>
    );
  }
  
  
  export default InsertBtn;