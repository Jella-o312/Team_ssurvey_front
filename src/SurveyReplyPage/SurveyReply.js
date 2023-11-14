import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './SurveyReply.css';
import axios from 'axios';

const SurveyReply = ({ userInfo, comment }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const commentsPerPage = 10; // 한 페이지당 댓글 수

  // 컴포넌트가 마운트될 때 서버에서 댓글 데이터를 가져옴
  useEffect(() => {
    axios.get('/api/comments') // 서버 API 엔드포인트로 변경
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error('댓글 데이터를 불러오는 중 오류 발생:', error);
      });
  }, []);

  const addComment = () => {
    if (newComment) {
      const commentData = {
        content: newComment,
        author: userInfo.userRname, // 작성자 정보를 사용자 정보에서 가져와야 함
        srCreateDate: new Date(),
      };

      // 서버에 새로운 댓글 추가 요청 보내고, 성공하면 댓글 목록을 업데이트
      axios.post('/api/comments', commentData)
        .then((response) => {
          setComments([...comments, response.data]);
          setNewComment('');
        })
        .catch((error) => {
          console.error('댓글 추가 중 오류 발생:', error);
        });
    }
  };

  // 현재 페이지에 표시할 댓글 범위 계산
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

  // 페이지 변경
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="comment-container">
      <h2>댓글</h2>

      <div className="comment-input">
        <input
          type="text"
          placeholder="댓글을 입력하세요"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={addComment}>댓글 작성</button>
      </div>

      <div className="comment-list">
        {currentComments.map((comment, index) => (
          <div className="comment" key={index}>
            <p>
              <a>작성자 : {comment.author}</a>
              {comment.content}
              <button className='sr-modify-btn'>{/* 수정 버튼 로직 추가 */}</button>
              <button className='sr-delete-btn'>{/* 삭제 버튼 로직 추가 */}</button>
              <br />
              <span>작성일: {comment.srCreateDate.toLocaleString()}</span>
            </p>
          </div>
        ))}
      </div>

      <ul className="pagination">
        {Array(Math.ceil(comments.length / commentsPerPage))
          .fill()
          .map((_, i) => (
            <li key={i} className="page-item">
              <button
                className="page-link"
                onClick={() => paginate(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SurveyReply;
