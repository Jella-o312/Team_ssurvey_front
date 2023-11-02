import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/WriteFreeBoard.css';

function WriteFreeBoard({ userInfo }) {

  const [board, setBoard] = useState({
    fbTitle : '',
    fbContent : '',
    writer : '',
    fbFiles : ''
  });

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setBoard({
      ...board,
      [e.target.name] : e.target.value
    })
  }

  return(
    <div className="form-container">
      <h3 className="write-title">게시판 글쓰기</h3>
        <div className="input-container">
          <label className="form-label" htmlFor="title">제목</label>
          <input type="text" id="title" name="fbTitle" placeholder="제목을 입력하세요" onChange={changeHandler}/>
        </div>
        <div className="input-container">
          <label className="form-label" htmlFor="content">내용</label>
          <textarea id="content" name="fbContent" placeholder="내용을 입력하세요" onChange={changeHandler}></textarea>
        </div>
        <div className="input-container">
          <label className="form-label" htmlFor="file">첨부파일</label>
          <input type="file" id="file" name="fbFiles" accept=".pdf, .doc, .docx, .jpg, .png" onChange={changeHandler}/>
        </div>
        <div className="button-container">
          <button className="write-cancel-btn" onClick={() => {
            navigate('/fbList');
          }}>취소</button>
          <button className="write-submit-btn" onClick={() => {
            if(board.fbTitle == '' || board.fbContent == '') {
              alert('ㄴㄴ');
            } else {
              alert('ㅇㅇ');
            }
          }}>등록</button>
        </div>
    </div>
  );
}

export default WriteFreeBoard;