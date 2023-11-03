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

        <button className='join-naver'>
          <img src="https://d2v80xjmx68n4w.cloudfront.net/assets/icon/icon_naver.png" alt="sns아이콘"/>  
          <span  style={{fontWeight:"500px", color:"white"}}>네이버로 회원가입</span>
        </button>
      
        <button className='join-kakao'>
          <img src="https://d2v80xjmx68n4w.cloudfront.net/assets/icon/icon_kakao.png" alt="sns아이콘"></img>
          <span style={{fontWeight:"500px", color:"#333333"}}>카카오로 회원가입</span>
        </button>

        {/* class="width-30px margin-right-5" */}
        <button className='join-google'>
          <img src="https://d2v80xjmx68n4w.cloudfront.net/assets/icon/icon_google.png" alt="sns아이콘"/>
          <span style={{fontWeight:"500px", color:"white"}}>구글로 회원가입</span>
        </button>


        <button className='join-email' onClick={()=>{navigate('/emailJoin')}}>
          <span style={{fontWeight:"500px", color:"#628EF3"}}>이메일로 회원가입</span>
        </button>
        
      
      
      
      
      </div>


    </div>
  );
}

export default Join;

