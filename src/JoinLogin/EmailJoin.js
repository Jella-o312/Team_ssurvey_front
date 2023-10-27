import './EmailJoin.css';

const EmailJoin = () =>{


  return(
    <div className="ejoin-container">
      <h2>회원가입</h2>
      
      <div className='ejoin-box'>

        <div className='ejoin-form'>
          <div className='ejoin-form-inner type2'>
            <span className='ejoin-form-title'>이름</span>
            <input id='join-name-input' type="text" placeholder="이름(실명)을 입력해주세요" />
          </div>

          <div className='ejoin-form-inner type2'>
            <span className='ejoin-form-title'>아이디(이메일)</span>
            <div className='type2'>
              <input id='join-email-input' type="text" placeholder="이메일을 입력해주세요" />
              <a className='join-email-check'>중복확인</a>
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
                  {/*1960~2023년도*/}
                  <select>
                    <option>태어난 년도</option>  
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>

              <div className='type3'>
                <span className='ejoin-form-title'>성별</span>
                <div className='ejoin-gender-check'>
                  <button className='gender-m'>남자</button>
                  <button className='gender-w'>여자</button>     
                </div>
              </div>
          </div>


        <div className='ejoin-form-inner type2'>
            <span className='ejoin-form-title'>지역정보</span>
            <div className='type1'>
              <div className='type3'>
                <select id='ejoin-location1'>
                  <option>선택해주세요</option>  
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>

              <div className='type3'>
              <select id='ejoin-location2'>
                <option>선택해주세요</option>  
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              </div>
            </div>
        </div>  

        <div className='ejoin-form-inner type2'>
          <span className='ejoin-form-title'>직업</span>
            {/*1960~2023년도*/}
            <select>
              <option>태어난 년도</option>  
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>

        <div className='ejoin-confirm'>
          <button className='ejoin-confirm-no'>취소</button>
          <button className='ejoin-confirm-yes'>회원가입</button>
        </div>
      </div>

    </div>
  );
}

export default EmailJoin;