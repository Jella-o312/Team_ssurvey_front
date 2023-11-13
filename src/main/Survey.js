import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import './Survey.css';
import { useNavigate } from "react-router-dom";
import Answer from "../pages/Answer";
import SurveyReply from "../SurveyReplyPage/SurveyReply";
import axiosInstance from "../axioslnstance";
import SurveyResult from "../pages/SurveyResult";

const Survey = () => {
  const navigate = useNavigate();
  const [showParticipateModal, setShowParticipateModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [surveys, setSurveys] = useState([]);
  const [loadMoreCount, setLoadMoreCount] = useState(3);
  const [selectedSurveyNo, setSelectedSurveyNo] = useState(null);
  const [selectedSurveyTitle, setSelectedSurveyTitle] = useState(null); // 새로운 상태 추가

  useEffect(() => {
    axiosInstance.get('/survey')
      .then(response => {
        setSurveys(response.data);
      })
      .catch((error) => {
        console.error('설문 정보를 가져오는 중 오류 발생:', error);
      });
  }, []);

  const handleButtonClick = (category) => {
    if (category === 'fun') {
      navigate('/fun');
    } else {
      navigate('/survey');
    }
  };

  const handleParticipateClick = (surveyNo, surveyTitle) => {
    setSelectedSurveyNo(surveyNo);
    setSelectedSurveyTitle(surveyTitle); // 선택한 설문의 타이틀을 설정
    setShowParticipateModal(true);
  };

  const handleResultClick = () => {
    setShowResultModal(true);
  };

  const handleLoadMore = () => {
    const additionalSurveys = Math.min(3, surveys.length - loadMoreCount);
    const newLoadMoreCount = loadMoreCount + additionalSurveys;
    setLoadMoreCount(newLoadMoreCount);
  };

  const categoryTitles = new Set();

  return (
    <>
      {surveys.map((surveyItem, i) => {
        if (!categoryTitles.has(surveyItem.surveyCategory)) {
          categoryTitles.add(surveyItem.surveyCategory);

          return (
            <div key={i}>
              <Container className={`Survey_title ${surveyItem.surveyCategory}`}>
                <h1 className={`${surveyItem.surveyCategory}-title`}>
                  {surveyItem.surveyCategory === 'fun' ? 'Fun' : 'Survey'}
                  {loadMoreCount < surveys.length && (
                    <Button className="btn-more" onClick={() => handleButtonClick(surveyItem.surveyCategory)}>
                      더 보기
                    </Button>
                  )}
                </h1>
              </Container>
              <Container key={i} className={`MainSurveyBox ${surveyItem.surveyCategory}`}>
                <Row xs={1} md={2} lg={3} className="g-4" style={{ margin: '10px', padding: '15px' }}>
                  {surveys
                    .filter((filteredSurvey) => filteredSurvey.surveyCategory === surveyItem.surveyCategory)
                    .slice(0, loadMoreCount)
                    .map((filteredSurvey, j) => (
                      <Col key={j} className={`col ${surveyItem.surveyCategory}`}>
                        <div className={`card ${surveyItem.surveyCategory}`}>
                          {surveyItem.surveyCategory === 'fun' && (
                            <img src={filteredSurvey.imgSrc} className="card-img-top" alt={filteredSurvey.title} />
                          )}
                          <div className="survey-content">
                            <h5 className="card-title">{filteredSurvey.surTitle}</h5>
                            <div className="LikeBtnCount">
                              <button className="btn like-btn">❤</button>
                              <span className="like-count">{filteredSurvey.surveyLike || 0}</span>
                            </div>
                            <i className={`${surveyItem.surveyCategory}-joinpeople`}>
                              현재 {filteredSurvey.surveyCount}명 참여 중
                            </i>
                            <div className="card-wrap">
                              <button
                                className="btn submit-btn"
                                onClick={() => handleParticipateClick(filteredSurvey.surveyNo, filteredSurvey.surTitle)}
                              >
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
            </div>
          );
        }
        return null;
      })}

      {loadMoreCount < surveys.length && (
        <Button className="btn-more" onClick={handleLoadMore}>
          더 보기
        </Button>
      )}

      <Modal show={showParticipateModal} onHide={() => setShowParticipateModal(false)} centered className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>참여하기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Answer surveyNo={selectedSurveyNo} surveyTitle={selectedSurveyTitle} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowParticipateModal(false)}>닫기</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showResultModal} onHide={() => setShowResultModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>결과보기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SurveyResult />
          <SurveyReply />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowResultModal(false)}>닫기</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Survey;