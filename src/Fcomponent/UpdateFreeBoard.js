import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UpdateFreeBoard() {

  const [board, setBoard] = useState({
    title : '',
    content : ''
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
      <h3 className="write-title">게시글 수정</h3>
        <div className="input-container">
          <label className="form-label" htmlFor="title">제목</label>
          <input type="text" id="title" name="title" placeholder="제목을 입력하세요" onChange={changeHandler}/>
        </div>
        <div className="input-container">
          <label className="form-label" htmlFor="content">내용</label>
          <textarea id="content" name="content" placeholder="내용을 입력하세요" onChange={changeHandler}></textarea>
        </div>
        <div className="button-container">
          <button className="write-cancel-btn" onClick={() => {
            navigate('/fbList');
          }}>취소</button>
          <button className="write-submit-btn" onClick={() => {
            if(board.title == '' || board.content == '') {
              alert('ㄴㄴ');
            } else {
              alert('ㅇㅇ');
            }
          }}>수정완료</button>
        </div>
    </div>
  );
}

export default UpdateFreeBoard;