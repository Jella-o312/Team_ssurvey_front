import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './Join.css';
import ssurveyLogo from '../ImsiLogo.svg';

const Join = () => {

  const navigate = useNavigate();
 
  return (

    <div className="join-container">
        <img className='join-logo' src={ssurveyLogo} alt=''/>
      <div className="join-typeBox">
        <h2>회원가입</h2>
        
        {/* <button className='join-email'>
          <span style={{fontWeight:"500px", color:"#628EF3"}}>이메일로 회원가입</span>
        </button> */}

        <button className='join-naver' onClick={()=>{alert('🙏준비중입니다')}}>
          <img src="https://d2v80xjmx68n4w.cloudfront.net/assets/icon/icon_naver.png" alt="sns아이콘"/>  
          <span  style={{fontWeight:"500px", color:"white"}}>네이버로 회원가입</span>
        </button>
      
        <button className='join-kakao'
           onClick={()=>{window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}`;}}>
          <img src="https://d2v80xjmx68n4w.cloudfront.net/assets/icon/icon_kakao.png" alt="sns아이콘"></img>
          <span style={{fontWeight:"500px", color:"#333333"}}>카카오로 회원가입</span>
        </button>

        {/* class="width-30px margin-right-5" */}
        <button className='join-google'
           onClick={()=>{window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&response_type=token&scope=openid%20email%20profile`;}}>
          <img src="https://d2v80xjmx68n4w.cloudfront.net/assets/icon/icon_google.png" alt="sns아이콘"/>
          <span style={{fontWeight:"500px", color:"white"}}>구글로 회원가입</span>
        </button>

        <button className='join-apple'
           onClick={()=>{window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&response_type=token&scope=openid%20email%20profile`;}}>
          <img src="https://d2v80xjmx68n4w.cloudfront.net/assets/icon/icon_apple.png" alt="sns아이콘"></img>
          <span style={{fontWeight:"500px", color:"white"}}>애플로 회원가입</span>
        </button>

        
        <button className='join-email' onClick={()=>{navigate('/emailJoin')}}>
          <span style={{fontWeight:"500px", color:"#628EF3"}}>이메일로 회원가입</span>
        </button>
        
      
      
      
      
      </div>


    </div>
  );
}

export default Join;

