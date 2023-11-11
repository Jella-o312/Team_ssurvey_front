import { useNavigate } from 'react-router-dom';
import '../JoinLogin/EmailJoin.css';
import './Login.css';
import { useState } from 'react';
<<<<<<< HEAD
import axiosInstance from '../axioslnstance';

=======
import axiosInstance from '../axiosInstance';
>>>>>>> 075aaad4ed83d01087553fddc24e701f783f6646
const Login =({setIsLogin, setUserInfo}) =>{
  
  const navigate = useNavigate();

  // 로그인 입력값 저장하는 스테이트
  const [loginPut, setLoginPut] = useState({
    username : '',
    password : ''
  });


  // 입력 값 바뀔때마다 스테이트에 저장 핸들러
  const handleLoginPut = (e) =>{
    let eDataset = e.target.dataset.field; // 데이터셋 값 뽑아옴
    let eValue = e.target.value; 

    setLoginPut({...loginPut, [`${eDataset}`] : eValue});
  }
  


  const handleLogin = ()=>{

    // axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, loginPut)  // 아래  instance 안썼으면 사용했을코드
    axiosInstance.post('/login' , loginPut)
    .then(response => {
      const jwt = response.headers.authorization;
      // console.log(response.data);
      if(jwt) {
        sessionStorage.setItem('jwt', jwt);
        setIsLogin(true);  //로그인 성공시 로그인 유무 스테이트를 트루로 바꿔줌
        alert('로그인 성공');
        navigate('/');
        // console.log("jwt" + jwt);
      }
    }).catch(error => {
      alert('로그인 실패');
      console.log(error);
    })
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
                  data-field="username"
                  onChange={handleLoginPut} 
                />
            </div>
           


            <div className='ejoin-form-inner type2'>
              <span className='ejoin-form-title'>비밀번호</span>
              <input id='login-pass-input' type="password" placeholder="비밀번호를 입력해주세요"
                data-field="password"
                onChange={handleLoginPut} 
              />
            </div>

            
            <div className='ejoin-confirm'>
              <button className={`login-button ${!(loginPut.username && loginPut.password) ? 'disabled' : ''}`}  
                 disabled={!(loginPut.username && loginPut.password)} // 아이디, 비번 둘 중 하나라도 안들어 있으면 disabled
                onClick={handleLogin}
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
            
            <button className='login-google' 
                    onClick={()=>{window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&response_type=token&scope=openid%20email%20profile`;}}>
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