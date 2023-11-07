import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import './Survey.css';
import { useNavigate } from "react-router-dom";
import Answer from "../pages/Answer";
import SurveyReply from "../SurveyReplyPage/SurveyReply";
import { Routes, Route } from "react-router-dom";

const Survey = ({ boardType }) => {
  const navigate = useNavigate();
  const [showParticipateModal, setShowParticipateModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  // 서버에서 데이터 가져오는 함수
  const fetchSurveyData = async () => {
    try {
      const response = await fetch(`${serverUrl}/api/surveys`); // 서버에서 데이터를 가져오는 엔드포인트로 수정해야 함
      if (response.ok) {
        const data = await response.json();
        setSurveyList(data); // 서버에서 받은 데이터로 surveyList 상태를 업데이트
      }
    } catch (error) {
      console.error("Error fetching survey data: ", error);
    }
  };

  useEffect(() => {
    fetchSurveyData(); // 컴포넌트가 마운트될 때 데이터를 가져오도록 설정
  }, []); // 빈 배열을 전달하여 한 번만 호출되도록 함

  //카드 정보를 배열에 정의, <<<<이 부분 DB연결해서 내용보이게 하면 됨>>>>
  const [surveyList, setSurveyList] = useState([ // 설문 목록을 상태로 관리
    {
      id: 0,
      imgSrc: "/img/survey-banner1.jpg",
      title: "설문조사 title 부분 1",
      description: "설문조사 내용부분",
      surveyCount: "00"
    },
    {
      id: 1,
      imgSrc: "/img/survey-banner2.jpg",
      title: "설문조사 title 부분 2",
      description: "설문조사 내용부분",
      surveyCount: "00"
    },
    {
      id: 2,
      imgSrc: "/img/survey-banner3.jpg",
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

  const [loadMoreCount, setLoadMoreCount] = useState(6);

  const handleLoadMore = () => {
    const additionalSurveys = Math.min(3, surveyList.length - loadMoreCount);
    const newLoadMoreCount = loadMoreCount + additionalSurveys;
    setLoadMoreCount(newLoadMoreCount);
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

      <Container className={`Survey_title ${boardType} FB`}>
        <h1 className={`${boardType}-title`}> {boardType === 'fun' ? 'Fun' : 'Survey'} {loadMoreCount < surveyList.length && (
          <Button className="btn-more" onClick={handleLoadMore}>더 보기</Button>
        )} </h1>
      </Container>

      <Container className={`MainSurveyBox ${boardType}`}>
        <Row xs={1} md={2} lg={3} className="g-4" style={{ margin: '10px', padding: '15px' }}>
          {surveyList.slice(0, loadMoreCount).map((survey) => (
            <Col className={`col ${boardType} FB`} key={survey.id}>
              <div className={`card ${boardType} FB`}>
                <img src={survey.imgSrc} className="card-img-top" alt={survey.title} />
                <h5 className="card-title">{survey.title}</h5>
                <p className="card-text">{survey.description}</p>
                <div className="LikeBtnCount">
                  <button className="btn like-btn" onClick={() => handleLikeClick(survey.id)}>
                    ❤
                  </button>
                  <span className="like-count">{likes[survey.id] || 0}</span>
                </div>
                <i className={`${boardType}-joinpeople`}>현재 {survey.surveyCount}명 참여 중</i>
                <div className="card-wrap">
                  <button className="btn submit-btn" onClick={handleParticipateClick}>참여하기</button>
                  <button className="btn result-btn view_more" onClick={handleResultClick}>결과보기</button>
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