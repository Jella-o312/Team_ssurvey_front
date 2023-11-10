import './FunQ.css';
import InsertBtn from "../QComponent/InsertBtn";
import { useNavigate } from "react-router-dom";
import SingleCheck from '../QComponent/SingleCheck';
import MultiCheck from '../QComponent/MultiCheck';
import Qtype from '../QComponent/Qtype';
import ImageModal from '../QComponent/ImageModal';
import Question from '../QComponent/Question';
import axiosInstance from '../axiosInstance';


const FunQ = ({ userInfo }) => {
  const { useState, useEffect } = require("react");
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  const [SurveyQ, setSurveyQ] = useState({
    surTitle: '',
    surveyCategory: 'Fun',
    swriter: userInfo.username
  });

  // 설문 질문 담는 리스트
  const [surveyList, setSurveyList] = useState([
    {
      id: 1,
      sqQuestion: '',
      sqType: '',
      option: []
    }
  ]);


 
  const resultAll=()=> {
    if (surveyList.sqQuestion === '' || surveyList.sqType=== '') {
      return false;
    }
    return true;
  };




  // 설문 타이틀 엔터치면 보여지는 기능
  const handleKeyDown = (event) => {
    setSurveyQ({ ...SurveyQ, surTitle: event.target.value });
    if (event.key === 'Enter') {
      setStitleWrapVisible(false);
    }
  };
  // 설문 타이틀 엔터치면 보여지는 기능 (false일때 입력창이 안보임)
  const [isStitleWrapVisible, setStitleWrapVisible] = useState(true);
  // 설문 타이틀 클릭하면 다시 입력창 보임
  const handleSTitleClick = () => {
    setStitleWrapVisible(true);
    setSurveyQ({ ...SurveyQ, surTitle: '' });
  };
  // handleQuestionTitleClick 함수는 questionTitle 입력란을 클릭할 때 호출되며
  // 이 함수에서 setStitleWrapVisible(true)을 호출하여 StitleWrap을 다시 표시하고
  // setQuestionTitle('')을 사용하여 questionTitle을 지움

  // 이렇게 하면 questionTitle을 다시 클릭할 때 StitleWrap이 다시 보이고 questionTitle의 내용이 지워짐

  // 설문 타이틀 입력창에 있는 x버튼 클릭 시 안에 질문 지워짐
  const handleDeleteStitle = () => {
    setSurveyQ({ ...SurveyQ, surTitle: '' });
  };


  // 값 바뀔때마다 설문 타이틀이 surveyQ 안에 있는 sTitle에 업데이트됨
  const changeValue = (e) => {
    setSurveyQ({ ...SurveyQ, surTitle: e.target.value });
    setSurveyList([{...surveyList, sqQuestion: e.target.value }])
  }



  // 추가, 업데이트
  const handleAddQ = (e, data, type) => {


    const value = e.target.value;


    // 업데이트
    const updatedSurveyList = () => {


        if(type === 'sqQuestion'){  // 설문 질문 바뀔때만
          return {...surveyList, 'sqQuestion': value};
        }

        if(type === "객관식"  ||type === "다중 체크") {// 타입일때만
          return {...surveyList, 'sqType': type, 'option' : []};

        }else{
          return {...surveyList, 'option' : type};   
        }

    
    };



    // 수정된 배열로 상태를 업데이트
    setSurveyList(updatedSurveyList);
  }


  const CompleteS = () => {

    if((SurveyQ.surTitle !== '')  && resultAll) {
      //  다 입력했을때 서버에 보냄
      axiosInstance.post(`/addSurvey`,surveyList, {params : {"surTitle" : SurveyQ.surTitle, "surveyCategory" : SurveyQ.surveyCategory, "username" : userInfo.username}})
        .then(response => {
          alert(response.data);
          navigate('/');
        }).catch(error => {
          console.log(error);
          alert("서버 연결 오류...");
        })
      // alert("설문완료 😘");

    } else {
      alert("완료되지 않은 질문이 있어요🙅");
    }
  }

  // function deleteQuestionContainer(index) {   
  //   if (surveyList.length > 1) {
  //     setSurveyList( surveyList.filter(data => data.id !== index))
  //   }
  // };



  console.log(surveyList);

// =================================

  return (
    <>
      <div className="QHeader">
        <div className="Qbox">

          <div className="questionQ">
            <p>Q.</p>
            <input className="STitle"
              defaultValue={SurveyQ.surTitle}
              onClick={handleSTitleClick}
            ></input>

          </div>
          <div className="StitleWrap" style={{ display: isStitleWrapVisible ? 'block' : 'none' }}>                            {/*🟡↓  얘 나중에 바꾸기*/}
            <input className="SurTitle" placeholder="| 설문제목을 입력하세요" onKeyDown={handleKeyDown} value={SurveyQ.surTitle} id="title" name={SurveyQ.surTitle}
              onChange={changeValue}
            ></input>
            <button type="button" className="Qdelete-btn"
              onClick={handleDeleteStitle}
            > X </button>
          </div>

        </div>

        <div className="submitQ">
          <div className="createText">
            <p className="CreateS">CREATE<br />
              A SURVEY</p>
            <button type="submit" className="Qsumit-btn" onClick={CompleteS} > 설문 생성 </button>
          </div>
        </div>
      </div>



   <div className="QuestionList">
      <div className="QuestionContainer" key={surveyList.id}>  
   
   {/* <button type="button" className="deleteQ" onClick={()=>deleteQuestionContainer(surveyList.id)} >✖️</button> */}
     <div className="questionContainer">
     <Question  surveyList={surveyList} setSurveyList={setSurveyList} handleAddQ={handleAddQ}/>
     <button variant="primary" onClick={() => setModalShow(true)} className="AddImage">
     📷
         </button>
     <ImageModal
           show={modalShow}
           onHide={() => setModalShow(false)}
           />
    
     <Qtype  data={surveyList} surveyList={surveyList} setSurveyList={setSurveyList} handleAddQ={handleAddQ} type={SurveyQ.surveyCategory}/> {/* handleOptionSelect={handleOptionSelect}*/}
     </div>  
      
     <div className='AList'>             
             {surveyList.sqType=== '객관식' && <SingleCheck selectedType={surveyList.sqType}  data={surveyList} handleAddQ = {handleAddQ} type={SurveyQ}/>}
             {surveyList.sqType=== '다중 체크' && <MultiCheck selectedType={surveyList.sqType} data={surveyList} handleAddQ = {handleAddQ} />}
           </div>
           </div>
         </div>
       </>
    

  );
};

export default FunQ;

