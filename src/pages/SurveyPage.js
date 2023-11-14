import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import './SurveyPage.css';
import { useNavigate } from "react-router-dom";
import Answer from "../pages/Answer";
import axiosInstance from "../axioslnstance";
import SurveyResult from "./SurveyResult";

const SurveyPage = ({userInfo}) => {
  const navigate = useNavigate();
  const [showParticipateModal, setShowParticipateModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [surveys, setSurveys] = useState([]);
  const [selectedSurveyNo, setSelectedSurveyNo] = useState(null);
  const [selectedSurveyTitle, setSelectedSurveyTitle] = useState(null);

  useEffect(() => {
    axiosInstance.get('/survey')
      .then(response => {
         // surveyCategory가 'survey'인 항목만 가져오기
        const surveyData = response.data.filter(survey => survey.surveyCategory === 'Survey');
        setSurveys(surveyData);
      })
      .catch((error) => {
        console.error('설문 정보를 가져오는 중 오류 발생:', error);
      });
    }, []);
    

    const handleParticipateClick = (surveyNo, surveyTitle) => {
      setSelectedSurveyNo(surveyNo);
      setSelectedSurveyTitle(surveyTitle); // 선택한 설문의 타이틀을 설정
      setShowParticipateModal(true);
    };
  
    const handleResultClick = (surveyNo, surveyTitle) => {
      setSelectedSurveyNo(surveyNo);
      setSelectedSurveyTitle(surveyTitle);
      setShowResultModal(true);
    };

  

  return (
    <>
     <div className="SSBanner"></div>
      {/* <Container className={`Survey_title survey`}>
        <h1 className={`survey-title`}>
          Survey
        </h1>
      </Container> */}

      <Container className={`MainSurveyBox survey`}>
        <Row xs={1} md={2} lg={3} className="g-4" style={{ margin: '10px', padding: '15px' }}>
          {surveys.map((surveyItem, j) => (
            <Col key={j} className={`col survey`}>
              <div className={`card survey`}>
                <div className="survey-content">
                  <h5 className="card-title">{surveyItem.surTitle}</h5>
                  <div className="LikeBtnCount">
                    <button className="btn like-btn">❤</button>
                    <span className="like-count">{surveyItem.surveyLike || 0}</span>
                  </div>
                  <i className={`survey-joinpeople`}>현재 {surveyItem.surveyCount}명 참여 중</i>
                  <div className="card-wrap">
                    <button className="btn submit-btn" onClick={() => handleParticipateClick(surveyItem.surveyNo, surveyItem.surTitle)}>
                      참여하기
                    </button>
                    <button className="btn result-btn view_more" onClick={() =>handleResultClick(surveyItem.surveyNo, surveyItem.surTitle)}>
                      결과보기
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      <Modal show={showParticipateModal} onHide={() => setShowParticipateModal(false)} centered className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>참여하기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Answer 컴포넌트에 surveyNo와 surveyTitle 전달 */}
          <Answer surveyNo={selectedSurveyNo} surveyTitle={selectedSurveyTitle} userInfo={userInfo} />
        </Modal.Body>
        
      </Modal>

      <Modal show={showResultModal} onHide={() => setShowResultModal(false)} centered className="result-modal">
        <Modal.Header closeButton>
          <Modal.Title>결과보기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
          <SurveyResult surveyNo={selectedSurveyNo} surveyTitle={selectedSurveyTitle} userInfo={userInfo} />
        </Modal.Body>
       
      </Modal>
    </>
  );
}

export default SurveyPage;