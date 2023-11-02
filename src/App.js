import logo from './logo.svg';
import './App.css';
import Header from './Home/Header';
import { Route, Routes } from 'react-router-dom';
import Join from './JoinLogin/Join';
import { useState } from 'react';
import EmailJoin from './JoinLogin/EmailJoin';
import JoinTemsPage from './JoinLogin/JoinTemsPage';



function App() {

  return (
    <div className="App">
    
    {/* {false && <Header/>} */}
    <Header/>
    <Routes>
      {/* <Route path = '/login' element={<Login userInfo = {userInfo} 
                                               setIsLogin = {setIsLogin}
                                               setImsiName = {setImsiName}/>}/> */}
      <Route path='/join' element={<Join/>}/>
      <Route path='/emailJoin' element={<EmailJoin/>}/>
      <Route path='/tems' element={<JoinTemsPage/>}/>

    </Routes>
    
    </div>
  );


}

export default App;
