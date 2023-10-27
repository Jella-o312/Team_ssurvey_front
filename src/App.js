import { Route, Routes } from 'react-router-dom';
import './App.css';
import data from "./SurveyData";
import axios from 'axios';
import { Suspense, useEffect, useState } from 'react';
import CategoryNavBar from './main/CategoryNavBar';
import CarouselBanner from './main/CarouselBanner';
import SurveyBoard from './main/SurveyBoard'; // SurveyBoard 컴포넌트가 있는 파일 경로로 수정
import Detail from './Category/FAQ';
import TentTarp from './Category/Funsurvey';
import Table from './Category/MyPage';
import MyPage from './Category/Survey';


//git에서 데이터 받아서 
const URL = 'https://raw.githubusercontent.com/sungchunp/camping.json/main/data.json';

function App() {
  const [survey, setsurvey] = useState([]);

console.log(data);

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
      <SurveyBoard />
      <Suspense fallback={<div>로딩중</div>}>
        <Routes>
          <Route path='/' />
          <Route path='/detail/:id' element={<Detail survey={survey} />} />
          <Route path='/tenttarp' element={<TentTarp survey={survey} /> } />
          <Route path='/table' element={<Table survey={survey} />}/>
          <Route path='/mypage' element={<MyPage survey={survey} />}/>
          {/* <Route path='*' element={<div>Page Not found</div>} /> */}
        </Routes>
      </Suspense>

    </div>
  );
}

export default App;
