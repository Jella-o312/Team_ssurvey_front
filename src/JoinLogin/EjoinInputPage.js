import { useState } from 'react';
import './EmailJoin.css';
import { JoinAddressCity, JoinAddressTown } from '../joinFolder/JoinAddress';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EjoinInputPage = ()=>{
  
  const navigator = useNavigate();

  // 유저 정보 입력됨
  const [ejoinUser, setEjoinUser] = useState({
    userRname : '',
    username : '',
    password : '',
    userAge : '',
    userGender : '',
    userLocation : '',  
    userJob : ''
  });

  
  
  // ⭐회원가입 정규식 객체⭐'^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
  const regexBox = {
    Rname: /^[a-zA-Z가-힣]{2,10}$/, // 이름: 2글자 ~ 10글자 내 
    name: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // 이메일 : 5글자 이상으로 조합되어야함
    password: /^(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,20}$/, // 비밀번호: 영문, 숫자 조합 8글자~20글자 내
  };

  
  
  // ⭐앞에 정규식 3개에 대한 상태 + null 값이 아니면 true로 되는 Age~Job ⭐
  //  boolean형태로 값이 반환될 예정이지만, 첫 화면에서는 정규식 답변이 뜨면 안되기 때문에 ''값으로 넣음
  const [isRegexs, setIsRegexs] = useState({
    RRname : '',
    Rname :'',
    Rpassword :'',
    RcheckPassword : '',  // 비밀번호 중복 체크 여부
    RAge : '',
    RGender : '',
    RLocation : '',
    RJob : ''
  });
  

  // ⭐ 회원가입 버튼 활성화를 위한 함수 ⭐ 
  //isRegexs안에 있는 값이 한개라도 false면 flase로 저장되고, 전체가 true일때만 true가됨 
  const joinAllTrue = Object.values(isRegexs).every(Boolean); // true, false 타입으로 도출됨
  

  // 비번 확인 input 값
  const [ckPassword, setCkPassword] = useState();

  // 비번 일치 여부 확인 메서드
  const handleCheckPw = (e)=>{  
    setCkPassword(e.target.value);
    
    if(ejoinUser.password === e.target.value){
      setIsRegexs({...isRegexs, RcheckPassword : true});
    }else{
      setIsRegexs({...isRegexs, RcheckPassword : false})
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
  

  // 이름, 아이디, 비밀번호에 대한 핸들러
  const handleNamePw = (e)=>{
    let eDataset = e.target.dataset.field; // 데이터셋 값 뽑아옴
    let eValue = e.target.value; // 해당 타겟 값 뽑아옴
    let regexResult = regexBox[eDataset].test(eValue); // 데이터셋 값에 맞는 정규식 뽑아오고, 정규식 돌린 뒤의 결과값
    
    if(eDataset === 'password'){
      setEjoinUser({...ejoinUser, 'password' : eValue})  
      
      if(regexResult && (eValue === ckPassword)) {
        setIsRegexs({...isRegexs, Rpassword : true, RcheckPassword : true})
      } else if(regexResult && (eValue !== ckPassword)) {
        setIsRegexs({...isRegexs, Rpassword : true, RcheckPassword : false})
      } else if(!regexResult && (eValue === ckPassword)) {
        setIsRegexs({...isRegexs, Rpassword : false, RcheckPassword : true})
      } else { 
        setIsRegexs({...isRegexs, Rpassword : false, RcheckPassword : false})
      }

      
    }else{
      setEjoinUser({...ejoinUser, [`user${eDataset}`] : eValue}) 

      if(regexResult){
        setIsRegexs({...isRegexs, [`R${eDataset}`] : true}) //원래 정규식 객체 안에 있는 key 값이 RName, REmail과 같음
      }else{
        setIsRegexs({...isRegexs, [`R${eDataset}`] : false})
      }
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
    axios.post(`${process.env.REACT_APP_SERVER_URL}/join`, ejoinUser)
    .then(response=>{
      navigator('/'); // 홈화면으로 이동
      alert(response.data); // 회원가입 성공 알림창 띄움 (나중에 빼도 될듯)
    }).catch(error=>{
      console.log(error);
      alert("😡문제발생😡");  
    })
  }

  console.log(ejoinUser.password);
  // console.log(ejoinUser);
  // console.log(isRegexs);

  return(
    <div>
          <div className="ejoin-container" >
            <h2>회원가입</h2>
            
            <div className='ejoin-box'>

              <div className='ejoin-form'>
                <div className='ejoin-form-inner type2'>
                  <span className='ejoin-form-title'>이름</span>
                  <input id='join-name-input' type="text" placeholder="이름을 입력해주세요" 
                    data-field="Rname"
                    onChange={handleNamePw}  
                  />
                   {isRegexs.RRname === false ? <p className="join_input_regexTxt">*2글자 이상 입력해주세요</p> : null}
                </div>




                <div className='ejoin-form-inner type2'>
                  <span className='ejoin-form-title'>아이디(이메일)</span>
                  <div className='type1'>
                    <input id='join-email-input' type="text" placeholder="이메일을 입력해주세요" 
                      data-field="name"
                      onChange={handleNamePw}  
                    />
                    <button className='join-email-check'>중복확인</button>
                  </div>
                  {isRegexs.Rname === false ? <p className="join_input_regexTxt">*올바른 이메일을 적어주세요</p> : null}
                </div>


                <div className='ejoin-form-inner type2'>
                  <span className='ejoin-form-title'>비밀번호</span>
                  <input id='join-pass-input' type="password" placeholder="영문+숫자 조합 8자 이상 입력해주세요"
                     data-field="password"
                     onChange={handleNamePw}  
                  />

                  {isRegexs.Rpassword === false ? <p className="join_input_regexTxt">*영문 혹은 영문+숫자 조합 8자 이상 입력해주세요</p> : null}
                </div>

                <div className='ejoin-form-inner type2'>
                  <span className='ejoin-form-title'>비밀번호 재확인</span>
                  <input id='join-pass-check' type="password" placeholder="비밀번호를 한번 더 입력해주세요" onChange={handleCheckPw}/>
                  {isRegexs.RcheckPassword === false ? <p className="join_input_regexTxt">*비밀번호가 일치하지 않습니다</p> : null} 
                </div>


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

                    {isRegexs.RLocation === false ? <p className="join_input_regexTxt">*출생년도를 선택해주세요</p> : null} 
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

              {/* 🟩 회원가입 버튼 눌렀을때 스프링부트에 값 보내도록 작업 🟩*/}
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