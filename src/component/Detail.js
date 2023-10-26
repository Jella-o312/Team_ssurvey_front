import { Nav, TabContent } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addCart } from "../redux/store";
import { useDispatch } from "react-redux";
import { setWatched } from '../redux/watchedSlice';
import './Detail.css';




const Detail = ({ survey }) => {
  const { id } = useParams();
  const [tabclick, setTabclick] = useState(0);
  const dispatch = useDispatch();
  const [alert, setAlert] = useState(true);

  useEffect(() => {
    let watched = localStorage.getItem('watched');
    watched = JSON.parse(watched) || [];

    if (!watched.includes(id)) {
      watched.push(id);
    }

    watched = [...new Set(watched)];

    localStorage.setItem('watched', JSON.stringify(watched)); //로컬스토리지 쓸건지 말건지 정해서 수정하기
    dispatch(setWatched(watched));
  }, [id, dispatch]);

  useEffect(() => {
    let timer = setTimeout(() => {
      setAlert(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    }
  }, [setAlert]);

  let result = survey.find(item => item.id === parseInt(id));

  if (!result) {
    return (
      <div>등록된 설문이 없습니다.</div>
    )
  }

  return (
    <>
      <div className="now">
        <div className="pd-img">
          <img src={`https://raw.githubusercontent.com/sungchunp/image/main/${survey[id].title}.jpg`} width="25%" />
        </div>
        <div className="pd-1" >
          <h5 className="pt-1">{survey[id].title}</h5>
          <p>{survey[id].content}</p>
          <p>{survey[id].price + '원'}</p>
          <button className="btn btn-primary" onClick={() => {
            dispatch(addCart({ id: + id, title: survey[id].title, count: 1, price : survey[id].price }))
          }}>주문하기</button>
        </div>
      </div>


      <Nav className="denav" justify variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link eventKey="link-0" onClick={() => {
            setTabclick(0)
          }}>상세정보
          </Nav.Link>
          <div className='img-detail'>
            <img src={`https://raw.githubusercontent.com/sungchunp/image/main/${survey[id].detail}.jpg`} width="1000px" />
          </div>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={() => {
            setTabclick(1)
          }}>리뷰</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2" onClick={() => {
            setTabclick(2)
          }}>Q&A</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-3" onClick={() => {
            setTabclick(3)
          }}>반품,교환정보</Nav.Link>
        </Nav.Item>
      </Nav>

      <TabContent tabclick={tabclick} />
    </>
  );
}

export default Detail;