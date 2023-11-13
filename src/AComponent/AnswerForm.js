
import SingleCheckType from '../TypeComponent/SingleCheckType';
import './AnswerForm.css';

const AnswerForm = () => {


return (
  <>
   
   <div className="AWrap">
        <div className="ABox">
          <p className="sendedQ">
            받아온 질문
            {/* <SingleCheckType /> */}
          </p>
          <hr />
          <p className="sendedAForm">받아온 답변창</p>
          
        </div>
      </div>
  </>
);

};
export default AnswerForm;