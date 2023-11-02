import './App.css';
import { Route, Routes } from 'react-router-dom';
import SurveyQ from './pages/SurveyQ';
import SurveyList from './pages/SurveyList';
import Header from './Home/Header';
import Answer from './pages/Answer';


function App() {


  return (


    <div className="App">
    <Header/>
    <Routes>    
      <Route path = '/' element={<SurveyList />} />
      <Route path='/SurveyQ' element={<SurveyQ />}/>   
      <Route path='/Answer' element={<Answer />}/>   
    </Routes>

    </div>
 
  )
}
export default App;


