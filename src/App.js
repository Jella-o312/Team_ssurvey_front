import logo from './logo.svg';
import './App.css';
import Header from './Home/Header';
import { Route, Routes } from 'react-router-dom';
import Join from './JoinLogin/Join';
import { useState } from 'react';
import EmailJoin from './JoinLogin/EmailJoin';

function App() {

  return (
    <div className="App">
    <Header/>
    <Routes>
      {/* <Route path = '/login' element={<Login userInfo = {userInfo} 
                                               setIsLogin = {setIsLogin}
                                               setImsiName = {setImsiName}/>}/> */}
      <Route path='/join' element={<Join/>}/>
      <Route path='/emailJoin' element={<EmailJoin/>}/>

    </Routes>
    
    </div>
  );


}

export default App;
