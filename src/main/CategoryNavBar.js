import React from 'react';
import { Container, Nav } from "react-bootstrap";
import "./CategoryNavBar.css";
import { useNavigate } from "react-router-dom";

const CategoryNavBar = () => {
  const navigate = useNavigate();

  return (
    <Container className="navname">
      <nav>
        <ul className="nav justify-content-center">
          <Nav className="nav-item">
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
