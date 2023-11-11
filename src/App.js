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
import MainHome from './main/MainHome';
import { useEffect, useState } from 'react';
import Login from './Login/Login';
<<<<<<< HEAD
import axiosInstance from './axioslnstance';

function App() {

=======
import SurveyList from './pages/SurveyList';
import FunQ from './pages/FunQ';
import axiosInstance from './axiosInstance';
import GoogleLogin from './Login/GoogleLogin';
import SocialAddInfo from './JoinLogin/SocialAddInfo';





function App() {

  
>>>>>>> 075aaad4ed83d01087553fddc24e701f783f6646
  const [isLogin, setIsLogin] = useState(false);
  
  const [userInfo, setUserInfo] = useState({  // 여기에 임시 값 넣어두고 하기
    userNo: '',
<<<<<<< HEAD
    username: '',
    userRname: '',
    password: '',
    userRoletype: '',
    userAge: '',
    userGender: '',
    userLocation: '',
    userJob: '',
    serveyNo: ''
  });

  // 로그인 했을때 뽑아오는 작업함, 로그아웃됐을대 유저정보 삭제
  useEffect(() => {
    // 마운트 되거나 로그인 상태가 바꼈을때 세션 값 확인해서 세션에 값이 들어있으면 로그인 상태 유지
    const sesseion = sessionStorage.getItem('jwt');

    if (sesseion !== null) {  // 로그인한 상태
      axiosInstance.get('/userInfo')
        .then(response => {
          setUserInfo(response.data); // 서버에서 받아온 내용을 저장
          setIsLogin(true); // 로그인 상태 유지
        }).catch(error => {
          console.log(error);
        })
    }
  }, [isLogin]);

  // console.log("유저정보 ↓");
  // console.log(userInfo);
  // console.log('세션' + sessionStorage.getItem('jwt'));

  return (
=======
    username : '',
    userRname : '',
    password : '',
    userRoletype: '',
    userAge : '',
    userGender : '',
    userLocation : '',  
    userJob : '',
    serveyNo : ''
  });

>>>>>>> 075aaad4ed83d01087553fddc24e701f783f6646

  // 로그인 했을때 뽑아오는 작업함, 로그아웃됐을대 유저정보 삭제
  useEffect(()=>{
    // 마운트 되거나 로그인 상태가 바꼈을때 세션 값 확인해서 세션에 값이 들어있으면 로그인 상태 유지
    const sesseion = sessionStorage.getItem('jwt');

    if(sesseion !== null){  // 로그인한 상태
      axiosInstance.get('/userInfo')
      .then(response =>{
        setUserInfo(response.data); // 서버에서 받아온 내용을 저장
        setIsLogin(true); // 로그인 상태 유지
      }).catch(error=> {
        console.log(error);
      })
    }
  },[isLogin]);

  // console.log("유저정보 ↓");
  // console.log(userInfo);
  // console.log('세션' + sessionStorage.getItem('jwt'));
  
  return (
    
    <div className="App">
<<<<<<< HEAD

      {/* <button onClick={()=>{
        axios.get(`${process.env.REACT_APP_SERVER_URL}/test2`)
          .then(userinfo=>{
            console.log(userinfo.data);
          }).catch(error=>{
            console.log(error);
          })
      }}>유저 정보 받기</button> */}

      <Header
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        isLogin={isLogin}  /* 로그인 상태에 따라 헤더 구성 바꾸기 위함 (로그인, 로그아웃) */
        setIsLogin={setIsLogin} /* 로그인 값 바꿔줘야함 */
      />
=======
      
    <Header 
      userInfo = {userInfo}
      setUserInfo = {setUserInfo}
      isLogin = {isLogin}  /* 로그인 상태에 따라 헤더 구성 바꾸기 위함 (로그인, 로그아웃) */
      setIsLogin = {setIsLogin} /* 로그인 값 바꿔줘야함 */
    />
    
    <Routes>    
      <Route path="/" element={<MainHome />} />
      <Route path='/SurveyList' element={<SurveyList />}/> 
      <Route path='/FunQ' element={<FunQ userInfo={userInfo}/>}/>   
      <Route path='/SurveyQ' element={<SurveyQ userInfo={userInfo}/>}/>   
      <Route path='/Answer' element={<Answer />}/>
      <Route path='/join' element={<Join/>}/>
      <Route path='/login' element={<Login setIsLogin={setIsLogin} setUserInfo={setUserInfo}/>}/> 
      <Route path ='/oauth/google' element={<GoogleLogin setIsLogin={setIsLogin} />}/>
      <Route path='/emailJoin' element={<EmailJoin/>}/>
      <Route path='/fbList' element={<FreeBoardList isLogin={isLogin}/>} />
      <Route path='/fbwrite' element={<WriteFreeBoard userInfo={userInfo} isLogin={isLogin} />} />
      <Route path='/fbdetail/:fbno' element={<FreeBoardDetail userInfo={userInfo}/>} />
      <Route path='/fbupdate/:fbno' element={<UpdateFreeBoard/>} />
      <Route path='/socialAddInfo' element={<SocialAddInfo setIsLogin={setIsLogin}/>} /> {/* 소셜 로그인 추가 정보 입력 페이지 (이거 완료해야 회원가입 완료됨) */}
      <Route path='/fbList' element={<FreeBoardList />} />
      <Route path='/fbwrite' element={<WriteFreeBoard />} />
      <Route path='/fbdetail/:fbno' element={<FreeBoardDetail />} />
      <Route path='/fbupdate' element={<UpdateFreeBoard/>} />
      <Route path="/FunSurvey" element={<FunSurvey/>} />
      <Route path="/Survey" element={<Survey/>} />
    </Routes>
>>>>>>> 075aaad4ed83d01087553fddc24e701f783f6646

      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path='/SurveyQ' element={<SurveyQ />} />
        <Route path='/Answer' element={<Answer userInfo={userInfo} />} />
        <Route path='/join' element={<Join />} />
        <Route path='/login' element={<Login setIsLogin={setIsLogin} />} />
        <Route path='/emailJoin' element={<EmailJoin />} />
        <Route path='/fbList' element={<FreeBoardList />} />
        <Route path='/fbwrite' element={<WriteFreeBoard />} />
        <Route path='/fbdetail/:fbno' element={<FreeBoardDetail />} />
        <Route path='/fbupdate' element={<UpdateFreeBoard />} />
      </Routes>
    </div>
  );
}

<<<<<<< HEAD
export default App;
=======
export default App;

>>>>>>> 075aaad4ed83d01087553fddc24e701f783f6646
