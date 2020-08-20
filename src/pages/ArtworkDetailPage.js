import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllArtworks } from "../store/artwork/selectors";
import { addHeart } from "../store/artwork/actions";

export default function ArtworkDetailPage() {
  const artworks = useSelector(getAllArtworks);
  const route_parameters = useParams();
  const dispatch = useDispatch();

  const filteredArtworks = artworks.filter((artwork) => {
    if (artwork.id === parseInt(route_parameters.id)) {
      return true;
    } else {
      return false;
    }
  });

  const id = route_parameters.id;

  const [hearts, set_Hearts] = useState("");

  useEffect(() => {
    dispatch(addHeart(hearts, id));
  }, [dispatch, hearts, id]);

  return (
    <div>
      {filteredArtworks.map((artwork) => {
        return (
          <ul key={artwork.id}>
            <h1>
              {artwork.title} ♥ ({artwork.hearts})
            </h1>
            <p>
              <button
                className="Button"
                onClick={(e) => set_Hearts(artwork.hearts + 1)}
              >
                give heart
              </button>
            </p>
            <p>
              <img className="ArtPic" src={artwork.imageUrl} alt="artwork" />
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
    </div>
  );
}
