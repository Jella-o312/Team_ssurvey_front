import { useEffect, useState } from "react";
import './SingleCheck.css';

function SingleCheck({ selectedType, data , handleAddQ }) {

  const [selectedOption, setSelectedOption] = useState(''); // 선택된 옵션
  const [options, setOptions] = useState([]); // 옵션 목록


  const addOption = () => {
    // 새로운 옵션을 추가
    setOptions([...options, '']);
  };

  const deleteOption = (e, index) => {
    // 특정 인덱스의 옵션을 삭제
    const updateOpt = [...options];
    updateOpt.splice(index, 1);
    setOptions(updateOpt);
    handleAddQ(e,data,updateOpt);
    // if (selectedOption === options[index]) {
    //   setSelectedOption();
    //   console.log( setSelectedOption);
    //  성춘씨 사용가능}
  };

  useEffect(() => {
    // 선택된 타입이 변경될 때 초기화 작업 수행
    setSelectedOption('');
    setOptions([]); // 옵션 초기화
  }, [selectedType]);


  const handleOptionChange = (e, index) => {
    const updateOpt = [...options];
    updateOpt[index] = e.target.value;
    setOptions(updateOpt);
  
    // if (selectedOption === options[index]) {
    //   setSelectedOption(e.target.value);
    // 성춘씨 사용가능}
    handleAddQ(e,data,updateOpt);
  };






  return (
    <div className="addCheck">
      {selectedType === '객관식' && (
        <button onClick={addOption} className="Add">╊ 옵션추가</button>
      )}

      <div className="options-container">
          
        {options.map((option, index) => (
          <div key={index}>
            <label className="Qlabel">
              <input
                type="radio"
                className="radioBtn"
                name="options" // 같은 name을 가진 라디오 버튼들은 하나만 선택됨
                value={option}
                checked={selectedOption === option}
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              <input
                type="text"
                className="SOptionText"
                placeholder='옵션 입력'
                value={option}           
                onChange={(e) => handleOptionChange(e, index)}    
              />
              <button onClick={(e) => deleteOption(e,index)} className="DeleteOption">X</button>
            </label>
          </div>
        ))}

      </div>
    </div>
  );
}

export default SingleCheck;