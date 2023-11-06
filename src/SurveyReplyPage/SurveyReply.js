import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import './SurveyReply.css';

const SurveyReply = ({ userInfo }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const commentsPerPage = 10; // 한 페이지당 댓글 수

  const addComment = () => {
    if (newComment) {
      const commentData = {
        author: userInfo.userName, // 작성자 이름 author로
        content: newComment,
        date: new Date(),
      };
      setComments([...comments, commentData]);
      setNewComment('');
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
            <button className='sr-modify-btn'
            // onClick={modify}
            >
            수정
            </button>
            <button className='sr-move-btn'
            // onClick={modify}
            >
            삭제
            </button> <br/>
            <span>작성일: {comment.date.toLocaleString()}</span>
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