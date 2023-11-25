import { useEffect, useState } from 'react';
import './EmailJoin.css';
import Terms1 from '../joinFolder/joinTerms/Terms1';
import Terms2 from '../joinFolder/joinTerms/terms2';
import Terms3 from '../joinFolder/joinTerms/Terms3';

const JoinTemsPage = ({setEjoinPage})=>{ // 약관동의, 회원가입 입력페이지 나누는 스테이트 받아옴 (true가 약관동의, false가 회원가입 입력)

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

   
  return(
    <div>
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
    </div>
  );
}

export default JoinTemsPage;