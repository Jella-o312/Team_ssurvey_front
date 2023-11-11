import { Accordion, Button, Pagination } from "react-bootstrap";
import './FAQ.css';
import { useState } from "react";
import { FAQ_surveyContent, FAQ_userInfoContent } from "./FAQText";

const FAQ = ()=>{

  const[FAQType, setFAQType] = useState('서베이');

  const handleFAQType = (e)=>{
    setFAQType(e.target.value);
  }

  console.log(FAQType);
  return(
    <div className="FAQ-container">
      <div className="FAQ-banner">
        <h4>FAQ <br/>자주 묻는 질문</h4>
      </div>

      <div className="FAQ-box">
        <div className="faq-content">
          <button className={`faq-btn ${FAQType==='서베이' ? 'faq-btn-click' : ''}`} value={'서베이'} onClick={handleFAQType}>서베이</button>
          <button className={`faq-btn ${FAQType==='회원가입' ? 'faq-btn-click' : ''}`} value={'회원가입'} onClick={handleFAQType}>회원가입</button>
        </div>

        <div className="faq-answer">
          <Accordion>
            { FAQType==='서베이' ?
             FAQ_surveyContent.map((data, i)=>{
              return(
                <Accordion.Item eventKey={`survey${i}`}>
                  <Accordion.Header className="faq-q-inner"><span className="faq-q-inner-icon">Q</span>{data.question}</Accordion.Header>
                  <Accordion.Body className="faq-a-inner">
                   {data.answer}
                  </Accordion.Body>
                </Accordion.Item>
              );
             }) 

             :

             FAQ_userInfoContent.map((data, i)=>{
              return(
                <Accordion.Item eventKey={`userInfo${i}`}>
                  <Accordion.Header><span className="faq-q-inner-icon">Q</span>{data.question}</Accordion.Header>
                  <Accordion.Body className="faq-answer-inner">
                    {data.answer}
                  </Accordion.Body>
                </Accordion.Item>
              );
             })
            }
        </Accordion>
        </div>
      </div>

      <div className="faq-page">
        <Pagination>
          <Pagination.Prev />
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Next />
        </Pagination>
      </div>
    </div>
  );
}

export default FAQ;