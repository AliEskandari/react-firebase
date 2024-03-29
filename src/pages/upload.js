import React, { useContext, useState, useRef } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { uploadVideo } from "../services/firebase";
import { useHistory } from "react-router-dom";
import UserContext from "../context/user";
import useUser from "../hooks/use-user";
import * as ROUTES from "../constants/routes";
import PubSub from "pubsub-js";

// Alert
import AlertContext from "../context/alert";

export default function Upload() {
  const history = useHistory();
  const { user: loggedInUser } = useContext(UserContext);
  const { user } = useUser(loggedInUser.uid);
  const { setAlert } = useContext(AlertContext);

  const fileInput = useRef("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [exclusive, setExclusive] = useState(false);

  // setup warning for exiting during upload
  const handleBeforeUnload = (event) => {
    event.preventDefault();
    return (event.returnValue =
      "Are you sure you want to close? Closing will end the upload.");
  };

  const handlePublish = (event) => {
    event.preventDefault();

    // setup warning for exiting during upload
    window.addEventListener("beforeunload", handleBeforeUnload);

    const file = fileInput.current.files[0];
    const video = { title, description, exclusive };

    uploadVideo(user, file, video, onProgress, onDone);

    history.push(ROUTES.PROFILE);
  };

  const onProgress = (progress) => {
    const message = "Uploading video..." + progress + "% done";
    setAlert({ text: message });
  };

  const onDone = (link) => {
    PubSub.publish("UPLOAD_DONE");

    // remove warning for exiting during upload
    window.removeEventListener("beforeunload", handleBeforeUnload);

    setAlert({
      text: "Uploading video...done",
      dismissible: true,
      link: link,
    });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={8} xl={5} className="border-3">
          <Form onSubmit={handlePublish}>
            <div className="mb-3 d-flex justify-content-between align-items-center">
              <h2 className="mb-0">New Video</h2>
            </div>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>File</Form.Label>
              <Form.Control
                required
                type="file"
                ref={fileInput}
                className=""
                accept="video/mp4, video/mpeg, video/quicktime"
              />
              <Form.Text id="" muted></Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter video title"
                required
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter video description"
                value={description}
                onChange={({ target }) => setDescription(target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Check
                type="switch"
                id=""
                label="Exclusive"
                checked={exclusive}
                onChange={({ target }) => setExclusive(target.checked)}
              />
              <Form.Text id="" muted>
                Activate to make video visible only to your subscribers.
              </Form.Text>
            </Form.Group>
            <Button variant="primary" className="float-end mb-3" type="submit">
              Publish
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
