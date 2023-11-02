import { useEffect, useState } from 'react';
import './Question.css';



function Question() {
  const [Qinput, setQuestion] = useState('');


  useEffect(() => {
    console.log(Qinput); 
  }, [Qinput]);

const handleInputChange = (e) => {
  setQuestion(e.target.value);
};

  
return (
  <div>
    <input type="text" placeholder='질문을 입력하세요'
    value={Qinput} name="inputQ" id="inputQ" onChange={handleInputChange}
    className="InsertQ"
     />   
<hr/>


     </div>

);
  }

export default Question ;