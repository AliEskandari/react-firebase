import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import "./video-card.css";

export default function VideoCard() {
  return (
    <Card className="border-0">
      <Link className="card-img" to={ROUTES.VIDEO.replace(":id", 1)}>
        {/* <Skeleton duration={100} className="img card-img-top" /> */}
        <Card.Img variant="top" src="https://via.placeholder.com//160x100" />
      </Link>
      <Card.Body className="px-0">
        <div className="d-flex justify-content-between">
          <Card.Title className="text-truncate fs-6">
            <Link
              to={ROUTES.VIDEO.replace(":id", 1)}
              className="text-reset text-decoration-none"
            >
              New Workout Video
            </Link>
          </Card.Title>
          <Link
            to={ROUTES.EDIT_VIDEO}
            className="edit-button float-end d-none text-black-50"
          >
            <i className="bi bi-pencil-fill"></i>
          </Link>
        </div>

        <Card.Text className="text-muted">
          <Link
            to={ROUTES.CHANNEL.replace(":id", 1)}
            className="text-reset text-decoration-none"
          >
            Channel X
          </Link>
          <br />
          200k views • 3 days ago
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
