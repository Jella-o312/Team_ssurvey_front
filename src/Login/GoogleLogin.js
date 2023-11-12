import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { useState } from "react";
import Loading from "./Loading";

function GoogleLogin({setIsLogin}){
  const URL = window.location.href; //  url 뽑아오는 코드

  const match = /access_token=([^&]+)/.exec(URL);  // 정규식 access_token 으로 시작하고, &전까지

  const navigate = useNavigate();

  // 구글 로그인 혹은 회원가입 처리 하는 코드
  // if(userInfo.username === ''){  // → 이 if문이 없으면 무한 반복하기 때문에 최초 한번 axios 작동되고 user객체에 값이 담기면 반복안되게 막아둠
    if(match){
      const access_token = match[1];  // 1번방에 있는게 토큰 값임

      axiosInstance.post('/oauth/google', {access_token : access_token})  // 스프링 부트에 보내줌
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

export default GoogleLogin;