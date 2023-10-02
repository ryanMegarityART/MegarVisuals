import Container from "react-bootstrap/esm/Container";
import Nav from "react-bootstrap/esm/Nav";
import Navbar from "react-bootstrap/esm/Navbar";
import Image from "react-bootstrap/Image";

export const TopNav = () => {
  return (
    <Navbar
      bg="dark"
      variant="dark"
      className="px-5 d-flex justify-content-between"
    >
      <div>
        <Navbar.Brand href="#home">
          <Image
            className="nav-image"
            thumbnail
            rounded
            src="images/headshot.png"
          ></Image>
          <span className="p-3">MegarVisuals</span>
        </Navbar.Brand>
      </div>
      <div>
        <Nav.Link
          href="https://github.com/ryanMegarityART/MegarVisuals"
          target="_blank"
        >
          <img src="/images/gitHub.png" alt="github-image" className="p-img" />
        </Nav.Link>
      </div>
    </Navbar>
  );
};
