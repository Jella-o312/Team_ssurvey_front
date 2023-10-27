import './Header.css';
import ssurveyLogo from '../ImsiLogo.svg';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


const Header = () =>{
  const navigate = useNavigate();

  // // 로그아웃 버튼 눌렀을때 기능 (메인화면으로 이동 + 개로고침)
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
          <div className='moim' onClick={()=>{navigate('/moim')}}>설문참여</div>
          <div onClick={()=>{navigate('/sorry')}}>설문신청</div>
          <div onClick={()=>{navigate('/sorry')}}>자유게시판</div>
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
             {/* enter이벤트 -> 기본동작막고 -> 페이지 이벤트
             기본동작 (새로고침 막기) */}
              {/* 검색창은 enter로도 작동되고, 돋보기 아이콘 클릭했을때도 검색되어야함 */}
              {/* enter이벤트 설정 -> 해당 인풋에 입력한 내용을 토대로 네비게이트 시키ㄱ, 검색 내용이 url파라미터로 받게, 검색해서 보이는 화면은 파라미터값으로 거른다음에 보여줌 */}
              {/* 컴파운드 만들고, 컴파운드 안에는 내가 검색 한 것만 나오게 조건걸기 */}
              <span>
                {/* <FontAwesomeIcon icon={faMagnifyingGlass} style={{fontSize: '18px', color:'#828282'}}/> */}
              </span>
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


