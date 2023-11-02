import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import FreeBoardList from './component/FreeBoardList';
import WriteFreeBoard from './component/WriteFreeBoard';
import FreeBoardDetail from './component/FreeBoardDetail';
import Header from './component/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import UpdateFreeBoard from './component/UpdateFreeBoard';


function App() {
  const navigate = useNavigate();
  return (
    <div>
      <Header />

      <Routes>
        <Route path='/fbList' element={<FreeBoardList />} />
        <Route path='/fbwrite' element={<WriteFreeBoard />} />
        <Route path='/fbdetail' element={<FreeBoardDetail />} />
        <Route path='/fbupdate' element={<UpdateFreeBoard/>} />
      </Routes>
      </div>
  );
}

export default App;
