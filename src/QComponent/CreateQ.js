import Qtype from "./Qtype";
import Question from "./Question";
import './CreateQ.css';
import { useState } from "react";
import ImageModal from "./ImageModal";
import LongText from "./LongText";
import ShortText from "./ShortText";
import SingleCheck from "./SingleCheck";
import MultiCheck from "./MultiCheck";


<<<<<<< HEAD
const CreateQ = ({ k, deleteQuestionContainer }) => {
=======
const CreateQ = ({ data , handleAddQ, surveyList, setSurveyList, deleteQuestionContainer, type} ) => {
>>>>>>> 075aaad4ed83d01087553fddc24e701f783f6646

   const [selectedType, setSelectedType] = useState(null);
   const [modalShow, setModalShow] = useState(false); // 모달의 show 상태를 관리할 상태 변수


<<<<<<< HEAD

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

                  <Qtype selectedType={selectedType} setSelectedType={setSelectedType} />
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

=======

// const handleOptionSelect = (type) => {
//   setSelectedType(type); 
//   // console.log("타입선택 : " + type)
// };



  
return (
  <>
   

<div className="QuestionList">
   <div className="QuestionContainer" key={data.id}>  

<button type="button" className="deleteQ" onClick={()=>deleteQuestionContainer(data.id)} >✖️</button> {/*🟡🟡여기에 삭제 핸들러 넣기*/}
  <div className="questionContainer">
  <Question data={data} surveyList={surveyList} setSurveyList={setSurveyList} handleAddQ={handleAddQ}/>
  <button variant="primary" onClick={() => setModalShow(true)} className="AddImage">
  📷
      </button>
  <ImageModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        />
 
  <Qtype data={data} surveyList={surveyList} setSurveyList={setSurveyList} handleAddQ={handleAddQ} type={type}/> {/* handleOptionSelect={handleOptionSelect}*/}
  </div>  
   
  <div className='AList'>             
          {data.sqType === '객관식' && <SingleCheck selectedType={data.sqType}   data={data} handleAddQ = {handleAddQ}/>}
          {data.sqType === '다중 체크' && <MultiCheck selectedType={data.sqType} data={data} handleAddQ = {handleAddQ} />}
          {data.sqType === '단답형' && <ShortText selectedType={data.sqType}  data={data} handleAddQ = {handleAddQ}/>}
          {data.sqType === '장문형' && <LongText selectedType={data.sqType} data={data} handleAddQ = {handleAddQ}/>}
        </div>
        </div>
      </div>
    </>
  );
};
>>>>>>> 075aaad4ed83d01087553fddc24e701f783f6646

export default CreateQ;