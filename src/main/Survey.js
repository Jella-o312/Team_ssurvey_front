import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import './Survey.css';
import { useNavigate } from "react-router-dom";
import Answer from "../pages/Answer";
import SurveyReply from "../SurveyReplyPage/SurveyReply";
import axiosInstance from "../axioslnstance";

const Survey = ({ boardType }) => {
  const navigate = useNavigate();
  const [showParticipateModal, setShowParticipateModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [survey, setSurvey] = useState([]);
  const [loadMoreCount, setLoadMoreCount] = useState(6);

  // React 컴포넌트 내에서 API를 호출하는 함수 예제
  useEffect(() => {
    axiosInstance.get('/survey')
      .then(response => {
        setSurvey(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('설문 정보를 가져오는 중 오류 발생:', error);
      });
  }, []);


  const handleLoadMore = () => {
    const additionalSurveys = Math.min(3, survey.length - loadMoreCount);
    const newLoadMoreCount = loadMoreCount + additionalSurveys;
    setLoadMoreCount(newLoadMoreCount);
  };


  const handleParticipateClick = () => {
    setShowParticipateModal(true);
  };

  const handleResultClick = () => {
    setShowResultModal(true);
  };

  return (
    <>

      <Container className={`Survey_title ${boardType} ${survey.surveyCategory}`}>
        <h1 className={`${boardType}-title`}>
          {boardType === 'fun' ? 'Fun' : 'Survey'}
          {loadMoreCount < survey.length && (
            <Button className="btn-more" onClick={handleLoadMore}>
              더 보기
            </Button>
          )}
        </h1>
      </Container>

      <Container className={`MainSurveyBox ${boardType}`}>
        <Row xs={1} md={2} lg={3} className="g-4" style={{ margin: '10px', padding: '15px' }}>
          {survey.map((survey, i) => (
            <Col className={`col ${boardType}`} key={i}>
              <div className={`card ${boardType}`}>
                <img src={survey.imgSrc} className="card-img-top" alt={survey.title} />
                <h5 className="card-title">{survey.surveyTitle}</h5>
                <div className="LikeBtnCount">
                  <button className="btn like-btn">❤</button>
                  <span className="like-count">{survey.surveyLike || 0}</span>
                </div>
                <i className={`${boardType}-joinpeople`}>현재 {survey.surveyCount}명 참여 중</i>
                <div className="card-wrap">
                  <button className="btn submit-btn" onClick={handleParticipateClick}>
                    참여하기
                  </button>
                  <button className="btn result-btn view_more" onClick={handleResultClick}>
                    결과보기
                  </button>
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

export default Survey;