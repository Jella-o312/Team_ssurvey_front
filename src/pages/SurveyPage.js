import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import './SurveyPage.css';
import { useNavigate } from "react-router-dom";
import Answer from "../pages/Answer";
import SurveyReply from "../SurveyReplyPage/SurveyReply";
import { Routes, Route } from "react-router-dom";
import axiosInstance from "../axioslnstance";

const SurveyPage = () => {
  const navigate = useNavigate();
  const [showParticipateModal, setShowParticipateModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    axiosInstance.get('/survey')
      .then(response => {
        // surveyCategory가 'survey'인 항목만 가져오기
        const surveyData = response.data.filter(survey => survey.surveyCategory === 'survey');
        setSurveys(surveyData);
        console.log(surveyData);
      })
      .catch((error) => {
        console.error('설문 정보를 가져오는 중 오류 발생:', error);
      });
  }, []);

  const handleParticipateClick = () => {
    setShowParticipateModal(true);
  };

  const handleResultClick = () => {
    setShowResultModal(true);
  };

  return (
    <>
      <Container className={`Survey_title survey`}>
        <h1 className={`survey-title`}>
          Survey
        </h1>
      </Container>

      <Container className={`MainSurveyBox survey`}>
        <Row xs={1} md={2} lg={3} className="g-4" style={{ margin: '10px', padding: '15px' }}>
          {surveys.map((surveyItem, j) => (
            <Col key={j} className={`col survey`}>
              <div className={`card survey`}>
                <div className="survey-content">
                  <h5 className="card-title">{surveyItem.surveyTitle}</h5>
                  {/* {surveyItem.surveyCategory === 'survey' && (
                    <img src={surveyItem.imgSrc} className="card-img-top" alt={surveyItem.title} />
                  )} */}
                  <div className="LikeBtnCount">
                    <button className="btn like-btn">❤</button>
                    <span className="like-count">{surveyItem.surveyLike || 0}</span>
                  </div>
                  <i className={`survey-joinpeople`}>현재 {surveyItem.surveyCount}명 참여 중</i>
                  <div className="card-wrap">
                    <button className="btn submit-btn" onClick={handleParticipateClick}>
                      참여하기
                    </button>
                    <button className="btn result-btn view_more" onClick={handleResultClick}>
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
          <Answer />
          <SurveyReply /> {/* 임시로 어떻게 들어가나 넣어봄 사이즈 확인겸 */}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowParticipateModal(false)}>닫기</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showResultModal} onHide={() => setShowResultModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>결과보기</Modal.Title>
          <SurveyReply /> {/* 임시로 어떻게 들어가나 넣어봄 사이즈 확인겸 */}
        </Modal.Header>
        <Modal.Body>
          <p>결과보기 모달 내용입니다.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowResultModal(false)}>닫기</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SurveyPage;
