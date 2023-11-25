import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../Fcss/FreeBoardDetail.css';
import axiosInstance from "../axiosInstance";

function FreeBoardDetail({ userInfo }) {

  const {fbno} = useParams();
  const [board, setBoard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState();
  const [commentList, setCommentList] = useState([]);
  const [reply, setReply] =useState({
    fbrContent : '',
    user : userInfo
  });

  const navigate = useNavigate();
  
  useEffect(() => {
    axiosInstance.get(`/fboarddetail/${fbno}?page=${page}&size=${pageSize}`)
    .then((response) => {
      if(response.data) {
      setBoard(response.data.freeBoard);
      setCommentList(response.data.replyList)
      setTotalPages(response.data.totalPages);
      setIsLoading(true);
    }
    }).catch((error) => {
      console.log(error);
    })
    }, [fbno, page, pageSize]);

  const changeHandler = (e) => {
    setReply((prevReply) => ({
      ...prevReply,
      [e.target.name]: e.target.value,
    }));
  }

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const submitReply = () => {
    if (reply.fbrContent.trim() === "") {
      alert("댓글을 입력해주세요.");
      return;
    }

    // 댓글 등록 API 호출
    axiosInstance.post("/replies", {
      fbrContent: reply.fbrContent,
      user: reply.user,
      freeBoard: board,
    }).then((response) => {
      axiosInstance.get(`/fboarddetail/${fbno}?page=${page}&size=${pageSize}`)
      .then((response) => {
        if(response.data) {
          setCommentList(response.data.replyList);
          setTotalPages(response.data.totalPages);
        }
      }).catch((err) => {
        console.log(err);
      });
      setReply({ ...reply, fbrContent: "" });
    }).catch((error) => {
      console.log(error);
      alert("댓글 등록 중 오류가 발생했습니다.");
    });
  }

  const deleteReply = (fbrNo) => {
    axiosInstance.delete(`/replies/${fbrNo}`)
        .then(response => {
            axiosInstance.get(`/fboarddetail/${fbno}?page=${page}&size=${pageSize}`)
            .then((response) => {
              setCommentList(response.data.replyList);
              setTotalPages(response.data.totalPages);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(error => {
            console.log(error);
            // 삭제 실패에 대한 처리를 추가할 수 있습니다.
        });
};

  // 댓글 삭제 버튼 클릭 시 실행되는 함수
  const handleDeleteReply = (fbrNo) => {
      // 사용자에게 확인 메시지를 보여주고, 확인 시에만 삭제 진행
      const isConfirmed = window.confirm('댓글을 삭제하시겠습니까?');
      if (isConfirmed) {
          deleteReply(fbrNo);
      }
  };
  
  if(!isLoading)
    return <div>로딩중...</div>

  return(
    <div className="fb-detail-con">
      <h3 className="fb-detail-title">게시글 상세페이지</h3>
      <div className="fb-detail-window">
        <table className="fb-detail-table">
          <colgroup>
            <col width="15%"/>
            <col width="35%"/>
            <col width="15%"/>
            <col width="*"/>
          </colgroup>
          
          <tbody>
            <tr>
              <th>제목</th>
              <td>{board.fbTitle}</td>
              <th>조회수</th>
              <td>{board.fbViews + 1}</td>
            </tr>
            <tr>
                <th>작성자</th>
                <td>{board.user.userRname}</td>
                <th>작성일</th>
                <td>{board.fbCreateBoard}</td>
            </tr>
            <tr>
              <th className="fb-detail-content">내용</th>
              <td colSpan="3">
               {board.fbContent}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="fb-detail-btn-box">
          <button className="fb-detail-back-btn" onClick={() => {
            navigate('/fbList');
          }}>목록</button>
          <button className="fb-detail-modify-btn" onClick={() => {
            if(userInfo.userRname !== board.user.userRname) {
              alert('작성자만 수정 가능합니다');
            } else {
              navigate(`/fbupdate/${fbno}`);
            }
          }}>수정</button>
          <button className="fb-detail-delete-btn" onClick={() => {
            if(userInfo.userRname !== board.user.userRname) {
              alert('작성자만 삭제 가능합니다');
            } else {
              axiosInstance.delete(`/fboard/${fbno}`)
              .then(response => {
                alert(response.data);
                navigate('/fbList');
              }).catch(error => {
                console.log(error);
              })
            }
          }}>삭제</button>
        </div>
      </div>

          
      <div className="fb-comment-section">
        <div className="fb-comment-input">
          <input
            id="reply-input"
            type="text"
            name="fbrContent"
            placeholder="댓글을 입력하세요"
            value={reply.fbrContent}
            onChange={changeHandler}
          />
          <button className="fb-comment-submit" onClick={submitReply}>
            등록
          </button>
        </div>

        {commentList.length !== 0 ?
        <>
          <div className="fb-comment-list">
            {commentList.map((replyItem, i) => (
              <div className="fb-comment" key={i}>
                <div className="fb-comment-info">
                  <span className="fb-comment-author">{replyItem.user.userRname}</span>
                  <span className="fb-comment-date">{replyItem.fbrCreateDate}</span>
                </div>
                <div className="fb-comment-modify-box">
                  <p className="fb-comment-text">{replyItem.fbrContent}</p>
                  <button className="fb-comment-delete-btn" onClick={() => {
                    if(replyItem.user.userRname === userInfo.userRname) {
                      handleDeleteReply(replyItem.fbrNo);
                    } else {
                      alert('작성자만 삭제 가능합니다');
                    }
                    }}>✕</button>
                </div>
              </div>
            ))}
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
        </> : <div>등록된 댓글이 없습니다</div> }
      </div>
    </div>
  );
}

export default FreeBoardDetail;