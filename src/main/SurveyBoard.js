import { Container } from "react-bootstrap";
import './SurveyBoard.css';
import { useNavigate } from "react-router-dom";

const SurveyBoard = () => {
  const navigate = useNavigate();

  // 카드 정보를 배열에 정의
  const survey = [
    {
      id: 0,
      imgSrc: "../img/tent1.jpg",
      title: "캠핑 텐트",
      description: "비, 바람을 막아주는 텐트 입니다",
    },
    {
      id: 24,
      imgSrc: "../img/피크닉 체어.jpg",
      title: "캠핑 의자",
      description: "캠핑갔으면 앉아서 멍 때려야죠",
    },
    {
      id: 27,
      imgSrc: "../img/Lamp01.jpg",
      title: "램프",
      description: "필수품! 밤되면 주변에 아무것도 안보임",
    },
  ];

  return (
    <Container className="MainDetailBox">
      {survey.map((survey) => (
        <div key={survey.id} style={{ width: "22rem" }} className="card">
          <img src={survey.imgSrc} className="card-img-top" alt={survey.title} />
          <div className="card-body">
            <h5 className="card-title">{survey.title}</h5>
            <p className="card-text">{survey.description}</p>
          </div>
          <div className="card-body">
            <button onClick={() => { navigate(`/detail/${survey.id}`) }}>상세페이지</button>
          </div>
        </div>
      ))}
    </Container>
  );
}

export default SurveyBoard;
