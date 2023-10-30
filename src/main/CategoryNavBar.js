import React from 'react';
import { Container, Nav } from "react-bootstrap";
import "./CategoryNavBar.css";
import { useNavigate } from "react-router-dom";

const CategoryNavBar = () => {
  const navigate = useNavigate();

  // const handlePageChange = (page) => {
  //   setCurrentPage(page); // currentPage 상태를 업데이트
  //   navigate(`/${page}`); // 해당 페이지로 이동
  // };

  return (
    <Container className="navname">
      <nav>
        <ul className="nav justify-content-center">
          <Nav className="nav-item">
          {/* <Nav.Link onClick={() => handlePageChange('home')}>Home</Nav.Link>
            <Nav.Link onClick={() => handlePageChange('FunSurvey')}>Fun</Nav.Link>
            <Nav.Link onClick={() => handlePageChange('Survey')}>설문조사</Nav.Link>
            <Nav.Link onClick={() => handlePageChange('FAQ')}>FAQ</Nav.Link>
            <Nav.Link onClick={() => handlePageChange('MyPage')}>마이페이지</Nav.Link> */}
            <Nav.Link onClick={() => { navigate('/FunSurvey') }}>Fun</Nav.Link>
            <Nav.Link onClick={() => { navigate('/Survey') }}>설문조사</Nav.Link> 
            <Nav.Link onClick={() => { navigate('/FAQ') }}>FAQ</Nav.Link>
            <Nav.Link onClick={() => { navigate('/MyPage')} }>마이페이지</Nav.Link>
          </Nav>
        </ul>
      </nav>
    </Container>
  )
}

export default CategoryNavBar;
