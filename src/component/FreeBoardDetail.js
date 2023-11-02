import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../css/FreeBoardDetail.css';

function FreeBoardDetail({ userInfo }) {

  const {id} = useParams();
  const [board, setBoard] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [reply, setReply] =useState('');

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setReply(e.target.value);
  }

  // useEffect(() => {
  //   axios.get(`${process.env.REACT_APP_SERVER_URL}/fboard/${id}`)
  //   .then(response => {
  //     setBoard(response.data);
  //     setIsLoading(false);
  //   }).catch(error => {
  //     console.log(error);
  //   })
  // },[id])

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
              <td>테스트</td>
              <th>조회수</th>
              <td>1</td>
            </tr>
            <tr>
                <th>작성자</th>
                <td>관리자</td>
                <th>작성일</th>
                <td>2023-01-01</td>
            </tr>
            <tr>
              <th className="fb-detail-content">내용</th>
              <td colSpan="3">
                  테스트 내용입니다
              </td>
            </tr>
          </tbody>
        </table>
        <div className="fb-detail-btn-box">
          <button className="fb-detail-back-btn" onClick={() => {
            navigate('/fbList');
          }}>목록</button>
          <button className="fb-detail-modify-btn" onClick={() => {
            navigate('/fbupdate');
          }}>수정</button>
          <button className="fb-detail-delete-btn">삭제</button>
        </div>
      </div>
      <div className="fb-comment-section">
        <div className="fb-comment-input">
          <input id="reply-input" type="text" placeholder="댓글을 입력하세요" onChange={changeHandler}/>
          <button className="fb-comment-submit" onClick={() => {
            if(reply == '') {
              alert('ㄴㄴ');
            } else {
              alert('ㅇㅇ');
            }
          }}>등록</button>
        </div>
        <div className="fb-comment-list">
          <div className="fb-comment">
            <div className="fb-comment-info">
              <span className="fb-comment-author">사용자1:</span>
              <span className="fb-comment-date">2023-01-03</span>
            </div>
            <p className="fb-comment-text">댓글 내용입니다.</p>
          </div>
          <div className="fb-comment">
            <div className="fb-comment-info">
              <span className="fb-comment-author">사용자2:</span>
              <span className="fb-comment-date">2023-01-04</span>
            </div>
            <p className="fb-comment-text">댓글 내용입니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FreeBoardDetail;