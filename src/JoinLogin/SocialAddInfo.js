import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { JoinAddressCity, JoinAddressTown } from "../joinFolder/JoinAddress";
import axios from "axios";
import axiosInstance from "../axiosInstance";

// 여기는 모든 소셜로그인 추가정보 입력하는 페이지임
const SocialAddInfo = ({setIsLogin})=>{

  const navigator = useNavigate();

  const location = useLocation(); // 소셜로그인 시도할때 서버에서 받아준 기본정보 navigator로 받아옴
  const [ejoinUser, setEjoinUser] = useState(location.state); // user 객체는 location.state안에 있음으로 해당 정보 userInfo에 넣어줌
  
  // userAge, userGender, userJob, userLocation 4개 값 추가정보로 받아줌

  const [isRegexs, setIsRegexs] = useState({
    RAge : '',
    RGender : '',
    RLocation : '',
    RJob : ''
  });

  // ⭐ 회원가입 버튼 활성화를 위한 함수 ⭐ 
  //isRegexs안에 있는 값이 한개라도 false면 flase로 저장되고, 전체가 true일때만 true가됨 
  const joinAllTrue = Object.values(isRegexs).every(Boolean); // true, false 타입으로 도출됨
  
  // 나이(출생년도) option값 리스트
  const yearOptions = () => {
    const options = [];
    for (let year = 2023; year >= 1940; year--) { // 최근순으로 보여주기 위해 -- 로 짬
      options.push(
        <option key={year} value={year}>
          {year}
        </option>
      );
    }
    return options;
  };

  // 시, 구 를 합쳐야 하기 때문에 일단
  const [eLocation, setELocation] = useState({
    City : '',
    Town : ''
  })
 

  // 직업
  const joinJobList = ['자영업', '근로자', '프리랜서', '학생', '주부', '무직', '기타'];

  //⭐⭐ 값 입력할때마다 user 정보객체와 정규식 결과 객체에 저장 ⭐⭐

  // 지역에 대한 핸들러
  const handleLocation = (e)=>{
    let eDataset = e.target.dataset.field; // 데이터셋 값 뽑아옴
    let eValue = e.target.value; // 해당 타겟 값 뽑아옴
    
    
    if(eDataset === 'Town'){ // 지역 정보에서 도(town)를 바꾼 경우만 다르게 저장 (시City)
      setELocation({...eLocation, Town : eValue}) // 임시 town에 저장
      setEjoinUser({...ejoinUser, userLocation : eLocation.City + '/' +  eValue})  // 시/도 형식으로 저장
      
      // 정규식 결과 객체에 담을때 toen location으로 담기고 city는 정규식 처리 안함
      if(eValue !== '' && eValue !== 'none' && eValue !== null){
        setIsRegexs({...isRegexs, RLocation : true}) // 
      }else{
        setIsRegexs({...isRegexs, RLocation : false}) 
      }
    
    }else if(eDataset === 'City'){
      setELocation({ City: eValue, Town: '' }); // 임시 지역 객체에 city 값 바뀌면 Town값 초기화 User정보에 넣는건 town이 바뀔때만 저장함
      setIsRegexs({...isRegexs, RLocation : false});  
    }
  }

  // 나이, 성별, 직업에 대한 핸들러
  const handleOtherInfo = (e)=>{
    let eDataset = e.target.dataset.field; // 데이터셋 값 뽑아옴
    let eValue = e.target.value; // 해당 타겟 값 뽑아옴

    setEjoinUser({...ejoinUser, [`user${eDataset}`] : eValue}) 

    // 지역을 제외한 정보들은 null이 아닐때만 정규식 확인 객체에 넣음
    if(eValue !== '' && eValue !== 'none' && eValue !== null){
      setIsRegexs({...isRegexs, [`R${eDataset}`] : true})
    }else{
      setIsRegexs({...isRegexs, [`R${eDataset}`] : false})
    } 
  }  


  // ✅✅ 회원가입정보 스프링부트에 보내주는 핸들러
  const handleSendUserInfo = () =>{
    axios.post(`${process.env.REACT_APP_SERVER_URL}/oauth/join`, ejoinUser)  //유저 정보 보내서 회원가입 및 로그인 처리되게
    .then(response=>{
      const jwt = response.headers.authorization;
      if(jwt){
        sessionStorage.setItem('jwt', jwt);
        setIsLogin(true);
        alert('로그인 성공');
        navigator('/'); // 홈화면으로 이동
      }
    }).catch(error=>{
      console.log(error);
      alert("😡로그인 실패😡");  
    })
  }

  console.log(ejoinUser);
  return(
    // 여기에 회원 추가 정보 페이지
    <>
      <div className="ejoin-container" >
        <h2>회원가입</h2>
        
        <div className='ejoin-box'>
          <div className='ejoin-form'>
            <div className='ejoin-form-inner'>
                <div className='type3'>
                  <span className='ejoin-form-title'>나이</span>
                    {/* 1940~2023년도 */}
                      <select className='ejoin-year'onChange={handleOtherInfo}  data-field="Age">                    
                        <option value="none">태어난 년도</option>  
                        {yearOptions()}
                      </select>
                      {isRegexs.RAge === false ? <p className="join_input_regexTxt">*출생년도를 선택해주세요</p> : null} 
                  </div>

                {/* 성별 */}
                <div className='type3'>
                  <span className='ejoin-form-title'>성별</span>
                  <div className='ejoin-gender-check'>
                    <button className={`gender-m ${ejoinUser.userGender === '1'  &&  'genderClick' }`} 
                      value='1' data-field="Gender" onClick={handleOtherInfo}>남자</button>
                    <button className={`gender-w ${ejoinUser.userGender === '2'  &&  'genderClick' }`}
                      value='2' data-field="Gender" onClick={handleOtherInfo}>여자</button>     
                  </div>
                </div>
            </div>
            
            {/* 지역정보 선택창 */}
            <div className='ejoin-form-inner type2'>
                <span className='ejoin-form-title'>지역정보</span>
                <div className='type1'>
                  <div className='type3'>
                    <select id='ejoin-location1' onChange={handleLocation} data-field="City">
                      <option value="none">시/도 선택</option>  
                        {// ↓ 다른 컴포넌트에서 가져옴
                          JoinAddressCity.map((city)=>{
                            return(
                              <option value={city} key={city}>{city}</option>
                            );
                          })
                        }
                    </select>
                  </div>

                  <div className='type3'>
                  <select id='ejoin-location2' onChange={handleLocation} data-field="Town">
                    <option value="none">구/군 선택</option>  
                      {// ↓ 다른 컴포넌트에서 가져옴
                        JoinAddressTown.find(town=> town.id === eLocation.City)?.town.map((town)=>{ // selectedCity(선택한 시) 값에 따라 JoinAddressTown 있는 군·구목록을 가져옴
                          return(
                            <option value={town} key={town}>{town}</option>
                            );
                          })
                        }
                  </select>
                  </div>
                </div>

                {isRegexs.RLocation === false ? <p className="join_input_regexTxt">*지역을 선택해주세요</p> : null} 
            </div>  
            <div className='ejoin-form-inner type2'>
              <span className='ejoin-form-title'>직업</span>
                <select onChange={handleOtherInfo} data-field="Job">
                  <option value="none">선택해주세요</option>  
                    {
                      joinJobList.map((job)=>{ // selectedCity(선택한 시) 값에 따라 JoinAddressTown 있는 군·구목록을 가져옴
                        return(
                          <option value={job} key={job}>{job}</option>
                        );
                      })
                    }
                </select>
                {isRegexs.RJob === false ? <p className="join_input_regexTxt">*직업을 선택해주세요</p> : null} 
            </div>
          </div>


          <div className='ejoin-confirm'>
            <button className={`ejoin-confirm-button ${joinAllTrue ? '' : 'disabled'}`}
              disabled={!joinAllTrue}
              onClick={handleSendUserInfo}
            >회원가입</button>  
          </div>
        </div>

      </div>
    </>
  );
}

export default SocialAddInfo;