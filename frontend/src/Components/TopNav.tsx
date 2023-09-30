import Container from "react-bootstrap/esm/Container";
import Nav from "react-bootstrap/esm/Nav";
import Navbar from "react-bootstrap/esm/Navbar";
import Image from "react-bootstrap/Image";

export const TopNav = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <Image
            className="nav-image"
            thumbnail
            rounded
            src="images/headshot.png"
          ></Image>
          <span className="p-3">MegarVisuals</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link
              href="https://github.com/ryanMegarityART/MegarVisuals"
              target="_blank"
            >
              <img
                src="/images/gitHub.png"
                alt="github-image"
                className="p-img"
              />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
