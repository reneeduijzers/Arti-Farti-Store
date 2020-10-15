import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllArtworks } from "../store/artwork/selectors";
import { fetchArtworks } from "../store/artwork/actions";
import "./HomePage.css";
import { Container, Row, Col } from "react-bootstrap";

export default function HomePage() {
  const dispatch = useDispatch();
  const artworks = useSelector(getAllArtworks);

  useEffect(() => {
    dispatch(fetchArtworks);
  }, [dispatch]);

  return (
    <Container fluid className="Artwork-container">
      <Row>
        {artworks.map((artwork) => {
          return (
            <Col key={artwork.id}>
              <ul>
                <h3>
                  {artwork.title}{" "}
                  <img
                    className="Heart-pic"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT5NRNEYeS6fCTvDJc49V9vi2bSwGcPyn2aIw&usqp=CAU"
                    alt="heart"
                  />{" "}
                  ({artwork.hearts})
                </h3>
                <p>
                  <Link to={`/artworks/${artwork.id}`}>
                    <img
                      className="Art-pic"
                      src={artwork.imageUrl}
                      alt="artwork"
                    />
                  </Link>
                </p>
                <h5>total bids: {artwork.bids.length}</h5>
              </ul>
            </Col>
          );
        })}
      </Row>
      <Row className="Header"></Row>
    </Container>
  );
}
