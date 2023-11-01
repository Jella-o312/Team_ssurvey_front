import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import './SurveyReply.css';

const SurveyReply = () => {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  
  const addComment = () => {
    if (newComment) {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };
  
  return (
    <div className="comment-container">
      <h2>댓글</h2>
      <div className="comment-list">
        {comments.map((comment, index) => (
          <div className="comment" key={index}>
            <p>{comment}</p>
          </div>
        ))}
      </div>
      <div className="comment-input">
        <input
          type="text"
          placeholder="댓글을 입력하세요"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          />
        <button onClick={addComment}>댓글 작성</button>
      </div>
    </div>
  );
};

export default SurveyReply;