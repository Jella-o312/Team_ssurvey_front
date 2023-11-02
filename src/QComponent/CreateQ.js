import Qtype from "./Qtype";
import Question from "./Question";
import './CreateQ.css';
import { useState } from "react";
import ImageModal from "./ImageModal";
import LongText from "./LongText";
import ShortText from "./ShortText";
import SingleCheck from "./SingleCheck";
import MultiCheck from "./MultiCheck";


const CreateQ = ({ k , deleteQuestionContainer} ) => {

 const [selectedType, setSelectedType] = useState(null);
 const [modalShow, setModalShow] = useState(false); // 모달의 show 상태를 관리할 상태 변수


  
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
 
  <Qtype selectedType={selectedType} setSelectedType={setSelectedType}/>
  </div>  
   
  <div className='AList'>
     {/* Option 컴포넌트를 렌더링하고 selectedType을 전달 */}
     <MultiCheck selectedType={selectedType} />
     <LongText selectedType={selectedType} />
     <SingleCheck selectedType={selectedType} />
     <ShortText selectedType={selectedType} />
     </div>    
     </div>
     </div>

  </>
     );
     };


export default CreateQ;