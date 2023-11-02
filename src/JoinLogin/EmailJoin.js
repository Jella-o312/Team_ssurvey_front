import { useState } from 'react';
import './EmailJoin.css';
import { useEffect } from 'react';
import Terms1 from '../joinFolder/joinTerms/Terms1';
import Terms2 from '../joinFolder/joinTerms/terms2';
import Terms3 from '../joinFolder/joinTerms/Terms3';
import { JoinAddressCity, JoinAddressTown } from '../joinFolder/JoinAddress';
import JoinTemsPage from './JoinTemsPage';
import EjoinInputPage from './EjoinInputPage';


const EmailJoin = () =>{

  // 약관동의, 회원가입 입력페이지 나누는 스테이트 (true가 약관동의, false가 회원가입 입력)
  const [ejoinPage, setEjoinPage] = useState(false);
  
  return(
    <div className='ejoin' >
  
      {/* ejoinPage가 false 일때만  회원가입 입력 페이지 보임 */}
      {ejoinPage ===false ? 
        <JoinTemsPage setEjoinPage = {setEjoinPage}/>  
        :  
        <EjoinInputPage />
      }

    </div>
  );
}

export default EmailJoin;