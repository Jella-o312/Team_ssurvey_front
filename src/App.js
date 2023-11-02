import './App.css';
import { Route, Routes } from 'react-router-dom';
import SurveyQ from './pages/SurveyQ';
import Header from './Home/Header';
import Answer from './pages/Answer';


function App() {


  return (


    <div className="App">
    <Header/>
    <Routes>    
      <Route path="/" element={<MainHome />} />
      <Route path='/SurveyQ' element={<SurveyQ />}/>   
      <Route path='/Answer' element={<Answer />}/>
      <Route path='/join' element={<Join/>}/>
      <Route path='/emailJoin' element={<EmailJoin/>}/>
      <Route path='/fbList' element={<FreeBoardList />} />
      <Route path='/fbwrite' element={<WriteFreeBoard />} />
      <Route path='/fbdetail' element={<FreeBoardDetail />} />
      <Route path='/fbupdate' element={<UpdateFreeBoard/>} />
      <Route path="/FunSurvey" element={<FunSurvey survey={survey} />} />
      <Route path="/Survey" element={<Survey survey={survey} />} />
      <Route path="/FAQ" element={<FAQ survey={survey} />} />
      <Route path="/MyPage" element={<MyPage survey={survey} />} />   
    </Routes>

    </div>
 
  );
}

export default App;


