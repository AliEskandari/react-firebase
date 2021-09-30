import { LinkContainer } from "react-router-bootstrap";
import React, { useContext } from "react";
import { Container, Button, Image, Row, Col } from "react-bootstrap";
import VideoCard from "../components/video-card";
import * as ROUTES from "../constants/routes";
import useVideos from "../hooks/use-videos";

// Firebase + User
import UserContext from "../context/user";
import useUserWithAuthId from "../hooks/use-user-with-auth-id";

export default function Profile() {
  const { user: loggedInUser } = useContext(UserContext);
  const { user } = useUserWithAuthId(loggedInUser.uid);
  const { videos } = useVideos(user);

  return (
    <Container>
      <Row className="mb-4">
        {/* Profile Photo */}
        <Col lg={4}>
          <Image
            className="mb-2"
            src="https://via.placeholder.com/1080x720"
            fluid
          ></Image>
        </Col>
        {/* Info */}
        <Col lg={8}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <span className="fs-1">{loggedInUser.displayName}</span>
            <LinkContainer to={ROUTES.SETTINGS}>
              <Button variant="primary" className="" size="sm">
                <i className="bi bi-gear"></i>
                <span className="ms-2">EDIT PROFILE</span>
              </Button>
            </LinkContainer>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a
            lectus sit amet orci rhoncus pellentesque molestie mattis justo.
            Aenean quis felis interdum, auctor arcu at, imperdiet sapien.
            Praesent dictum sit amet nisl nec tempus.
          </p>

          <p>
            <b>Specialty:</b> Kickboxing
          </p>

          <p>
            <b>Country:</b> United States
          </p>

          <p className="fs-2 fst-italic fw-lighter">"Always give it 110%!"</p>
        </Col>
      </Row>

      <Row>
        <Col>
          <Row xs={1} md={3} lg={4} xl={5} className="g-2">
            {videos.map((video, idx) => (
              <Col key={idx}>
                <VideoCard video={video} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
