import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllArtworks } from "../store/artwork/selectors";
import { fetchArtworks , addHeart } from "../store/artwork/actions";
import "./HomePage.css";
import { Container, Row, Col } from "react-bootstrap";

export default function HomePage() {
  const dispatch = useDispatch();
  const artworks = useSelector(getAllArtworks);
  const [hearts, set_hearts] = useState(0);
  const [id, set_id] = useState(0);

  useEffect(() => {
    dispatch(fetchArtworks);
  }, [dispatch]);

  useEffect(() => {
    dispatch(addHeart(hearts, id));
  }, [hearts, id, dispatch]);

  return (
    <Container fluid className="Artwork-container">
      <Row>
        <Col style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          marginRight: 100,
          marginLeft: 100,      
        }}>
        <h2>Hi there, please have a look at our current available artworks. 
        <br/>
        Interested?   
        <Link to="/signup" style={{ textAlign: "center" }}> Sign up</Link> to participate in one of our auctions and place a bid, or post you artwork and start to receive offers.
        <br/>
        <br/>
        </h2>
        </Col>
      </Row>
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
                    onClick={(e) => {
                      set_hearts(artwork.hearts + 1);
                      set_id(artwork.id);
                    }}
                    style={{ cursor: "pointer" }}
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
                <h5>total bids: {artwork.bids.length} 
                  </h5>
              </ul>
            </Col>
          );
        })}
      </Row>
      <Row
      style={{
        MarginEnd: 50
      }}>
        <Col style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center"
        }}>
        <h2>
      <br/>
      Before you go, don't forget to like your favorite pieces by clicking the <img
      className="Heart-pic"
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT5NRNEYeS6fCTvDJc49V9vi2bSwGcPyn2aIw&usqp=CAU"
      alt="heart"
      />
      <br/>
      Thank you!
        <br/>
        <br/>
        </h2>
        </Col>
      </Row>
      <Row className="Header"></Row>
    </Container>
  );
}
