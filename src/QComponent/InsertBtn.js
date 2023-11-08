import ButtonGroup from 'react-bootstrap/ButtonGroup';
import './InsertBtn.css';
import { useState } from 'react';
import CreateQ from './CreateQ';



function InsertBtn({handleTypeSelect, sqQuestion, handleSqQuestionChange, onSqQuestionChange} ) {

  function deleteQuestionContainer(index) {   
    // console.log(index)
    // console.log(createQComponents)
    if (index > 0) {
      setCreateQComponents(createQComponents.filter((data) => data !== index))

      // const updatedComponents = createQComponents.filter((d, i) => i !== index)
      // console.log(createQComponents)
      // console.log('test')
      // console.log(updatedComponents)
      // // updatedComponents.splice(index, 1);
      // setCreateQComponents(updatedComponents);
  
    }
  };

  function test() {
    console.log(createQComponents);
  }
  
  
  const [createQComponents, setCreateQComponents] = useState([0]);
  //delete함수 구현 후 보내줘야함(순서 중요)                               
  

  console.log(createQComponents)


// "추가" 버튼을 클릭할 때 CreateQ 컴포넌트 추가
const addCreateQComponent = () => {
let k = createQComponents.length
setCreateQComponents([
  ...createQComponents,
  k
  // <CreateQ k={k} key={k} deleteQuestionContainer={deleteQuestionContainer}/>,
        // ↑↑↑  k로 적혀있던거 key로 바꿈
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
      createQComponents.map((k) => {
        return (
          <CreateQ key={k}  deleteQuestionContainer={() => deleteQuestionContainer(k)} handleTypeSelect={handleTypeSelect} sqQuestion={sqQuestion} onSqQuestionChange={onSqQuestionChange}/>
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