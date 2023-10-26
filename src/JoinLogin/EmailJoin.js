import { Form } from 'react-bootstrap';
import './EmailJoin.css';

const EmailJoin = () =>{


  return(
    <div className="ejoin-container">
      <div className='ejoin-box'>
        <h3>참 쉬운 회원가입!</h3>

        <div className='ejoin-form'>
          <span className='ejoin-form-title'>이름</span>
          <input id='join-name-txt' type="text" placeholder="이름(실명)을 입력해주세요" />

          <div>
            <span className='ejoin-form-title'>나이</span>
            <Form.Select aria-label="Default select example">
              <option>언제 태어나셨나요?</option>
              1960~2023
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
            
            <span className='join-box-inner-title'>성별</span>
            <input id='join-name-txt' type="text" placeholder="이름(실명)을 입력해주세요" />
          </div>

        </div>

        <div className='ejoin-confirm'>
          <button className='ejoin-confirm-no'>취소</button>
          <button className='ejoin-confirm-yes'>회원가입</button>
        </div>
      </div>

    </div>
  );
}

export default EmailJoin;