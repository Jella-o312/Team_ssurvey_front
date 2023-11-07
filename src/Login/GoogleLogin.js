import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

function GoogleLogin({setIsLogin}){
  const URL = window.location.href; //  url 뽑아오는 코드

  const match = /access_token=([^&]+)/.exec(URL);  // 정규식 access_token 으로 시작하고, &전까지

  const navigate = useNavigate();

  if(match){
    const access_token = match[1];  // 1번방에 있는게 토큰 값임

    console.log(access_token);

    axiosInstance.post('/oauth/google', {access_token : access_token})  // 스프링 부트에 보내줌
      .then(response=>{
        const jwt = response.headers.authorization;

        if(jwt){
          sessionStorage.setItem('jwt', jwt);
          setIsLogin(true);
          navigate('/');
        }

      }).catch(error=>{
        alert('로그인 실패');
      })
  }else{
    console.log('엑세스 토큰 오류');
  }

  return(
    <>
      <h1>로그인 중입니다.</h1>
    </>

  );
}

export default GoogleLogin;