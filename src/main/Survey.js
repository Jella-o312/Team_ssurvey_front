import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import './Survey.css';
import { Route, Routes, useNavigate } from "react-router-dom";
import Answer from "../pages/Answer";
import axiosInstance from "../axioslnstance";
import SurveyResult from "../pages/SurveyResult";


const Survey = ({ userInfo }) => {
  const navigate = useNavigate();
  const [showParticipateModal, setShowParticipateModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [surveys, setSurveys] = useState([]);
  const [selectedSurveyNo, setSelectedSurveyNo] = useState(null);
  const [selectedSurveyTitle, setSelectedSurveyTitle] = useState(null);

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
    console.log('Button Clicked for category:', category);
    const targetSurvey = surveys.find((survey) => survey.surveyCategory === category);
  
    if (targetSurvey) {
      navigate(`/${category}Page`, { state: { survey: targetSurvey } });
    }
  };

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

  const categoryTitles = new Set();

  return (
    <>
      {surveys.map((surveyItem, i) => {
        if (!categoryTitles.has(surveyItem.surveyCategory)) {
          categoryTitles.add(surveyItem.surveyCategory);

          return (
            <div key={i} name={surveyItem.surveyNo}>
              <Container className={`Survey_title ${surveyItem.surveyCategory}`}>
                <h1 className={`${surveyItem.surveyCategory}-title`}>
                  {surveyItem.surveyCategory} 
                  <Button className="btn-more" onClick={() => handleButtonClick(surveyItem.surveyCategory)}>
                    더 보기
                  </Button>
                </h1>
              </Container>


              <Container key={i} className={`MainSurveyBox ${surveyItem.surveyCategory}`}>
                <Row xs={1} md={2} lg={3} className="g-4" style={{ margin: '10px', padding: '15px' }}>
                  {surveys
                    .filter((filteredSurvey) => filteredSurvey.surveyCategory === surveyItem.surveyCategory)
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
                              <button className="btn result-btn view_more" onClick={()=>handleResultClick(filteredSurvey.surveyNo, filteredSurvey.surTitle)}>
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

      {/* {loadMoreCount < surveys.length && (
        <Button className="btn-more" onClick={handleLoadMore}>
          더 보기
        </Button>
      )} */}

      <Modal show={showParticipateModal} onHide={() => setShowParticipateModal(false)} centered className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title >참여하기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Answer userInfo={userInfo} surveyNo={selectedSurveyNo} surveyTitle={selectedSurveyTitle} />
        </Modal.Body>
      </Modal>

      <Modal show={showResultModal} onHide={() => setShowResultModal(false)} centered className="result-modal">
        <Modal.Header closeButton>
          <Modal.Title>결과보기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SurveyResult userInfo={userInfo} surveyNo={selectedSurveyNo} surveyTitle={selectedSurveyTitle} />
        </Modal.Body>
      </Modal>
     
    </>
  );
}

export default Survey;