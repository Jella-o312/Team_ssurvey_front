import Dropdown from 'react-bootstrap/Dropdown';
import './Qtype.css';
import React, { useState } from 'react';



function Qtype({ data , handleAddQ, surveyList, setSurveyList, type}) {


  return (
    <div className='DropdownContainer'>
      <div className='DropdownList'>
    <div className='Dropdown'>
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
      {data.sqType ? data.sqType : '타입 선택'}
      </Dropdown.Toggle>

    { type=== 'Survey' &&
      <Dropdown.Menu>
        <Dropdown.Item onClick={(e) =>  handleAddQ(e, data,'객관식')}>객관식</Dropdown.Item>
        <Dropdown.Item onClick={(e) =>  handleAddQ(e, data,'다중 체크')}>다중 체크</Dropdown.Item>
        <Dropdown.Item onClick={(e) =>  handleAddQ(e, data,'단답형')}>단답형</Dropdown.Item>
        <Dropdown.Item onClick={(e) =>  handleAddQ(e, data,'장문형')}>장문형</Dropdown.Item>
      </Dropdown.Menu>
    }

    { type=== 'Fun' &&
      <Dropdown.Menu>
        <Dropdown.Item onClick={(e) =>  handleAddQ(e, data,'객관식')}>객관식</Dropdown.Item>
        <Dropdown.Item onClick={(e) =>  handleAddQ(e, data,'다중 체크')}>다중 체크</Dropdown.Item>
      </Dropdown.Menu>
    }
 </Dropdown>
    </div>
  
     </div>
      </div>
  );
}

export default Qtype;