import { useState } from 'react';
import './EmailJoin.css';
import { useEffect } from 'react';
import Terms1 from '../joinFolder/joinTerms/Terms1';
import Terms2 from '../joinFolder/joinTerms/terms2';
import Terms3 from '../joinFolder/joinTerms/Terms3';
import { JoinAddressCity, JoinAddressTown } from '../joinFolder/JoinAddress';


const EmailJoin = () =>{

  // 약관동의, 회원가입 입력페이지 나누는 스테이트 (true가 약관동의, false가 회원가입 입력)
  const [ejoinPage, setEjoinPage] = useState(false);

  const [AllChecked, setAllChecked] = useState(false);

  // 필수 체크만 확인하는 스테이트
  const [essentialChecked, setEssentialChecked] = useState(false);
  const [eachChecked, setEachChecked] = useState({
    check1: false,
    check2: false,
    check3: false
  });


  useEffect(() => {
    if (eachChecked.check1 && eachChecked.check2 && eachChecked.check3) {
      setAllChecked(true);
      setEssentialChecked(true);
    } else {
      setAllChecked(false);
    }

    if (eachChecked.check1 && eachChecked.check2){ // 필수체크항목만 다 채크됐을때
      setEssentialChecked(true);
    } else if(!eachChecked.check1 || !eachChecked.check2){ // 필수 항목 중 한개라도 체크가 안됐으면 false
      setEssentialChecked(false)
    }

  }, [eachChecked]);

  const handleAllCheckChange = () => {
    const newAllChecked = !AllChecked;
    setAllChecked(newAllChecked);
    setEssentialChecked(newAllChecked);

    const newEachChecked = {
      check1: newAllChecked,
      check2: newAllChecked,
      check3: newAllChecked
    };
    setEachChecked(newEachChecked);
  };

  // ????
  const handleEachCheckChange = (e) => {
    const { id, checked } = e.target;
    setEachChecked(data => ({
      ...data,
      [id]: checked
    }));
  };


 
  // 페이지 이동 ejoinPage 변경 함수
  const handleEjoinPage = () => {
    setEjoinPage(true); // setEjoinPage를 호출하여 상태 값을 변경
  }

  // ================================ 회원가입 입력 창

  const [ejoinUserInfo, setEjoinUserInfo] = useState({
    userName : '',
    userEmail : '',
    userPassword : '',
    userLocation : '',
    userGender : '',
    userJob : '',
    userAge : ''
  });


  
  

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

  // 나이(출생년도) 선택값
  const [selectedYear, setSelectedYear] = useState('');

  const handleYearChange = (e) =>{
    const newSelectYear = e.target.value;
    setSelectedYear(newSelectYear);
  }


 
  // 시·도 , 군·구
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedTown, setSelectedTown] = useState('');

  // JoinAdress.js에서 가져옴
  // JoinAddressCity; // 시·도 목록
  // JoinAddressTown;   // 군·구 목록

  // 시 선택 이벤트
  const handleCityChange = (e) =>{
    const newSelectCity = e.target.value;
    setSelectedCity(newSelectCity); // 선택한 '시'
  }

  // 구 선택 이벤트
  const handleTownChange = (e) =>{
    const newSelectTown = e.target.value;
    setSelectedTown(newSelectTown);
  }

  // 성별
  const [joinGender, setJoinGender] = useState('');

  const handleGenderChange = (e)=>{
    const newGender = e.target.value;
    setJoinGender(newGender);
  }

  // 직업
  const joinJobList = ['자영업', '근로자', '프리랜서', '학생', '주부', '무직', '기타'];
  const [selectedJob, setSelectedJob] = useState('');

  const handleJobChange = (e)=>{
    const newSelectJob = e.target.value;
    setSelectedJob(newSelectJob);
  }
  
  // console.log(selectedYear); // 나이 선택 확인
  // console.log('시 : ' + selectedCity + '  /  군 : ' + selectedTown); // 시, 군 선택 확인
  // console.log(selectedJob);
  console.log(joinGender);



  return(
    <div className='ejoin' >
  
      {/* ejoinPage가 false 일때만  회원가입 입력 페이지 보임 */}
      {ejoinPage ===false ? 
        (
          <div className="ejoin-container">
            <h2>이용약관</h2>

            <div className='ejoin-box'>

              <div className='ejoin-form'>
                
                {/* 체크박스 컨테이너*/}
                <div className="join-check-container">
         
                  {/* 전체 체크박스 */}
                  <div className="join-all-chaeck-box">
                    <input
                      type="checkbox"
                      value="true"
                      id="join-allCheck"
                      checked={AllChecked}
                      onChange={handleAllCheckChange}
                    />
                    <label className="join-all-label" htmlFor="join-allCheck">
                      <span className="checkbox-icon"><i className="fas fa-check fa-xs"></i></span>
                      <span className="all-check-label">전체동의</span>
                    </label>
                  </div>
                 
                  
                  {/* 개별 체크박스 */}
                  <div className="join-each-chaeck-box">
                    <div className="checkbox-each-group">
                      <input
                        type="checkbox"
                        value="true"
                        id="check1"
                        checked={eachChecked.check1}
                        onChange={handleEachCheckChange}           
                      />
                      <label className="join-each-label" htmlFor="check1">
                        <span className="checkbox-icon"><i className="fas fa-check fa-xs"></i></span>
                        <span className="join-each-check-label"><span style={{color: ' #628EF3'}}>(필수)</span> 만 14세 이상이며, 이용약관 동의</span>
                      </label>
                    </div>
                     
                     {/* ⭐이용약관 동의⭐ */}
                     <div className="termsBox">
                        <div className="terms-content">
                          <Terms1/>
                        </div>
                    </div>

                    <div className="checkbox-each-group">
                      <input
                        type="checkbox"
                        value="true"
                        id="check2"
                        checked={eachChecked.check2}
                        onChange={handleEachCheckChange}
                      />
                      <label className="join-each-label" htmlFor="check2">
                        <span className="checkbox-icon"><i className="fas fa-check fa-xs"></i></span>
                        <span className="join-each-check-label"><span style={{color: ' #628EF3'}}>(필수)</span> 개인정보 수집 및 이용 동의</span>
                      </label>
                    </div>

                    {/* ⭐개인정보 수집 및 이용동의⭐ */}
                    <div className="termsBox">
                        <div className="terms-content">
                          <Terms2/>
                        </div>
                    </div>


                    
                    
                    <div className="checkbox-each-group">
                      <input
                        type="checkbox"
                        value="true"
                        id="check3"
                        checked={eachChecked.check3}
                        onChange={handleEachCheckChange}
                      />
                      <label className="join-each-label" htmlFor="check3">
                        <span className="checkbox-icon"><i className="fas fa-check fa-xs"></i></span>
                        <span className="join-each-check-label">(선택) 개인 정보 제 3자에게 제공동의</span>
                      </label>
                    </div>

                    {/* ⭐개인 정보 제 3자에게 제공동의⭐ */}
                    <div className="termsBox">
                        <div className="terms-content">
                          <Terms3/>
                        </div>
                    </div>

                  </div>
                  
                </div>              
              </div>


              {/* (필수)동의가 다 체크되어야만 가능 */}
              <div className='ejoin-confirm'>
                <button className={`ejoin-confirm-button ${essentialChecked ? '' : 'disabled'}`}
                  disabled={!essentialChecked}
                  onClick={handleEjoinPage}>다음</button>
              </div>
            </div>
          </div>
        )
        :
        ( // 회원가입 정규 페이지
          <div className="ejoin-container" >
            <h2>회원가입</h2>
            
            <div className='ejoin-box'>

              <div className='ejoin-form'>
                <div className='ejoin-form-inner type2'>
                  <span className='ejoin-form-title'>이름</span>
                  <input id='join-name-input' type="text" placeholder="이름(실명)을 입력해주세요" />
                </div>

                <div className='ejoin-form-inner type2'>
                  <span className='ejoin-form-title'>아이디(이메일)</span>
                  <div className='type1'>
                    <input id='join-email-input' type="text" placeholder="이메일을 입력해주세요" />
                    <button className='join-email-check'>중복확인</button>
                  </div>
                </div>

                <div className='ejoin-form-inner type2'>
                  <span className='ejoin-form-title'>비밀번호</span>
                  <input id='join-pass-input' type="password" placeholder="영문+숫자 조합 8자 이상 입력해주세요"/>
                </div>

                <div className='ejoin-form-inner type2'>
                  <span className='ejoin-form-title'>비밀번호 재확인</span>
                  <input id='join-pass-check' type="password" placeholder="비밀번호를 한번 더 입력해주세요"/>
                </div>


                <div className='ejoin-form-inner'>
                    <div className='type3'>
                      <span className='ejoin-form-title'>나이</span>
                        {/* 1940~2023년도 */}
                          <select className='ejoin-year'onChange={handleYearChange} value={selectedCity}>
                            <option value="none">태어난 년도</option>  
                            {yearOptions()}
                          </select>
                      </div>

                    {/* 성별 */}
                    <div className='type3'>
                      <span className='ejoin-form-title'>성별</span>
                      <div className='ejoin-gender-check'>
                        {/* <button className='gender-m' value='1' onClick={handleGenderChange}>남자</button> */}
                        <button className={`gender-m ${joinGender === '1'  &&  'genderClick' }`} value='1' onClick={handleGenderChange}>남자</button>
                        <button className={`gender-w ${joinGender === '2'  &&  'genderClick' }`} value='2' onClick={handleGenderChange}>여자</button>     
                      </div>
                    </div>
                </div>
                

                {/* 지역정보 선택창 */}
                <div className='ejoin-form-inner type2'>
                    <span className='ejoin-form-title'>지역정보</span>
                    <div className='type1'>
                      <div className='type3'>
                        <select id='ejoin-location1' onChange={handleCityChange} value={selectedCity}>
                          <option value="none">시/도 선택</option>  
                            {
                              JoinAddressCity.map((city)=>{
                                return(
                                  <option value={city} key={city}>{city}</option>
                                );
                              })
                            }
                        </select>
                      </div>

                      <div className='type3'>
                      <select id='ejoin-location2' onChange={handleTownChange} value={selectedTown}>
                        <option value="none">구/군 선택</option>  
                          {
                            JoinAddressTown.find(town=> town.id === selectedCity)?.town.map((town)=>{ // selectedCity(선택한 시) 값에 따라 JoinAddressTown 있는 군·구목록을 가져옴
                              return(
                                <option value={town} key={town}>{town}</option>
                              );
                            })
                          }
                      </select>
                      </div>
                    </div>
                </div>  

                <div className='ejoin-form-inner type2'>
                  <span className='ejoin-form-title'>직업</span>
                    <select onChange={handleJobChange} value={selectedJob}>
                      <option value="none">선택해주세요</option>  
                        {
                          joinJobList.map((job)=>{ // selectedCity(선택한 시) 값에 따라 JoinAddressTown 있는 군·구목록을 가져옴
                            return(
                              <option value={job} key={job}>{job}</option>
                            );
                          })
                        }
                    </select>
                </div>
              </div>

              <div className='ejoin-confirm'>
                <button className='ejoin-confirm-button'>회원가입</button>
              </div>
            </div>

          </div>
        )
      }

    </div>
  );
}

export default EmailJoin;