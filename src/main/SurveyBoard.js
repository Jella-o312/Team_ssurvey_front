import React, { useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import './SurveyBoard.css';
import { useNavigate } from "react-router-dom";
import Answer from "../pages/Answer";

const SurveyBoard = () => {
  const navigate = useNavigate();
  const [showParticipateModal, setShowParticipateModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);

  // 카드 정보를 배열에 정의, <<<<이 부분 DB연결해서 내용보이게 하면 됨>>>>
  const [surveyList, setSurveyList] = useState([ // 설문 목록을 상태로 관리
    {
      id: 0,
      imgSrc: "../img/camping_main_01.jpg",
      title: "설문조사 title 부분 1",
      description: "설문조사 내용부분",
      surveyCount: "00"
    },
    {
      id: 1,
      imgSrc: "../img/camping_main_02.jpg",
      title: "설문조사 title 부분 2",
      description: "설문조사 내용부분",
      surveyCount: "00"
    },
    {
      id: 2,
      imgSrc: "../img/camping_main_03.jpg",
      title: "설문조사 title 부분 3",
      description: "설문조사 내용부분",
      surveyCount: "00"
    },
    {
      id: 3,
      imgSrc: "../img/camping_main_01.jpg",
      title: "설문조사 title 부분 4",
      description: "설문조사 내용부분",
      surveyCount: "00"
    },
    {
      id: 4,
      imgSrc: "../img/camping_main_02.jpg",
      title: "설문조사 title 부분 5",
      description: "설문조사 내용부분",
      surveyCount: "00"
    },
    {
      id: 5,
      imgSrc: "../img/camping_main_03.jpg",
      title: "설문조사 title 부분 6",
      description: "설문조사 내용부분",
      surveyCount: "00"
    },
    {
      id: 6,
      imgSrc: "../img/camping_main_01.jpg",
      title: "설문조사 title 부분 7",
      description: "설문조사 내용부분",
      surveyCount: "00"
    },
    {
      id: 7,
      imgSrc: "../img/camping_main_02.jpg",
      title: "설문조사 title 부분 8",
      description: "설문조사 내용부분",
      surveyCount: "00"
    },
    {
      id: 8,
      imgSrc: "../img/camping_main_03.jpg",
      title: "설문조사 title 부분 9",
      description: "설문조사 내용부분",
      surveyCount: "00"
    },
    {
      id: 9,
      imgSrc: "../img/camping_main_01.jpg",
      title: "설문조사 title 부분 10",
      description: "설문조사 내용부분",
      surveyCount: "00"
    },
    {
      id: 10,
      imgSrc: "../img/camping_main_02.jpg",
      title: "설문조사 title 부분 11",
      description: "설문조사 내용부분",
      surveyCount: "00"
    },
    {
      id: 11,
      imgSrc: "../img/camping_main_03.jpg",
      title: "설문조사 title 부분 12",
      description: "설문조사 내용부분",
      surveyCount: "00"
    },
    {
      id: 12,
      imgSrc: "../img/camping_main_01.jpg",
      title: "설문조사 title 부분 13",
      description: "설문조사 내용부분",
      surveyCount: "00"
    },
    {
      id: 13,
      imgSrc: "../img/camping_main_02.jpg",
      title: "설문조사 title 부분 14",
      description: "설문조사 내용부분",
      surveyCount: "00"
    },
    {
      id: 14,
      imgSrc: "../img/camping_main_03.jpg",
      title: "설문조사 title 부분 15",
      description: "설문조사 내용부분",
      surveyCount: "00"
    },
  ]);

  const [loadMoreCount, setLoadMoreCount] = useState(6); // 불러오는 설문 수를 관리하는 상태 ,,3으로 바꾸면 3개부터 나옴

  const handleLoadMore = () => {
    // 더보기 버튼 클릭 시 호출되는 함수
    const additionalSurveys = Math.min(3, surveyList.length - loadMoreCount); // 최대 3개 또는 남은 설문 수 중 작은 값을 계산
    const newLoadMoreCount = loadMoreCount + additionalSurveys; // 추가로 불러올 설문 수
    setLoadMoreCount(newLoadMoreCount); // 불러오는 설문 수 업데이트
  };

  const [likes, setLikes] = useState({});

  const handleLikeClick = (surveyId) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [surveyId]: (prevLikes[surveyId] || 0) + 1,
    }));
  };

  const handleParticipateClick = () => {
    setShowParticipateModal(true);
  };

  const handleResultClick = () => {
    setShowResultModal(true);
  };


  return (
    <>
      <Container className="survey_title SB">
        <h1 className="survey-title"> Survey {loadMoreCount < surveyList.length && (
          <Button className="btn-more" onClick={handleLoadMore}>더 보기</Button>//더 보기 눌러서 데이터 다 불러왔으면 사라짐
        )} </h1>
      </Container>

      <Container className="MainSurveyBox SB">
        <Row xs={1} md={2} lg={3} className="g-4">
          {surveyList.slice(0, loadMoreCount).map((survey) => (
            <Col className="col SB" key={survey.id}>
              <div className="card SB">
                <img src={survey.imgSrc} className="card-img-top" alt={survey.title} />
                <h5 className="card-title">{survey.title}</h5>
                <p className="card-text">{survey.description}</p>
                <div className="LikeBtnCount">
                  <button className="btn like-btn" onClick={() => handleLikeClick(survey.id)}>
                    ❤
                  </button>
                  <span className="like-count">{likes[survey.id] || 0}</span>
                </div>
                <i className="SB-joinpeople">현재 {survey.surveyCount}명 참여 중</i>
                <div className="card-wrap">
                  <button className="btn submit-btn" onClick={handleParticipateClick}>참여하기</button>
                  <button className="btn result-btn view_more" onClick={handleResultClick}>결과보기</button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      <Modal show={showParticipateModal} onHide={() => setShowParticipateModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>참여하기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Answer /> {/* Answer 컴포넌트를 모달 내에 렌더링 */}
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
          {/* 결과보기 모달 내용 */}
          <p>결과보기 모달 내용입니다.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowResultModal(false)}>닫기</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SurveyBoard;
