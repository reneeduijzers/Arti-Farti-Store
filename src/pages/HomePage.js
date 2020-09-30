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
    <Container>
      <Row>
        {artworks.map((artwork) => {
          return (
            <Col>
              <ul key={artwork.id}>
                <h3>
                  {artwork.title} ♥ ({artwork.hearts})
                </h3>
                <p>
                  <img
                    className="ArtPic"
                    src={artwork.imageUrl}
                    alt="artwork"
                  />
                </p>
                <h5>total bids: {artwork.bids.length}</h5>
                <button className="Button">
                  <Link className="ButtonLink" to={`/artworks/${artwork.id}`}>
                    view details
                  </Link>
                </button>
              </ul>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
