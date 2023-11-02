import { useEffect, useState } from "react";
import './MultiCheck.css';

function MultiCheck({ selectedType }) {

  const [checkboxes, setCheckboxes] = useState([]);

  

  const addCheckbox = () => {
    // 기존 배열을 복사하고, 그 뒤에 false를 추가(펄스는 체크박스의 초기상태)
    const newCheckboxes = [...checkboxes, false];
    setCheckboxes(newCheckboxes);
  };

  const deleteCheckbox = (index) => {
    // index를 통해 삭제할 체크박스를 식별
    // 새로운 배열을 생성하여 삭제할 체크박스를 제외한 나머지를 유지
    const updatedCheckboxes = checkboxes.filter((_, i) => i !== index);

    // 새로운 배열을 상태로 설정하여 체크박스를 삭제
    setCheckboxes(updatedCheckboxes);
  };

  const handleCheckboxChange = (index) => {
    const newCheckboxes = checkboxes.map((_, i) => i === index);
    setCheckboxes(newCheckboxes);
  };





  useEffect(() => {
    // selectedType이 변경될 때 초기화 작업 수행
    // 여기에서 options-container를 초기화하거나 다른 작업을 수행합니다.
    // 이 예시에서는 options-container를 초기화하는 것으로 가정합니다.
    setCheckboxes([]); // 체크박스 초기화
  }, [selectedType]);




  return (
    <div className="addCheck">
      {selectedType === '다중 체크' && (
        <button onClick={addCheckbox} className="Add">╊ 옵션추가</button>
        )
      }
      {/* 다중체크 타입에 대한 렌더링 및 동작 추가 */}
      {
        checkboxes.map((isChecked, index) => (    
           <div key={index}>
          <label className="MLabel">
            <input
              className="checkOption"
              type="checkbox"
              checked={isChecked}
              onChange={(e) => {
                const newCheckboxes = [...checkboxes];
                newCheckboxes[index] = e.target.checked;
                setCheckboxes(newCheckboxes);
              }}
            />
            <input type="text" className="OptionText" placeholder='옵션 입력' />
            
            <button onClick={() => deleteCheckbox(index)} className="DeleteOption">X</button>
          </label>
        </div>
        ))}
    </div>
  );
            }

export default MultiCheck;
