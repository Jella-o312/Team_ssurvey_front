import { useEffect, useState } from 'react';
import '../Fcss/FreeBoardList.css';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

function FreeBoardList({ isLogin }) {
	const [boardList, setBoardList] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  
  const navigate = useNavigate();

  
	useEffect(() => {
    axiosInstance.get(`/fboard?page=${page}&size=${pageSize}`, {params : {'search' : search}})
    .then((res) => {
      if(res.data.content) {
      setBoardList(res.data.content);
      setTotalPages(res.data.totalPages);
      setIsLoading(true);
    }
  }).catch((error) => {
    console.log(error);
  }) 
},[page, pageSize])

  const changeHandler = (e) => {
    setSearch(e.target.value);
  }
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

	if(!isLoading)
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
            <button className="search-btn btn-dark" onClick={() => {
              axiosInstance.get(`/fboard?page=${page}&size=${pageSize}`, {params : {'search' : search}})
              .then((res) => {
                setBoardList(res.data.content);
                setTotalPages(res.data.totalPages);
                setIsLoading(true);
              }).catch((error) => {
                console.log(error);
              }) 
            }}>검색</button>
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
              {
                boardList.map((board, i) => {
                  return(
                    <tr key={i}>
                      <td>{board.fbNo}</td>
                      <th>
                        <Link to={`/fbdetail/${board.fbNo}`} onClick={(e) => {
                          if(!isLogin) {
                            e.preventDefault();
                            alert('로그인 후 이용 가능합니다');
                            navigate('/login');
                          } else {
                            axiosInstance.put(`/fboard/view/${board.fbNo}`)
                            .then((res) => {

                            }).catch((err) => {
                                console.log(err);
                            })
                          }
                        }}>{board.fbTitle} [{board.fbReplyList.length}]</Link>
                      </th>
                      <td>{board.user.userRname}</td>
                      <td>{board.fbCreateBoard}</td>
                      <td>{board.fbViews}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
      <div className='button-box'>
        <button className="write-btn btn-dark" onClick={() => {
          if(isLogin){
            navigate('/fbwrite');
          } else {
            alert('로그인 후 이용 가능합니다');
            navigate('/login');
          }
        }}>글쓰기</button>
      </div>
      <div className='fb-page-btn'>
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 0}>
          이전
        </button>
        {Array.from(Array(totalPages).keys()).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            disabled={page === pageNumber}
            className={page === pageNumber ? 'fb-selected-btn' : ''}
          >
            {pageNumber + 1}
          </button>
        ))}
        <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages - 1}>
          다음
        </button>
      </div>
    </div>
  );
}

export default FreeBoardList;
