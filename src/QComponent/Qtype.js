import Dropdown from 'react-bootstrap/Dropdown';
import './Qtype.css';
import React, { useState } from 'react';



function Qtype({ selectedType, setSelectedType }) {


  const [selectedOption, setSelectedOption] = useState(null);

  const handleTypeSelect = (type) => {
    setSelectedOption(null); // 선택한 옵션 초기화
  
    if (type !== selectedType) {
      setSelectedType(type);
      // 여기에서 선택한 타입에 대한 추가 동작을 수행
    }
  };


  return (
    <div className='DropdownContainer'>
      <div className='DropdownList'>
    <div className='Dropdown'>
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
      {selectedType ? selectedType : '타입 선택'}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleTypeSelect('객관식')}>객관식</Dropdown.Item>
        <Dropdown.Item onClick={() => handleTypeSelect('다중 체크')}>다중 체크</Dropdown.Item>
        <Dropdown.Item onClick={() => handleTypeSelect('단답형')}>단답형</Dropdown.Item>
        <Dropdown.Item onClick={() => handleTypeSelect('장문형')}>장문형</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </div>
  
     </div>
      </div>
  );
}

export default Qtype;