import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import axiosInstance from "../axiosInstance";

function KakaoLogin({setIsLogin}) {
  const navigate = useNavigate();
  const URL = window.location.href;
  const match = /code=([^&]+)/.exec(URL);
  
  
  if(match){

    const code = decodeURIComponent(match[1]);

    axiosInstance.post('/oauth/kakao', {code : code})  
      .then(response=>{
        const jwt = response.headers.authorization;
        
        if(jwt){  // db에 있는 유저 정보와 일치하면 발급받음 (이미 회원인 경우)
          sessionStorage.setItem('jwt', jwt);
        setIsLogin(true);
        navigate('/');
      }else{  // jwt가 없는건 회원이 아니여서 발급받지 못한 상태 (여기서 추가 회원정보 입력 받을 거임)
        navigate('/socialAddInfo', {state : response.data});  // 네비게이터로 추가정보 페이지 이동하고 같이 소셜유저 정보 보내줌 (서버에서 기본 정보 받아온거)
      }
    }).catch(error=>{
      console.log(error);
      alert('로그인 실패'); 
    })
  }else{
    console.log('엑세스 토큰 오류');
  }



  return(
    <>
      <Loading />
    </>
  );
}

export default KakaoLogin;