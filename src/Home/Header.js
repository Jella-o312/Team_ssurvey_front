import './Header.css';
import ssurveyLogo from '../ImsiLogo.svg';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


const Header = () =>{
  const navigate = useNavigate();

  // // 로그아웃 버튼 눌렀을때 기능 (메인화면으로 이동 + 새로고침)
  // const logOut = () => {
  //   setIsLogin(false);  //로그인상태 false로 바꿈
  //   navigate('/'); // 메인화면으로 이동
  //   window.location.reload(); // 새로고침
  // };


  return(
    <div className='header-container'>
      <div className='header-nav'>

        <div className='modoLogo' onClick={()=>{navigate('/')}}>
            <img className='nav-logo' src={ssurveyLogo} alt=''/>
        </div>

        <nav>

          <div className='dropdown'>
            <div onClick={() => { navigate('/dropdown') }}>설문참여</div>
            <div className='dropdown-content'>
              <div onClick={() => { navigate('/FunSurvey') }}>Fun</div>
              <div onClick={() => { navigate('/Survey') }}>설문조사</div>
            </div>
          </div>
          <div onClick={()=>{navigate('/SurveyQ')}}>설문신청</div>
          <div onClick={()=>{navigate('/fbList')}}>자유게시판</div>

          <div onClick={()=>{navigate('/sorry')}}>FAQ</div>
        </nav>

        <div className='search'>
          <form>
            <input type='text' placeholder='관심사 검색하기'
            onKeyDown={(e)=>{
              e.preventDefault();
              if(e.key === 'Enter')
                // alert(e.target.value);
                e.value = ''; // ???? 기능을 안함

            }}/>
              
          </form>
        </div>  


          <div className='nav-login'> {/* 로그인 안된 상태 */}
            <button className='join' onClick={()=>{navigate('/join')}} >회원가입</button>
            <button className='login' onClick={()=>{navigate('/login')}}>로그인</button>
          </div>
      </div>
    </div>
                  
  )
}


export default Header;
