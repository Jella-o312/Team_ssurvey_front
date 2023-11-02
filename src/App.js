import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Home/Header';
import Join from './JoinLogin/Join';
import SurveyQ from './pages/SurveyQ';
import Answer from './pages/Answer';
import EmailJoin from './JoinLogin/EmailJoin';




function App() {

  return (


    <div className="App">
    <Header/>
    <Routes>    
      {/* <Route path="/" element={<MainHome />} /> */}
      <Route path='/SurveyQ' element={<SurveyQ />}/>   
      <Route path='/Answer' element={<Answer />}/>
      <Route path='/join' element={<Join/>}/>
      <Route path='/emailJoin' element={<EmailJoin/>}/>
      {/* <Route path='/fbList' element={<FreeBoardList />} />
      <Route path='/fbwrite' element={<WriteFreeBoard />} />
      <Route path='/fbdetail' element={<FreeBoardDetail />} />
      <Route path='/fbupdate' element={<UpdateFreeBoard/>} /> */}
      {/* <Route path="/FunSurvey" element={<FunSurvey survey={survey} />} />
      <Route path="/Survey" element={<Survey survey={survey} />} />
      <Route path="/FAQ" element={<FAQ survey={survey} />} />
      <Route path="/MyPage" element={<MyPage survey={survey} />} />    */}
    </Routes>

    </div>
 
  );


}

export default App;


