import { Route, Routes } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import { Suspense, useEffect, useState } from 'react';
import CategoryNavBar from './main/CategoryNavBar';
import CarouselBanner from './main/CarouselBanner';
import FunBoard from './main/FunBoard';
import SurveyBoard from './main/SurveyBoard';
import FunSurvey from "./Category/FunSurvey";
import Survey from './Category/Survey';
import FAQ from './Category/FAQ';
import MyPage from './Category/MyPage';


//git에서 데이터 받아서 
// const URL = 'https://raw.githubusercontent.com/sungchunp/camping.json/main/data.json';

function App() {
    const [survey, setsurvey] = useState([]);


  useEffect(() => {
    axios.get(URL)
      .then((result) => {
        setsurvey([...result.data]);
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

return (
  <div className="App">
    <CategoryNavBar />
    <CarouselBanner />
    <FunBoard />
    <SurveyBoard />
    <Suspense fallback={<div>로딩중</div>}>
      <Routes>
        <Route path='/' />
        <Route path='/FunSurvey' element={<FunSurvey survey={survey} />} />
        <Route path='/Survey' element={<Survey survey={survey} />} />
        <Route path='/FAQ' element={<FAQ survey={survey} />} />
        <Route path='/MyPage' element={<MyPage survey={survey} />} />
      </Routes>
    </Suspense>
  </div>
);
}

export default App;