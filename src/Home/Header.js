import './Header.css';
import ssurveyLogo from '../ImsiLogo.svg';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import FunPage from '../pages/FunPage';
import SurveyPage from '../pages/SurveyPage';


const Header = ({ userInfo, setUserInfo, isLogin, setIsLogin }) => {
  const navigate = useNavigate();

  // 로그아웃 버튼 눌렀을때 기능 (메인화면으로 이동 + 새로고침)
  const logOut = () => {
    sessionStorage.removeItem('jwt'); // 세션스토리지에서 로그인 유저 정보 지움
    setIsLogin(false);  //로그인상태 false로 바꿈
    setUserInfo({ //state 값 지워야함...
      userNo: '',
      userName: '',
      userEmail: '',
      userPassword: '',
      userRoletype: '',
      userAge: '',
      userGender: '',
      userLocation: '',
      userJob: '',
      serveyNo: ''
    })
    navigate('/'); // 메인화면으로 이동
  };

  return (
    <>
       <div className='header-container'>
        <div className='header-nav'>

          <div className='modoLogo' onClick={() => { navigate('/') }}>
            <img className='nav-logo' src={ssurveyLogo} alt='' />
          </div>

          <nav>

            <div className='dropdown'>
              <div>설문참여</div>
              <div className='dropdown-content'>
                <div onClick={() => { navigate('/Fun') }}>Fun</div>
                <div onClick={() => { navigate('/Survey') }}>설문조사</div>
              </div>
            </div>
            <div onClick={() => { navigate('/SurveyList') }}>설문신청</div>
            <div onClick={() => { navigate('/fbList') }}>자유게시판</div>

          <div onClick={()=>{navigate('/FAQ')}}>FAQ</div>
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
        
          { //isLogin 상태가 트루일때 로그인된 화면 보여줌
            isLogin ?
              <div className='nav-loginTrue'> {/* 로그인 된 상태 */}
                <button className='myPage'>{userInfo.userRname}님</button>
                <button className='logout' onClick={logOut} >로그아웃</button>
              </div>
              :
              <div className='nav-login'> {/* 로그인 안된 상태 */}
                <button className='join' onClick={() => { navigate('/join') }} >회원가입</button>
                <button className='login' onClick={() => { navigate('/login') }}>로그인</button>
              </div>
          }
        </div>
      </div>

      <Routes>
        <Route path="/Fun" element={<FunPage />} />
        <Route path="/Survey" element={<SurveyPage />} />
      </Routes>
    </>
  )
}


export default Header;