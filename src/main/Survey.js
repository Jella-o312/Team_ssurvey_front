import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import './Survey.css';
import { useNavigate } from "react-router-dom";
import Answer from "../pages/Answer";
import SurveyReply from "../SurveyReplyPage/SurveyReply";
import axiosInstance from "../axioslnstance";


const Survey = () => {
  const navigate = useNavigate();
  const [showParticipateModal, setShowParticipateModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [surveys, setSurveys] = useState([]);
  const [loadMoreCount, setLoadMoreCount] = useState(3);

  useEffect(() => {
    axiosInstance.get('/survey')
      .then(response => {
        setSurveys(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('설문 정보를 가져오는 중 오류 발생:', error);
      });
  }, []);

  // const handleLoadMore = () => {
  //   const additionalSurveys = Math.min(3, surveys.length - loadMoreCount);
  //   const newLoadMoreCount = loadMoreCount + additionalSurveys;
  //   setLoadMoreCount(newLoadMoreCount);
  // };

  const handleButtonClick = (category) => {
    if (category === 'fun') {
      navigate('/fun'); // Fun 페이지로 이동
    } else {
      navigate('/survey'); // Survey 페이지로 이동
    }
  };

  const handleParticipateClick = () => {
    setShowParticipateModal(true);
  };

  const handleResultClick = () => {
    setShowResultModal(true);
  };

  // 추가된 부분: 각 카테고리에 대한 타이틀을 담을 Set
  const categoryTitles = new Set();

  return (
    <>
      {surveys.map((surveyItem, i) => {
        // 추가된 부분: 해당 카테고리의 타이틀이 이미 등록되어 있는지 확인
        if (!categoryTitles.has(surveyItem.surveyCategory)) {
          // 추가된 부분: 타이틀 등록 후 Set에 추가
          categoryTitles.add(surveyItem.surveyCategory);

          return (
            <div key={i}>
              <Container className={`Survey_title ${surveyItem.surveyCategory}`}>
                <h1 className={`${surveyItem.surveyCategory}-title`}>
                  {surveyItem.surveyCategory === 'fun' ? 'Fun' : 'Survey'}
                  {loadMoreCount < surveys.length && (
                    <Button className="btn-more" onClick={() => handleButtonClick((surveyItem.surveyCategory))}>
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
                            <h5 className="card-title">{filteredSurvey.surveyTitle}</h5>
                            <div className="LikeBtnCount">
                              <button className="btn like-btn">❤</button>
                              <span className="like-count">{filteredSurvey.surveyLike || 0}</span>
                            </div>
                            <i className={`${surveyItem.surveyCategory}-joinpeople`}>현재 {filteredSurvey.surveyCount}명 참여 중</i>
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
            </div>
          );
        }
        return null; // 중복된 카테고리의 경우 null 반환
      })}

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


