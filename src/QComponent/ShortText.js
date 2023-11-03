
import { useState } from 'react';
import './ShortText.css';


function ShortText({ selectedType }) {

  const [ shortText, setShortText] = useState(''); // shortText 상태 변수를 빈 문자열로 초기화

  // const handleInputChange = (e) => {
  //   setShortText(e.target.value);
  // };

  // const handleEnterPress = (e) => {
  //   if (e.key === 'Enter') {
  //     // 엔터 키를 누르면 shortText 상태를 업데이트
  //     // 이제 shortText 변수에 입력된 내용이 저장됩니다.
  //     console.log(shortText); // 현재는 콘솔에 출력하고 있으므로 원하는 동작으로 변경 가능
  //   }
  // };



  return (
    <div className="ShortA">
 
    {selectedType === '단답형' && (    
          <input type="text" className="ShortA" placeholder='  단답형 답변'
          id="Shorttxt" disabled
          value={shortText} // 입력 필드의 값을 상태로 설정
          // onChange={handleInputChange} // 입력 필드 내용이 변경될 때 호출
          // onKeyPress={handleEnterPress} // 키 입력 이벤트 처리
          />      
       
          )}
      </div>
  );       
    } 
          
 

export default ShortText;