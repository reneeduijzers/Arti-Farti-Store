import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addArtwork } from "../store/artwork/actions";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Col } from "react-bootstrap";

export default function AuctionPage() {
  const dispatch = useDispatch();
  const [title, set_Title] = useState("");
  const [bid, set_Bid] = useState("");
  const [url, set_Url] = useState("");
  const [message, set_message] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(addArtwork(title, bid, url));
    set_message("Succes! You will receive offers soon :)");
  }

  return (
    <Container>
      <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
        <h1 className="mt-5 mb-5">Hi there artist, post your artworks here:</h1>
        <Form.Group controlId="formBasicTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => set_Title(e.target.value)}
            placeholder="Enter title"
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicMinimumBid">
          <Form.Label>MinimumBid</Form.Label>
          <Form.Control
            type="number"
            value={bid}
            onChange={(e) => set_Bid(e.target.value)}
            placeholder="Enter minimum bid"
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicUrl">
          <Form.Label>URL</Form.Label>
          <Form.Control
            type="url"
            value={url}
            onChange={(e) => set_Url(e.target.value)}
            placeholder="Enter URL"
            required
          />
        </Form.Group>
        <Form.Group className="mt-5">
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Start auction
          </Button>
        </Form.Group>
        {message}
      </Form>
    </Container>
  );
}
