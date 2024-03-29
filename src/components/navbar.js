import "./navbar.css";
import { useContext, useState, useEffect } from "react";
import {
  Button,
  Col,
  Container,
  Dropdown,
  Form,
  FormControl,
  Image,
  Navbar as NavbarB,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import qs from "qs";

// Fireabse + User
import { getAuth } from "@firebase/auth";
import FirebaseContext from "../context/firebase";
import UserContext from "../context/user";
import useQuery from "../hooks/use-query";

export default function Navbar() {
  const history = useHistory();
  const { query: initialQuery } = useQuery();
  const { app } = useContext(FirebaseContext);
  const auth = getAuth(app);
  const { user: loggedInUser } = useContext(UserContext);
  const [query, setQuery] = useState();

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  const handleSignOut = async () => {
    await auth.signOut();
    history.push(ROUTES.HOME);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch(event);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    let queryString = qs.stringify({ q: query }, { addQueryPrefix: true });
    history.push(ROUTES.SEARCH.concat(queryString));
  };

  return (
    <NavbarB fixed="top" bg="light" expand="lg" className="border-bottom">
      <Container>
        {/* Logo */}
        <Col>
          <LinkContainer to={ROUTES.HOME}>
            <NavbarB.Brand className="text-primary fw-bold text-uppercase">
              DomumGym
            </NavbarB.Brand>
          </LinkContainer>
        </Col>
        {/* Search */}
        <Col>
          <Form className="d-flex justify-content">
            <FormControl
              type="search"
              placeholder="Search"
              className="mr-2"
              aria-label="Search"
              onKeyDown={handleKeyDown}
              value={query}
              onChange={({ target }) => setQuery(target.value)}
            />

            <Button variant="primary" onClick={handleSearch}>
              <i className="bi bi-search"></i>
            </Button>
          </Form>
        </Col>
        {/* Menu Buttons */}
        <Col xs={4}>
          <div className="float-end">
            {/* NOT OGGED IN */}
            {!loggedInUser && (
              <LinkContainer
                to={ROUTES.SIGN_IN}
                className="d-none d-md-inline-block"
              >
                <Button variant="primary" className="ms-2">
                  SIGN IN
                </Button>
              </LinkContainer>
            )}

            {/* LOGGED IN */}
            {loggedInUser && (
              <>
                <LinkContainer to={ROUTES.UPLOAD}>
                  <Button variant="primary">
                    <i className="bi bi-camera-video"></i>
                  </Button>
                </LinkContainer>

                {/* DROPDOWN */}
                <Dropdown as="span" align="end">
                  <Dropdown.Toggle className="ms-2">
                    <i className="bi bi-person"></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu style={{ width: "20rem" }}>
                    <Dropdown.ItemText>
                      <div className="text-truncate">
                        <Image
                          style={{ width: 64, height: 64 }}
                          src="https://via.placeholder.com/88x88"
                          roundedCircle
                        />
                        <span className="ms-3 align-middle fs-4">
                          {loggedInUser.displayName}
                        </span>
                      </div>
                    </Dropdown.ItemText>

                    <Dropdown.Divider />

                    <LinkContainer to={ROUTES.PROFILE}>
                      <Dropdown.Item>
                        <i className="bi bi-person"></i>
                        <span className="ms-3">My Profile</span>
                      </Dropdown.Item>
                    </LinkContainer>

                    <LinkContainer to={ROUTES.SETTINGS}>
                      <Dropdown.Item>
                        <i className="bi bi-gear"></i>
                        <span className="ms-3">Settings</span>
                      </Dropdown.Item>
                    </LinkContainer>

                    <Dropdown.Divider />

                    <LinkContainer to={ROUTES.PAYMENTS}>
                      <Dropdown.Item>
                        <i className="bi bi-credit-card"></i>
                        <span className="ms-3">Your Cards</span>
                      </Dropdown.Item>
                    </LinkContainer>

                    <LinkContainer to={ROUTES.BANKING}>
                      <Dropdown.Item>
                        <i className="bi bi-bank"></i>
                        <span className="ms-3">Add bank</span>
                      </Dropdown.Item>
                    </LinkContainer>

                    <Dropdown.Divider />

                    <Dropdown.Item onClick={handleSignOut}>
                      <i className="bi bi-box-arrow-left"></i>
                      <span className="ms-3">Logout</span>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            )}
          </div>
        </Col>
      </Container>
    </NavbarB>
  );
}
