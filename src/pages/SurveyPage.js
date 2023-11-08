import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import './SurveyPage.css';
import { useNavigate } from "react-router-dom";
import Answer from "../pages/Answer";
import SurveyReply from "../SurveyReplyPage/SurveyReply";
import { Routes, Route } from "react-router-dom";


const SurveyPage = () => {
  const navigate = useNavigate();
  const [showParticipateModal, setShowParticipateModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    fetchSurveyData(); // 컴포넌트가 마운트될 때 데이터를 가져오도록 설정
  }, []); // 빈 배열을 전달하여 한 번만 호출되도록 함

  // 서버에서 데이터 가져오는 함수
  const fetchSurveyData = async () => {
    try {
      const response = await fetch(`${serverUrl}/api/surveys`); // 서버에서 데이터를 가져오는 엔드포인트로 수정해야 함
      if (response.ok) {
        const data = await response.json();
        setSurveyList(data); // 서버에서 받은 데이터로 surveyList 상태를 업데이트
      }
    } catch (error) {
      console.error("설문 데이터를 불러오는 중 에러가 발생했습니다: ", error);
    }
  };

  // 카드 정보를 배열에 정의, <<<<이 부분 DB연결해서 내용보이게 하면 됨>>>>
  const [surveyList, setSurveyList] = useState([ // 설문 목록을 상태로 관리
    {
      id: 15,
      imgSrc: "../img/camping_main_01.jpg",
      title: "설문조사 title 부분 1",
      description: "설문조사 내용부분",
      ae: "사진은 그냥 예시로 넣어둠",
      surveyCount: "00"
    },
    {
      id: 16,
      imgSrc: "../img/camping_main_02.jpg",
      title: "설문조사 title 부분 2",
      description: "설문조사 내용부분",
      ae: "사진은 그냥 예시로 넣어둠",
      surveyCount: "00"
    },
    {
      id: 17,
      imgSrc: "../img/camping_main_03.jpg",
      title: "설문조사 title 부분 3",
      description: "설문조사 내용부분",
      ae: "사진은 그냥 예시로 넣어둠",
      surveyCount: "00"
    },
    {
      id: 18,
      imgSrc: "../img/camping_main_01.jpg",
      title: "설문조사 title 부분 4",
      description: "설문조사 내용부분",
      ae: "사진은 그냥 예시로 넣어둠",
      surveyCount: "00"
    },
    {
      id: 19,
      imgSrc: "../img/camping_main_02.jpg",
      title: "설문조사 title 부분 5",
      description: "설문조사 내용부분",
      ae: "사진은 그냥 예시로 넣어둠",
      surveyCount: "00"
    },
    {
      id: 20,
      imgSrc: "../img/camping_main_03.jpg",
      title: "설문조사 title 부분 6",
      description: "설문조사 내용부분",
      ae: "사진은 그냥 예시로 넣어둠",
      surveyCount: "00"
    },
    {
      id: 21,
      imgSrc: "../img/camping_main_01.jpg",
      title: "설문조사 title 부분 7",
      description: "설문조사 내용부분",
      ae: "사진은 그냥 예시로 넣어둠",
      surveyCount: "00"
    },
    {
      id: 22,
      imgSrc: "../img/camping_main_02.jpg",
      title: "설문조사 title 부분 8",
      description: "설문조사 내용부분",
      ae: "사진은 그냥 예시로 넣어둠",
      surveyCount: "00"
    },
    {
      id: 23,
      imgSrc: "../img/camping_main_03.jpg",
      title: "설문조사 title 부분 9",
      description: "설문조사 내용부분",
      ae: "사진은 그냥 예시로 넣어둠",
      surveyCount: "00"
    },
    {
      id: 24,
      imgSrc: "../img/camping_main_01.jpg",
      title: "설문조사 title 부분 10",
      description: "설문조사 내용부분",
      ae: "사진은 그냥 예시로 넣어둠",
      surveyCount: "00"
    },
    {
      id: 25,
      imgSrc: "../img/camping_main_02.jpg",
      title: "설문조사 title 부분 11",
      description: "설문조사 내용부분",
      ae: "사진은 그냥 예시로 넣어둠",
      surveyCount: "00"
    },
    {
      id: 26,
      imgSrc: "../img/camping_main_03.jpg",
      title: "설문조사 title 부분 12",
      description: "설문조사 내용부분",
      ae: "사진은 그냥 예시로 넣어둠",
      surveyCount: "00"
    },
    {
      id: 27,
      imgSrc: "../img/camping_main_01.jpg",
      title: "설문조사 title 부분 13",
      description: "설문조사 내용부분",
      ae: "사진은 그냥 예시로 넣어둠",
      surveyCount: "00"
    },
    {
      id: 28,
      imgSrc: "../img/camping_main_02.jpg",
      title: "설문조사 title 부분 14",
      description: "설문조사 내용부분",
      ae: "사진은 그냥 예시로 넣어둠",
      surveyCount: "00"
    },
    {
      id: 29,
      imgSrc: "../img/camping_main_03.jpg",
      title: "설문조사 title 부분 15",
      description: "설문조사 내용부분",
      ae: "사진은 그냥 예시로 넣어둠",
      surveyCount: "00"
    },
  ]);

  // const loadMoreCount = surveyList.length;

  // 로컬 스토리지에서 좋아요 카운트를 불러오는 함수
  const loadLikesFromLocalStorage = () => {
    try {
      const likesData = localStorage.getItem('likes');
      return likesData ? JSON.parse(likesData) : {};
    } catch (error) {
      console.error('로컬 스토리지에서 좋아요를 불러오는 중에 오류가 발생했습니다', error);
      return {};
    }
  };

  // 초기 좋아요 데이터 설정
  const initialLikes = loadLikesFromLocalStorage();
  const [likes, setLikes] = useState(initialLikes);

  // 좋아요 버튼 클릭 시 호출되는 함수
  const handleLikeClick = (surveyId) => {
    setSurveyList((prevSurveyList) => {
      return prevSurveyList.map((survey) => {
        if (survey.id === surveyId) {
          // 좋아요 수를 증가시키고, 로컬 스토리지에 좋아요 데이터를 저장
          const newLikes = { ...likes, [surveyId]: (likes[surveyId] || 0) + 1 };
          setLikes(newLikes);
          localStorage.setItem('likes', JSON.stringify(newLikes));
          return { ...survey, likes: (survey.likes || 0) + 1 };
        }
        return survey;
      });
    });
  };

  const handleParticipateClick = () => {
    setShowParticipateModal(true);
  };

  const handleResultClick = () => {
    setShowResultModal(true);
  };

  return (
    <>
      <div className="text-center">
        <h1 className="fun-title"> Survey </h1>
      </div>

      <Container className={`MainSurveyBox SP`}>
        <Row xs={1} md={2} lg={3} className="g-4" style={{ margin: '10px', padding: '15px' }}>
          {surveyList.map((survey) => (
            <Col className={`col`} key={survey.id}>
              <div className={`card SP`}>
                <img src={survey.imgSrc} className="card-img-top" alt={survey.title} />
                <h5 className="card-title">{survey.title}</h5>
                <p className="card-text">{survey.description}</p>
                <div className="LikeBtnCount">
                  <button className="btn like-btn" onClick={() => handleLikeClick(survey.id)}>
                    ❤
                  </button>
                  <span className="like-count">{likes[survey.id] || 0}</span>
                </div>
                <i className={`joinpeople SP`}>현재 {survey.surveyCount}명 참여 중</i>
                {/* <div>${`surveyStart` ~ `surveyEnd`}
                  참여기간</div> */}
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