import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar } from "react-bootstrap";


function HeaderOri() {
  return(
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/fbList">리스트</Nav.Link>
            <Nav.Link href="/fbwrite">글쓰기</Nav.Link>
            <Nav.Link href="/fbdetail">상세페이지</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default HeaderOri;