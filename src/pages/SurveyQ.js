import './SurveyQ.css';
import InsertBtn from "../QComponent/InsertBtn";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import axiosInstance from '../axiosInstance';


const SurveyQ = ({ userInfo }) => {
  const { useState, useEffect } = require("react");
  const navigate = useNavigate();


  const [SurveyQ, setSurveyQ] = useState({
    surTitle: '',
    surveyCategory: 'Survey',
    // user: userInfo 없어도 될듯
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



 
  // const resultAll = surveyList.map(item => {
  //   if (item.sqQuestion === '' || item.sqType === '') {
  //     return false;
  //   }
  //   return true;
  // });


  // 📣위에 코드 오류나서 아래 코드로 변경함 every는 boolean타입으로 반환함 (하나라도 false면 false로 반환 https://haenny.tistory.com/200)
  const isEmptySurveyList = surveyList.every(item => item.sqQuestion !== '' && item.sqType !== '');

  // 📣surveyList안에 있는 option 배열 길이가 0이면 false로 리턴됨 
  // 📣(아래 updatedSurveyList 핸들러에 단답, 장문형은 option에 'none' 글자 넣으라고 되어 있어서 배열길이 1으로 만듬)
  const isEmptyOption = surveyList.every(item => item.option.length !== 0); 



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
  }



  // 추가, 업데이트
  const handleAddQ = (e, data, type) => {

    const id = data.id;
    const value = e.target.value;


    // 업데이트
    const updatedSurveyList = surveyList.map(item => {
      if (item.id === id) {

        if(type === 'sqQuestion'){  // 설문 질문 바뀔때만
          return {...item, 'sqQuestion': value};
        }

        if(type === "객관식" ||type === "다중 체크"||type === "단답형" ||type === "장문형") {// 타입일때만
          if(type=== "단답형" || type === "장문형"){
            return {...item, 'sqType': type, 'option' : ["none"]};  
          }
          return {...item, 'sqType': type, 'option' : []};

        }else{  // 옵션값에 변동이 있을때 다시 저장하는 메서드
          return {...item, 'option' : type};   
        }
      }
      return item;
    });



    // 수정된 배열로 상태를 업데이트
    setSurveyList(updatedSurveyList);
  }
 



  const CompleteS = () => {

    if((SurveyQ.surTitle !== '')  && isEmptySurveyList && isEmptyOption) {
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

console.log(isEmptyOption);

// =================================

  return (
    <>
      <div className="QHeader">
        <div className="Qbox">
<div className='QWrap'>
          <div className="SquestionQ">
            <p>Q.</p>
            <input className="STitle"
              defaultValue={SurveyQ.surTitle}
              onClick={handleSTitleClick}
            ></input>

          </div>
          <div className="SStitleWrap" style={{ display: isStitleWrapVisible ? 'block' : 'none' }}>                            {/*🟡↓  얘 나중에 바꾸기*/}
            <input className="SurTitle" placeholder="| 설문제목을 입력하세요" onKeyDown={handleKeyDown} value={SurveyQ.surTitle} id="title" name={SurveyQ.surTitle}
              onChange={changeValue}
            ></input>
            <button type="button" className="Qdelete-btn"
              onClick={handleDeleteStitle}
              > X </button>
          </div>
              </div>

        </div>

        <div className="SsubmitQ">
          <div className="createText">
            <p className="CreateS">CREATE<br />
              A SURVEY</p>
            <button type="submit" className="Qsumit-btn" onClick={CompleteS} > 설문 생성 </button>
          </div>
        </div>
      </div>


      <div className="QGroupBox">
        <div className="QGroup">
          <div className="InsertBtnContainer">

            <InsertBtn handleAddQ={handleAddQ} surveyList={surveyList} setSurveyList={setSurveyList} type={SurveyQ.surveyCategory} />
          </div>
        </div>
      </div>


    </>

  );
};

export default SurveyQ;

