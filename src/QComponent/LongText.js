import { useState } from 'react';
import './LongText.css';


function LongText({ selectedType }) {
  const [longText, setLongText] = useState('');

  const handleInputChange = (e) => {
    setLongText(e.target.value);
  };

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      // 엔터 키를 누르면 shortText 상태를 업데이트
      // 이제 shortText 변수에 입력된 내용이 저장됩니다.
      console.log(longText); // 현재는 콘솔에 출력하고 있으므로 원하는 동작으로 변경 가능
    }
  };


  return (
    <div className="LongA">   
    {selectedType === '장문형' && (    
          <input type="text" className="LongABox" placeholder='  장문 답변' 
          id="Longtxt" disabled
          value={longText} // 입력 필드의 값을 상태로 설정
          onChange={handleInputChange} // 입력 필드 내용이 변경될 때 호출
          onKeyPress={handleEnterPress} // 키 입력 이벤트 처리
          />       
          )}
      </div>
  );      
 
    }


export default LongText;