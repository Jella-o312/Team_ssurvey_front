import { useNavigate } from 'react-router-dom';
import '../JoinLogin/EmailJoin.css';
import './Login.css';
import { useState } from 'react';
const Login =({setIsLogin}) =>{
  
  const navigate = useNavigate();

  // 로그인 입력값 저장하는 스테이트
  const [loginPut, setLoginPut] = useState({
    Email : '',
    Password : ''
  });


  // 입력 값 바뀔때마다 스테이트에 저장 핸들러
  const handleLoginPut = (e) =>{
    let eDataset = e.target.dataset.field; // 데이터셋 값 뽑아옴
    let eValue = e.target.value; 

    setLoginPut({...loginPut, [`${eDataset}`] : eValue});
  }

  // console.log(loginPut);

  const ImsiLoigin = ()=> {
    setIsLogin(true);
  }

  return(
    <div>
      <div className="login-container" >
        <h2>로그인</h2>
        
        <div className='login-box'>

          <div className='login-form'>
            
            <div className='ejoin-form-inner type2'>
              <span className='ejoin-form-title'>아이디</span>
                <input id='login-id-input' type="text" placeholder="이메일을 입력해주세요" 
                  data-field="Email"
                  onChange={handleLoginPut} 
                />
            </div>
           


            <div className='ejoin-form-inner type2'>
              <span className='ejoin-form-title'>비밀번호</span>
              <input id='login-pass-input' type="password" placeholder="비밀번호를 입력해주세요"
                data-field="Password"
                onChange={handleLoginPut} 
              />
            </div>

            
            <div className='ejoin-confirm'>
              <button className='login-button'
                onClick={ImsiLoigin}
              >로그인하기</button>  
            </div>

            <div className='find-login'>
              <a href=''>아이디 찾기</a>
              <div className='login-line'></div>
              <a href=''>비밀번호 찾기</a>
              <div className='login-line'></div>
              <a className='' onClick={()=>{navigate('/join')}} style={{cursor: 'pointer'}}>회원가입</a>
            </div>
              
          </div>


          
         <div className='login-social-lineBox'>───────&nbsp;&nbsp; or &nbsp;&nbsp;───────</div>

          <div className='social-login'>
            <button className='login-naver'>
              <img src="https://d2v80xjmx68n4w.cloudfront.net/assets/icon/icon_naver.png" alt="sns아이콘"/>  
            </button>

            <button className='login-kakao'>
              <img src="https://d2v80xjmx68n4w.cloudfront.net/assets/icon/icon_kakao.png" alt="sns아이콘"></img>
            </button>
            
            <button className='login-google'>
              <img src="https://d2v80xjmx68n4w.cloudfront.net/assets/icon/icon_google.png" alt="sns아이콘"/>
            </button>

            <button className='login-apple'>
              <img src="https://d2v80xjmx68n4w.cloudfront.net/assets/icon/icon_apple.png" alt="sns아이콘"></img>
            </button>

          </div>


        </div>



      </div>
    </div>
  );
}

export default Login;