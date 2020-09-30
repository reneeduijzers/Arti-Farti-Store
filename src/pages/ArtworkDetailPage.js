import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllArtworks } from "../store/artwork/selectors";
import { selectUser } from "../store/user/selectors";
import { addHeart, addBid } from "../store/artwork/actions";
import { Container, Row, Col } from "react-bootstrap";

export default function ArtworkDetailPage() {
  const artworks = useSelector(getAllArtworks);
  const user = useSelector(selectUser);
  const route_parameters = useParams();
  const dispatch = useDispatch();

  const filteredArtworks = artworks.filter((artwork) => {
    if (artwork.id === parseInt(route_parameters.id)) {
      return true;
    } else {
      return false;
    }
  });

  // // find returns an object ! should have used that

  // console.log("What is filtered artworks?", filteredArtworks); // an array with objects + bids array with 5 objects

  // console.log("What is filtered artworks?", filteredArtworks[0]); // now one object with bids array with 5 objects

  // const artworkToDisplay = filteredArtworks[0];

  // // acces bids in your object =
  // const bidsSorted = [...artworkToDisplay.bids].sort(
  //   (bid_a, bid_b) => bid_b.amount - bid_a.amount
  // );

  // // How to use reduce =
  // const maxBidAmount = artworkToDisplay.bids.reduce((acc, bid) => {
  //   // [{}, {}, {}]
  //   if (acc < bid.amount) {
  //     return bid.amount;
  //   } else {
  //     return acc;
  //   }
  // }, 0);

  // const maxBidAmount2 = artworkToDisplay.bids.reduce(
  //   (acc, bid) => (acc > bid.amount ? acc : bid.amount),
  //   0
  // );

  // const totalBid = artworkToDisplay.bids.reduce(
  //   (acc, bid) => acc + bid.amount,
  //   0
  // );

  const id = route_parameters.id;

  const [bid, set_Bid] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(addBid(bid, id));
  }

  function incrementHeart(event) {
    event.preventDefault();
    const heartsArray = filteredArtworks.map((artwork) => {
      return artwork.hearts + 1;
    });
    const hearts = heartsArray[0];
    dispatch(addHeart(hearts, id));
  }

  return (
    <Container>
      <Row>
        <Col>
          {filteredArtworks.map((artwork) => {
            return (
              <ul key={artwork.id}>
                <h1>
                  {artwork.title} ♥ ({artwork.hearts})
                </h1>
                <p>
                  <button className="Button" onClick={incrementHeart}>
                    give heart
                  </button>
                </p>
                <p>
                  <img
                    className="ArtPic"
                    src={artwork.imageUrl}
                    alt="artwork"
                  />
                </p>
                {artwork.bids.map((bid) => {
                  return (
                    <ul key={bid.id}>
                      <h4>{bid.amount} euro</h4>
                      <p>bidder: {bid.email}</p>
                    </ul>
                  );
                })}
              </ul>
            );
          })}
          {user.token ? (
            <form onSubmit={handleSubmit}>
              <p>
                <label>
                  Amount (Euro):{" "}
                  <input
                    type="number"
                    min={filteredArtworks.map((artwork) => {
                      return artwork.minimumBid;
                    })}
                    value={bid}
                    onChange={(e) => set_Bid(e.target.value)}
                  />
                </label>
              </p>
              <p>
                <button className="Button" type="submit">
                  BID!
                </button>
              </p>
            </form>
          ) : (
            ""
          )}
        </Col>
      </Row>
    </Container>
  );
}
