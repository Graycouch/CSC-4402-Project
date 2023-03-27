import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { Button, Container, Form, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import Profile from '../../pages/ProfilePage/Profile';
import Candidates from '../../pages/CandidatesPage/Candidates';
import Elections from '../../pages/ElectionsPage/Elections';
import Favorites from '../../pages/FavoritesPage/Favorites';

function NavbarComponent() {
  return (
    <>
      <Router>
        <div>
          {['xxl'].map((expand) => (
            <Navbar key={expand} bg="dark" variant="dark" expand={expand} className="mb-3">
              <Container fluid>
                <Navbar.Brand as={Link} to={"/"}>Voter Registration</Navbar.Brand>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                <Navbar.Offcanvas
                  id={`offcanvasNavbar-expand-${expand}`}
                  aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                  placement="end"
                >
                  <Offcanvas.Header closeButton>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">

                      <Nav.Link as={Link} to={"/"} style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                        Elections
                      </Nav.Link>

                      <Nav.Link as={Link} to={"/candidates"} style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                        Candidates
                      </Nav.Link>

                      <Nav.Link as={Link} to={"/favorites"} style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                        Favorites
                      </Nav.Link>

                      <Nav.Link as={Link} to={"/profile"} style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                        Profile
                      </Nav.Link>

                      <Form className="d-flex" style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                        <Form.Control
                          type="search"
                          placeholder="Search"
                          className="me-2"
                          aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                      </Form>

                    </Nav>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </Container>
            </Navbar>
          ))}
        </div>

        <div>
          <Routes>
          <Route path="/" element={<Elections />} />
            <Route path="/candidates" element={<Candidates />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default NavbarComponent;