import { useEffect, useState, useContext } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import * as ROUTES from "../constants/routes";

// Firebase
import FirebaseContext from "../context/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { signInWithGoogle } from "../services/firebase";

export default function SignIn() {
  const history = useHistory();
  const location = useLocation();
  const referrer = location.state?.referrer;
  const { app } = useContext(FirebaseContext);
  const auth = getAuth(app);

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const isInvalid = password === "" || emailAddress === "";

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, emailAddress, password);
      history.push(ROUTES.HOME);
    } catch (error) {
      setEmailAddress("");
      setPassword("");
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async (event) => {
    event.preventDefault();

    try {
      await signInWithGoogle();
      history.push(referrer || ROUTES.HOME);
    } catch (error) {
      setEmailAddress("");
      setPassword("");
      setError(error.message);
    }
  };

  useEffect(() => {
    document.title = "Sign In - DomumGym";
  }, []);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6} xl={4} className="border-3">
          <h1>DomumGym</h1>
          <h2 className="mb-5 fw-light">
            Hit the gym with the click of a mouse
          </h2>
          <p className="">Sign in</p>

          {error && <p className="mb-4 text-danger">{error}</p>}

          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={({ target }) => setEmailAddress(target.value)}
                value={emailAddress}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={({ target }) => setPassword(target.value)}
                value={password}
              />
            </Form.Group>
            <Button
              size="md"
              className="w-100 mb-4"
              variant="primary"
              type="submit"
              disabled={isInvalid}
              onClick={handleSignIn}
            >
              SIGN IN
            </Button>
            <div className="text-center mb-4">
              <Link
                to={{ pathname: ROUTES.SIGN_UP, state: { referrer: referrer } }}
                className="text-decoration-none"
              >
                Sign up for DomumGym
              </Link>
            </div>
            <Button
              size="md"
              className="w-100"
              variant="secondary"
              type="submit"
              onClick={handleGoogleSignIn}
            >
              SIGN IN WITH GOOGLE
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
