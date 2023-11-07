import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../axiosInstance";

function UpdateFreeBoard() {

  const {fbno} = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [board, setBoard] = useState();

  const [newBoard, setNewBoard] = useState({
    fbTitle : '',
    fbContent : ''
  });

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setNewBoard({
      ...newBoard,
      [e.target.name] : e.target.value
    })
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

  if(isLoading)
  return <div>로딩중...</div>

  return(
    <div className="form-container">
      <h3 className="write-title">게시글 수정</h3>
        <div className="input-container">
          <label className="form-label" htmlFor="title">제목</label>
          <input type="text" id="title" name="fbTitle" onChange={changeHandler} defaultValue={board.fbTitle}/>
        </div>
        <div className="input-container">
          <label className="form-label" htmlFor="content">내용</label>
          <textarea id="content" name="fbContent" onChange={changeHandler} defaultValue={board.fbContent}></textarea>
        </div>
        <div className="button-container">
          <button className="write-cancel-btn" onClick={() => {
            navigate('/fbList');
          }}>취소</button>
          <button className="write-submit-btn" onClick={() => {
            if(newBoard.fbTitle === '' || newBoard.fbContent === '') {
              alert('수정 할 제목과 내용을 입력하세요');
            } else {
              axiosInstance.put(`/fboard/${fbno}`, newBoard)
              .then(response => {
                alert(response.data)
                navigate(`/fbdetail/${fbno}`);
              }).catch(error => {
                console.log(error);
              })
            }
          }}>수정완료</button>
        </div>
    </div>
  );
}

export default UpdateFreeBoard;