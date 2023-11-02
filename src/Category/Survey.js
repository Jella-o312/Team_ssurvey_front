import { Container, Row, Col } from "react-bootstrap"; 
import { useState } from "react";
import './Survey.css';
import { useNavigate } from "react-router-dom";


const Survey = () => {
  const navigate = useNavigate();

  // 카드 정보를 배열에 정의, <<<<이 부분 DB연결해서 내용보이게 하면 됨>>>>
  const [surveyList] = useState([ // 설문 목록을 상태로 관리
    {
      id: 0,
      imgSrc: "../img/camping_main_01.jpg",
      title: "설문조사 title 부분 1",
      description: "설문조사 내용부분",
      ae: "사진은 그냥 예시로 넣어둠",
      surveyCount: "00"
    },
    {
      id: 1,
      imgSrc: "../img/camping_main_02.jpg",
      title: "설문조사 title 부분 2",
      description: "설문조사 내용부분",
      ae: "사진은 그냥 예시로 넣어둠",
      surveyCount: "00"
    },
    {
      id: 2,
      imgSrc: "../img/camping_main_03.jpg",
      title: "설문조사 title 부분 3",
      description: "설문조사 내용부분",
      ae: "사진은 그냥 예시로 넣어둠",
      surveyCount: "00"
    },
    {
      id: 3,
      imgSrc: "../img/camping_main_01.jpg",
      title: "설문조사 title 부분 4",
      description: "설문조사 내용부분",
      ae: "사진은 그냥 예시로 넣어둠",
      surveyCount: "00"
    },
    {
      id: 4,
      imgSrc: "../img/camping_main_02.jpg",
      title: "설문조사 title 부분 5",
      description: "설문조사 내용부분",
      ae: "사진은 그냥 예시로 넣어둠",
      surveyCount: "00"
    },
    {
      id: 5,
      imgSrc: "../img/camping_main_03.jpg",
      title: "설문조사 title 부분 6",
      description: "설문조사 내용부분",
      ae: "사진은 그냥 예시로 넣어둠",
      surveyCount: "00"
    },
    {
      id: 6,
      imgSrc: "../img/camping_main_01.jpg",
      title: "설문조사 title 부분 7",
      description: "설문조사 내용부분",
      ae: "사진은 그냥 예시로 넣어둠",
      surveyCount: "00"
    },
    {
      id: 7,
      imgSrc: "../img/camping_main_02.jpg",
      title: "설문조사 title 부분 8",
      description: "설문조사 내용부분",
      ae: "사진은 그냥 예시로 넣어둠",
      surveyCount: "00"
    },
    {
      id: 8,
      imgSrc: "../img/camping_main_03.jpg",
      title: "설문조사 title 부분 9",
      description: "설문조사 내용부분",
      ae: "사진은 그냥 예시로 넣어둠",
      surveyCount: "00"
    },
    {
      id: 9,
      imgSrc: "../img/camping_main_01.jpg",
      title: "설문조사 title 부분 10",
      description: "설문조사 내용부분",
      ae: "사진은 그냥 예시로 넣어둠",
      surveyCount: "00"
    },
    {
      id: 10,
      imgSrc: "../img/camping_main_02.jpg",
      title: "설문조사 title 부분 11",
      description: "설문조사 내용부분",
      ae: "사진은 그냥 예시로 넣어둠",
      surveyCount: "00"
    },
    {
      id: 11,
      imgSrc: "../img/camping_main_03.jpg",
      title: "설문조사 title 부분 12",
      description: "설문조사 내용부분",
      ae: "사진은 그냥 예시로 넣어둠",
      surveyCount: "00"
    },
    {
      id: 12,
      imgSrc: "../img/camping_main_01.jpg",
      title: "설문조사 title 부분 13",
      description: "설문조사 내용부분",
      ae: "사진은 그냥 예시로 넣어둠",
      surveyCount: "00"
    },
    {
      id: 13,
      imgSrc: "../img/camping_main_02.jpg",
      title: "설문조사 title 부분 14",
      description: "설문조사 내용부분",
      ae: "사진은 그냥 예시로 넣어둠",
      surveyCount: "00"
    },
    {
      id: 14,
      imgSrc: "../img/camping_main_03.jpg",
      title: "설문조사 title 부분 15",
      description: "설문조사 내용부분",
      ae: "사진은 그냥 예시로 넣어둠",
      surveyCount: "00"
    },
  ]);

  // const loadMoreCount = surveyList.length;


  return (
    <>
      <div className="text-center">
        <h1 className="fun-title"> Survey </h1>
      </div>

      <Container className="MainSurveyBox S">
        <Row xs={1} md={2} lg={3} className="g-4">
          {surveyList.map((survey) => (
            <Col key={survey.id}>
              <div className="card S">
                <img src={survey.imgSrc} className="card-img-top" alt={survey.title} />
                <p className="card-text">{survey.ae}</p>
                <h5 className="card-title">{survey.title}</h5>
                <p className="card-text">{survey.description}</p>
                <i className="fi fi-rr-stats S">현재 {survey.surveyCount}명 참여 중</i>
                <div className="card-wrap">
                  <button className="btn submit-btn" onClick={() => { navigate(`/survey/${survey.id}`) }}>참여하기</button>
                  <button className="btn result-btn view_more" onClick={() => { navigate(`/result/${survey.id}`) }}>결과보기</button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Survey;