import Qtype from "./Qtype";
import Question from "./Question";
import './CreateQ.css';
import { useState } from "react";
import ImageModal from "./ImageModal";
import LongText from "./LongText";
import ShortText from "./ShortText";
import SingleCheck from "./SingleCheck";
import MultiCheck from "./MultiCheck";


const CreateQ = ({ k , deleteQuestionContainer, handleTypeSelect, sqQuestion, onSqQuestionChange} ) => {

 const [selectedType, setSelectedType] = useState(null);
 const [modalShow, setModalShow] = useState(false); // 모달의 show 상태를 관리할 상태 변수
//  const [selectedCategory, setSelectedCategory] = useState('');


const handleOptionSelect = (type) => {
  setSelectedType(type); // Set the selected type
  // You can perform additional actions based on the selected type here
  handleTypeSelect(type);
  console.log("타입선택 : " + type)
 
};



  
return (
  <>
   

<div className="QuestionList">
   <div className="QuestionContainer" key={k}>  

<button type="button" className="deleteQ" onClick={() => deleteQuestionContainer()}>✖️</button>
  <div className="questionContainer">
  <Question sqQuestion={sqQuestion} onSqQuestionChange={onSqQuestionChange}/>
  <button variant="primary" onClick={() => setModalShow(true)} className="AddImage">
  📷
      </button>
  <ImageModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        />
 
  <Qtype selectedType={selectedType} setSelectedType={setSelectedType} handleTypeSelect={handleTypeSelect} handleOptionSelect={handleOptionSelect} />
  </div>  
   
  <div className='AList'>             
          {selectedType === '객관식' && <SingleCheck selectedType={selectedType}  />}
          {selectedType === '다중 체크' && <MultiCheck selectedType={selectedType}  />}
          {selectedType === '단답형' && <ShortText selectedType={selectedType}  />}
          {selectedType === '장문형' && <LongText selectedType={selectedType} />}
        </div>
        </div>
      </div>
    </>
  );
};

export default CreateQ;