import { useEffect, useState } from 'react';
import '../Fcss/FreeBoardList.css';
import { Link, useNavigate } from 'react-router-dom';

function FreeBoardList() {
	const [boardList, setBoardList] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setSearch(e.target.value);
  }

	// useEffect(() => {
  //   axios.get(`${process.env.REACT_APP_SERVER_URL}/fboard`)
  //   .then(response => {
  //     setBoardList(response.data);
  //     setIsLoading(false);
  //   }).catch(error => {
  //     console.log(error);
  //   }) 
  // },[])
	
	if(isLoading)
	return <div>로딩중...</div>

  return (
    <div className="fb-list-con">
      <div className="fb-title">
        <h3>자유게시판</h3>
      </div>

      <div className="fb-search-con">
        <div className="fb-search-window">
          <div className="fb-search-wrap">
            <input type="text" name="search" placeholder="검색어를 입력해주세요." onChange={changeHandler} />
            <button className="search-btn btn-dark">검색</button>
          </div>
        </div>
      </div>
      
      <div id="board-list">
        <div className="fb-con">
          <table className="fb-table">
            <thead>
              <tr>
                <th scope="col" className="th-num">번호</th>
                <th scope="col" className="th-title">제목</th>
                <th scope="col" className="th-writer">작성자</th>
                <th scope="col" className="th-date">작성일</th>
                <th scope="col" className="th-view">조회수</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>3</td>
                <th>
                  <Link to={''}>공지사항</Link>
                </th>
                <td>관리자</td>
                <td>2017.07.13</td>
                <td>12</td>
              </tr>
              <tr>
              <td>3</td>
              <th>
                <Link to={''}>공지사항</Link>
              </th>
              <td>관리자</td>
              <td>2017.07.13</td>
              <td>12</td>
            </tr>
            <tr>
              <td>3</td>
              <th>
                <Link to={''}>공지사항</Link>
              </th>
              <td>관리자</td>
              <td>2017.07.13</td>
              <td>12</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className='button-box'>
        <button className="write-btn btn-dark" onClick={() => {
          navigate('/fbwrite');
        }}>글쓰기</button>
      </div>
    </div>
  );
}

export default FreeBoardList;