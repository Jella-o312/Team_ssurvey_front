import { Container } from "react-bootstrap";
import './SurveyBoard.css';
import { useNavigate } from "react-router-dom";
// import Card from 'react-bootstrap/Card';
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';

const SurveyBoard = () => {
  const navigate = useNavigate();

  // 카드 정보를 배열에 정의, <<<<이 부분 DB연결해서 내용보이게 하면 됨>>>>
  const survey = [
    {
      id: 0,
      imgSrc: "../img/camping_main_01.jpg",
      title: "설문조사 title 부분 1",
      description: "설문조사 내용부분",
      ae: "사진은 그냥 예시로 넣어둠",
      surveyCount: "00"
    },
    {
      id: 24,
      imgSrc: "../img/camping_main_02.jpg",
      title: "설문조사 title 부분 2",
      description: "설문조사 내용부분",
      ae: "사진은 그냥 예시로 넣어둠",
      surveyCount: "00"
    },
    {
      id: 27,
      imgSrc: "../img/camping_main_03.jpg",
      title: "설문조사 title 부분 3",
      description: "설문조사 내용부분",
      ae: "사진은 그냥 예시로 넣어둠",
      surveyCount: "00"
    },
  ];

  return (
    <Container className="MainSurveyBox">
      {survey.map((survey) => (
        <div key={survey.id} className="card" >
          {/* <a href="" onClick={() => { navigate(`/survey`)}}> */}
          <img src={survey.imgSrc} className="card-img-top" alt={survey.title} />
            <p className="card-text">{survey.ae}</p>
            <h5 className="card-title">{survey.title}</h5>
            <p className="card-text">{survey.description}</p>
            <i className="fi fi-rr-stats">현재 {survey.surveyCount}명 참여 중</i>
          <div className="card-wrap">
            <button className="btn submit-btn" onClick={() => { navigate(`/survey/${survey.id}`) }}>참여하기</button>
            <button className="btn result-btn view_more" onClick={() => { navigate(`/result/${survey.id}`) }}>결과보기</button>
          </div>
          {/* </a> */}
        </div>
      ))}
     {/* <Row xs={1} md={3} className="g-4">
      {Array.from({ length: 12 }).map((_, idx) => (
        <Col key={idx}>
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row> */}
    </Container>
    
  );
}

export default SurveyBoard;
