import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Home/Header';
import Join from './JoinLogin/Join';
import SurveyQ from './pages/SurveyQ';
import Answer from './pages/Answer';
import EmailJoin from './JoinLogin/EmailJoin';
import FreeBoardList from './Fcomponent/FreeBoardList';
import WriteFreeBoard from './Fcomponent/WriteFreeBoard';
import FreeBoardDetail from './Fcomponent/FreeBoardDetail';
import UpdateFreeBoard from './Fcomponent/UpdateFreeBoard';
import FunSurvey from './Category/Funsurvey';
import Survey from './Category/Survey';
import MainHome from './main/MainHome';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Login from './Login/Login';




function App() {
  
  const [isLogin, setIsLogin] = useState(false);

  const [userInfo, setUserInfo] = useState({  // 여기에 임시 값 넣어두고 하기
    userName : '김설문',
    userEmail : '',
    userPassword : '',
    userRoletype: 'User',
    userAge : '',
    userGender : '',
    userLocation : '',  
    userJob : '',
    serveyNo : ''
  });

  return (

    <div className="App">
      
    {/* <button onClick={()=>{
        axios.get(`${process.env.REACT_APP_SERVER_URL}/test2`)
          .then(userinfo=>{
            console.log(userinfo.data);
          }).catch(error=>{
            console.log(error);
          })
      }}>유저 정보 받기</button> */}

      

    <Header 
      userInfo = {userInfo}
      isLogin = {isLogin}  /* 로그인 상태에 따라 헤더 구성 바꾸기 위함 (로그인, 로그아웃) */
      setIsLogin = {setIsLogin} /* 로그인 값 바꿔줘야함 */
    />
    
    <Routes>    
      <Route path="/" element={<MainHome />} />
      <Route path='/SurveyQ' element={<SurveyQ />}/>   
      <Route path='/Answer' element={<Answer />}/>
      <Route path='/join' element={<Join/>}/>
      <Route path='/login' element={<Login setIsLogin={setIsLogin}/>}/>
      <Route path='/emailJoin' element={<EmailJoin/>}/>
      <Route path='/fbList' element={<FreeBoardList />} />
      <Route path='/fbwrite' element={<WriteFreeBoard />} />
      <Route path='/fbdetail/:fbno' element={<FreeBoardDetail />} />
      <Route path='/fbupdate' element={<UpdateFreeBoard/>} />
      <Route path="/FunSurvey" element={<FunSurvey/>} />
      <Route path="/Survey" element={<Survey/>} />
    </Routes>

    </div>
 
  );


}

export default App;


