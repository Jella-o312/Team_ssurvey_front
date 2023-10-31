import { Route, Routes } from 'react-router-dom';
import './App.css';
// import axios from 'axios';
import { useState } from 'react';
import CategoryNavBar from './main/CategoryNavBar';
import CarouselBanner from './main/CarouselBanner';
import FunBoard from './main/FunBoard';
import SurveyBoard from './main/SurveyBoard';
import FunSurvey from "./Category/FunSurvey";
import Survey from './Category/Survey';
import FAQ from './Category/FAQ';
import MyPage from './Category/MyPage';

// const URL = 'https://raw.githubusercontent.com/sungchunp/camping.json/main/data.json';

function App() {
    const [survey] = useState([]);
    // const navigate = useNavigate();

    // useEffect(() => {
    //     axios.get(URL)
    //         .then((result) => {
    //             setsurvey(result.data);
    //             console.log(result);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }, []);

    return (
        <div className="App">
            <CategoryNavBar />
            <Routes>
                <Route path="/" element={<MainHome />} />
                <Route path="/FunSurvey" element={<FunSurvey survey={survey} />} />
                <Route path="/Survey" element={<Survey survey={survey} />} />
                <Route path="/FAQ" element={<FAQ survey={survey} />} />
                <Route path="/MyPage" element={<MyPage survey={survey} />} />
            </Routes>
        </div>
    );
}

function MainHome() {
    return (
        <>
            <CarouselBanner />
            <FunBoard />
            <SurveyBoard />
        </>
    );
}

// // 상세 페이지 컴포넌트
// function DetailPage() {
//   // 상세 페이지 내용을 여기에 추가
//   return <div>상세 페이지 내용</div>;
// }

// // 상세 페이지에 대한 라우팅
// <Route path="/detail/:id" element={<DetailPage />} />

export default App;