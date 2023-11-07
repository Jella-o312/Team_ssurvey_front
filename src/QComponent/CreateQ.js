import Qtype from "./Qtype";
import Question from "./Question";
import './CreateQ.css';
import { useState } from "react";
import ImageModal from "./ImageModal";
import LongText from "./LongText";
import ShortText from "./ShortText";
import SingleCheck from "./SingleCheck";
import MultiCheck from "./MultiCheck";


const CreateQ = ({ k , deleteQuestionContainer, surveyCategory} ) => {

 const [selectedType, setSelectedType] = useState(null);
 const [modalShow, setModalShow] = useState(false); // 모달의 show 상태를 관리할 상태 변수
//  const [selectedCategory, setSelectedCategory] = useState('');



 const handleCategorySelect = (surveyCategory) => {
   
   setSelectedCategory(surveyCategory); 
   console.log('surveyCategory:', surveyCategory);
   
 };



 console.log("타입 : " + selectedType);
  
return (
  <>
   

<div className="QuestionList">
   <div className="QuestionContainer" key={k}>  

<button type="button" className="deleteQ" onClick={() => deleteQuestionContainer(k)}>✖️</button>
  <div className="questionContainer">
  <Question />
  <button variant="primary" onClick={() => setModalShow(true)} className="AddImage">
  📷
      </button>
  <ImageModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        />
 
  <Qtype selectedType={selectedType} setSelectedType={setSelectedType} onCategorySelect={handleCategorySelect} surveyCategory={surveyCategory}/>
  </div>  
   
  <div className='AList'>
  {selectedCategory ===  'Fun' ? (             
              <>
                <SingleCheck selectedType={selectedType} /> 
                <ShortText selectedType={selectedType} />
              </>
            ) : (            
              <>
                <MultiCheck selectedType={selectedType} />
                <LongText selectedType={selectedType} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateQ;