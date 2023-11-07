import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../Fcss/FreeBoardDetail.css';
import axiosInstance from "../axiosInstance";

function FreeBoardDetail({ userInfo }) {

  const {fbno} = useParams();
  const [board, setBoard] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isRLoading, setIsRLoading] = useState(true);
  const [reply, setReply] =useState({
    fbrContent : '',
    user : userInfo,
    freeBoard : board
  });

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setReply({
      ...reply,
      [e.target.name] : e.target.value
    });
  }

  useEffect(() => {
    axiosInstance.get(`/fboard/${fbno}`)
    .then(response => {
      setBoard(response.data);
      setIsLoading(false);
    }).catch(error => {
      console.log(error);
    })
  },[fbno])

  useEffect(() => {
    axiosInstance.get(`/freply/${fbno}`)
      .then(res => {
        setIsRLoading(false);
      }).catch(err => {
        console.log(err);
      })
  })

  if(isLoading)
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

      {isRLoading ?
      <div className="fb-comment-section">
        <div className="fb-comment-input">
          <input id="reply-input" type="text" name="fbrContent" placeholder="댓글을 입력하세요" onChange={changeHandler}/>
          <button className="fb-comment-submit" onClick={() => {
            if(reply === '') {
              alert('댓글을 입력해주세요');
            } else {
              axiosInstance.post('/freply', reply)
              .then(res => {
                
              }).catch(err => {
                console.log(err);
              })
            }
          }}>등록</button>
        </div>
        <div className="fb-comment-list">
          {/* 반복할구간 */}
          <div className="fb-comment">
            <div className="fb-comment-info">
              <span className="fb-comment-author">사용자1</span>
              <span className="fb-comment-date">2023-01-03</span>
            </div>
            <p className="fb-comment-text">댓글 내용입니다.</p>
          </div>

          <div className="fb-comment">
            <div className="fb-comment-info">
              <span className="fb-comment-author">사용자2</span>
              <span className="fb-comment-date">2023-01-04</span>
            </div>
            <p className="fb-comment-text">댓글 내용입니다.</p>
          </div>
        </div>
      </div> : <div>로딩중...</div>}
    </div>
  );
}

export default FreeBoardDetail;