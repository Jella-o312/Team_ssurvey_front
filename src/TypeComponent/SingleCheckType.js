import { useEffect, useState } from "react";
import './SingleCheckType.css';
import axios from 'axios';
import { none } from "./Typefolder/TypeValue";
import axiosInstance from "../axioslnstance";

function SingleCheckType({ selectedType }) {

  const [survey, setSurvey] = useState([]);

  //설문유형
  const QusetionType = ["ShortText", "SingleCheck", "MultiCheck", "LongText"]

// 설문유형에 대한 핸들러
const HandleQtype = (e)=>{
  let eQTDataset = e.target.sTitle.field; // 데이터셋 값 뽑아옴
  let eQTValue = e.target.value; // 해당 타겟 값 뽑아옴

  // setEjoinUser({...ejoinUser, [`user${ eQTDataset}`] : eQTValue}) 

  // 지역을 제외한 정보들은 null이 아닐때만 정규식 확인 객체에 넣음
  // if(eQTValue !== '' && eQTValue !== 'none' && eQTValue !== null){
  //   setIsRegexs({...isRegexs, [`R${ eQTDataset}`] : true})
  // }else{
  //   setIsRegexs({...isRegexs, [`R${ eQTDataset}`] : false})
  // } 
}  

  useEffect(() => {
    axiosInstance.get('/survey')
      .then((response) => {
        setSurvey(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('설문 정보를 가져오는 중 오류 발생:', error);
      });
  }, []);

  return (
    <div className="addCheck">
      <h1>{survey.sTitle}</h1>
      <div className="questions-container">
        <select onChange={HandleQtype} data-field="Type">
          <option value="none">설문유형</option>
          {
            none.map((type) => {
              return (
                <option value={type} key={type}>{type}</option>
              );
            })
          }
        </select>
      </div>
    </div>
  );
}

export default SingleCheckType;
