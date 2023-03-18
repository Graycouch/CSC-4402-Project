import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';
import Voters from '../../pages/VotersPage/Voters';
import Candidates from '../../pages/CandidatesPage/Candidates';
import Elections from '../../pages/ElectionsPage/Elections';


function NavbarComponent() {
  return (
    <>
      <Router>
        <div>
          {['xxl'].map((expand) => (
            <Navbar key={expand} bg="dark" variant="dark" expand={expand} className="mb-3">
              <Container fluid>
                <Navbar.Brand href="/">Voter Registration</Navbar.Brand>
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
                        Voters
                      </Nav.Link>

                      <Nav.Link as={Link} to={"/candidates"} style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                        Candidates
                      </Nav.Link>

                      <Nav.Link as={Link} to={"/elections"} style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                        Elections
                      </Nav.Link>

                      <NavDropdown
                        title="More"
                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                        style={{ paddingLeft: "20px", paddingRight: "20px" }}
                      >
                        <NavDropdown.Item as={Link} to={"/"}>
                          Team
                        </NavDropdown.Item>

                        <NavDropdown.Divider />

                        <NavDropdown.Item as={Link} to={"/"}>
                          Arrogant
                        </NavDropdown.Item>

                        <NavDropdown.Divider />

                        <NavDropdown.Item as={Link} to={"/"}>
                          Goats
                        </NavDropdown.Item>

                      </NavDropdown>

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
            <Route path="/" element={<Voters />} />
            <Route path="/candidates" element={<Candidates />} />
            <Route path="/elections" element={<Elections />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default NavbarComponent;