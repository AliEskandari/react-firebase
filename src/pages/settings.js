import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Form, Button, Col } from "react-bootstrap";
import UserContext from "../context/user";
import useUser from "../hooks/use-user";
import { deleteUser } from "../services/firebase";

export default function Settings() {
  const { user: authUser } = useContext(UserContext);
  const { user } = useUser(authUser.uid);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [country, setCountry] = useState("");
  const [motivatement, setMotivatement] = useState("");

  useEffect(() => {
    if (user) {
      // pre-fill values for form
      setName(user.name);
      setBio(user.bio);
      setSpeciality(user.speciality);
      setCountry(user.country);
      setMotivatement(user.motivatement);
    }
  }, [user]);
  const handleDeleteAccount = () => {
    deleteUser(authUser);
  };
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={8} xl={6} className="border-3">
          <Form>
            <div className="mb-3 d-flex justify-content-between align-items-center">
              <h2 className="mb-0 lh-base">Profile</h2>
              <Button variant="primary" type="submit" size="">
                SAVE
              </Button>
            </div>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter channel name"
                value={name}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Describe your channel"
                value={bio}
              />
            </Form.Group>
            <Row>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Country"
                  value={country}
                />
              </Form.Group>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Specialty</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ex. Cardio"
                  value={speciality}
                />
              </Form.Group>
            </Row>
            <Form.Group className="pb-3">
              <Form.Label>Motivatement</Form.Label>
              <Form.Control
                type="text"
                placeholder="Give it 110%!"
                value={motivatement}
              />
            </Form.Group>
          </Form>
          <hr />
          <Row>
            <div className="mb-3 d-flex justify-content-between align-items-center">
              <h2 className="mb-0 lh-base">Account</h2>
              <Button variant="primary" type="submit" size="">
                SAVE
              </Button>
            </div>
            <Form.Group as={Col} className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </Row>
          <Button onClick={handleDeleteAccount}>Delete Account</Button>
        </Col>
      </Row>
    </Container>
  );
}
