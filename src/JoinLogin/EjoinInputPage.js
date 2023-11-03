import { useState } from 'react';
import './EmailJoin.css';
import { JoinAddressCity, JoinAddressTown } from '../joinFolder/JoinAddress';
import axios from 'axios';

const EjoinInputPage = ()=>{
  
  // 유저 정보 입력됨
  const [ejoinUser, setEjoinUser] = useState({
    userName : '',
    userEmail : '',
    userPassword : '',
    userAge : '',
    userGender : '',
    userLocation : '',  
    userJob : ''
  });

  
  
  // ⭐회원가입 정규식 객체⭐'^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
  const regexBox = {
    Name: /^[a-zA-Z가-힣]{2,10}$/, // 이름: 2글자 ~ 10글자 내 
    Email: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // 이메일 : 5글자 이상으로 조합되어야함
    Password: /^(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,20}$/, // 비밀번호: 영문, 숫자 조합 8글자~20글자 내
  };

  
  
  // ⭐앞에 정규식 3개에 대한 상태 + null 값이 아니면 true로 되는 Age~Job ⭐
  //  boolean형태로 값이 반환될 예정이지만, 첫 화면에서는 정규식 답변이 뜨면 안되기 때문에 ''값으로 넣음
  const [isRegexs, setIsRegexs] = useState({
    RName : '',
    REmail :'',
    RPassword :'',
    RckeckPassword : '',  // 비밀번호 중복 체크 여부
    RAge : '',
    RGender : '',
    RLocation : '',
    RJob : ''
  });
  
  // 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩임시 추가

  const handleSendUserInfo = (e) =>{
    axios.post(`${process.env.REACT_APP_SERVER_URL}/test/ejoinUserInfo`,  // 스프링에서 url로 보낼 수 있게 해놨기 때문에 받을 수 있음
      ejoinUser, // 스프링에서 받겠다고한 User형식으로 보내줘야함
    
      {
        params : { // 스프링에서 받겠다고한 파라미터 형식도 보내줌
          "msg" : "이메일 회원가입 유저 정보"
        }
      }

    )
  }


  

  // ⭐ 회원가입 버튼 활성화를 위한 함수 ⭐ 
  //isRegexs안에 있는 값이 한개라도 false면 flase로 저장되고, 전체가 true일때만 true가됨 
  const joinAllTrue = Object.values(isRegexs).every(Boolean); // true, false 타입으로 도출됨
  
  


  const handleCheckPw = (e)=>{  // 비번 일치 여부 확인 메서드
    if(ejoinUser.userPassword === e.target.value){
      setIsRegexs({...isRegexs, RckeckPassword : true});
    }else{
      setIsRegexs({...isRegexs, RckeckPassword : false})
    }
  } 
  


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
  
  
  // JoinAdress.js에서 가져옴
  // JoinAddressCity; // 시·도 목록
  // JoinAddressTown;   // 군·구 목록
 
  // 시, 구 를 합쳐야 하기 때문에 일단
  const [eLocation, setELocation] = useState({
    City : '',
    Town : ''
  })
 

  // 직업
  const joinJobList = ['자영업', '근로자', '프리랜서', '학생', '주부', '무직', '기타'];



//⭐⭐ 값 입력할때마다 user 정보객체와 정규식 결과 객체에 저장 ⭐⭐
const handleSetUser = (e)=>{
  let eDataset = e.target.dataset.field; // 데이터셋 값 뽑아옴
  let eValue = e.target.value; // 해당 타겟 값 뽑아옴
  let eRegex = regexBox[eDataset];  // 데이터셋 값에 맞는 정규식 뽑아옴
  
  // 유저 정보 객체에 넣음 (바꿀때마다 갱신)
  
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

  }else{ // Town 을 제외한 모든 정보들은 바로 갱신됨    
    setEjoinUser({...ejoinUser, [`user${eDataset}`] : eValue})  

    // 정규식 결과 객체에 담는 과정
    if(eDataset === 'Name' || eDataset === 'Email' || eDataset === 'Password'){ // 데이터셋 값이 정규식을 거쳐야 하는 값들이라면

      if(eRegex.test(eValue)){
          setIsRegexs({...isRegexs, [`R${eDataset}`] : true}) //원래 정규식 객체 안에 있는 key 값이 RName, REmail과 같음
        }else{
          setIsRegexs({...isRegexs, [`R${eDataset}`] : false})
      }
    
    }else{  // 지역을 제외한 정보들은 null이 아닐때만 정규식 확인 객체에 넣을거임 (지역은 town값 기준으로 위에서 처리)
      if(eValue !== '' && eValue !== 'none' && eValue !== null){
        setIsRegexs({...isRegexs, [`R${eDataset}`] : true})
      }else{
        setIsRegexs({...isRegexs, [`R${eDataset}`] : false})
      } 
    }  

  }

}

  console.log(ejoinUser);
  console.log(isRegexs);

  return(
    <div>
          <div className="ejoin-container" >
            <h2>회원가입</h2>
            
            <div className='ejoin-box'>

              <div className='ejoin-form'>
                <div className='ejoin-form-inner type2'>
                  <span className='ejoin-form-title'>이름</span>
                  <input id='join-name-input' type="text" placeholder="이름을 입력해주세요" 
                    data-field="Name"
                    onChange={handleSetUser}  
                  />
                   {isRegexs.RName === false ? <p className="join_input_regexTxt">*2글자 이상 입력해주세요</p> : null}
                </div>




                <div className='ejoin-form-inner type2'>
                  <span className='ejoin-form-title'>아이디(이메일)</span>
                  <div className='type1'>
                    <input id='join-email-input' type="text" placeholder="이메일을 입력해주세요" 
                      data-field="Email"
                      onChange={handleSetUser}  
                    />
                    <button className='join-email-check'>중복확인</button>
                  </div>
                  {isRegexs.REmail === false ? <p className="join_input_regexTxt">*올바른 이메일을 적어주세요</p> : null}
                </div>


                <div className='ejoin-form-inner type2'>
                  <span className='ejoin-form-title'>비밀번호</span>
                  <input id='join-pass-input' type="password" placeholder="영문+숫자 조합 8자 이상 입력해주세요"
                     data-field="Password"
                     onChange={handleSetUser}  
                  />

                  {isRegexs.RPassword === false ? <p className="join_input_regexTxt">*영문 혹은 영문+숫자 조합 8자 이상 입력해주세요</p> : null}
                </div>

                <div className='ejoin-form-inner type2'>
                  <span className='ejoin-form-title'>비밀번호 재확인</span>
                  <input id='join-pass-check' type="password" placeholder="비밀번호를 한번 더 입력해주세요" onChange={handleCheckPw}/>
                  {isRegexs.RckeckPassword === false ? <p className="join_input_regexTxt">*비밀번호가 일치하지 않습니다</p> : null} 
                </div>


                <div className='ejoin-form-inner'>
                    <div className='type3'>
                      <span className='ejoin-form-title'>나이</span>
                        {/* 1940~2023년도 */}
                          <select className='ejoin-year'onChange={handleSetUser}  data-field="Age">                    
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
                          value='1' data-field="Gender" onClick={handleSetUser}>남자</button>
                        <button className={`gender-w ${ejoinUser.userGender === '2'  &&  'genderClick' }`}
                          value='2' data-field="Gender" onClick={handleSetUser}>여자</button>     
                      </div>
                    </div>
                </div>
                

                {/* 지역정보 선택창 */}
                <div className='ejoin-form-inner type2'>
                    <span className='ejoin-form-title'>지역정보</span>
                    <div className='type1'>
                      <div className='type3'>
                        <select id='ejoin-location1' onChange={handleSetUser} data-field="City">
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
                      <select id='ejoin-location2' onChange={handleSetUser} data-field="Town">
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

                    {isRegexs.RLocation === false ? <p className="join_input_regexTxt">*출생년도를 선택해주세요</p> : null} 
                </div>  


                <div className='ejoin-form-inner type2'>
                  <span className='ejoin-form-title'>직업</span>
                    <select onChange={handleSetUser} data-field="Job">
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

              {/* 🔴🔴🔴 회원가입 버튼 눌렀을때 스프링부트에 값 보내도록 작업 🔴🔴🔴*/}
              <div className='ejoin-confirm'>
                <button className={`ejoin-confirm-button ${joinAllTrue ? '' : 'disabled'}`}
                  disabled={!joinAllTrue}
                  onClick={handleSendUserInfo}
                >회원가입</button>  
              </div>
            </div>

          </div>
    </div>
  );
}

export default EjoinInputPage;
