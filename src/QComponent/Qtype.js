import Dropdown from 'react-bootstrap/Dropdown';
import './Qtype.css';
import React, { useState } from 'react';



function Qtype({handleOptionSelect, selectedType}) {

 
  return (
    <div className='DropdownContainer'>
      <div className='DropdownList'>
    <div className='Dropdown'>
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
      {selectedType ? selectedType : '타입 선택'}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() =>  handleOptionSelect('객관식')}>객관식</Dropdown.Item>
        <Dropdown.Item onClick={() =>  handleOptionSelect('다중 체크')}>다중 체크</Dropdown.Item>
        <Dropdown.Item onClick={() =>  handleOptionSelect('단답형')}>단답형</Dropdown.Item>
        <Dropdown.Item onClick={() =>  handleOptionSelect('장문형')}>장문형</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </div>
  
     </div>
      </div>
  );
}

export default Qtype;