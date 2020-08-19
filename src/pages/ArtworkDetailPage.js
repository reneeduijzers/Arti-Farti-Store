import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllArtworks } from "../store/artwork/selectors";

export default function ArtworkDetailPage() {
  const artworks = useSelector(getAllArtworks);
  const route_parameters = useParams();

  const filteredArtworks = artworks.filter((artwork) => {
    if (artwork.id === parseInt(route_parameters.id)) {
      return true;
    } else {
      return false;
    }
  });

  return (
    <div>
      {filteredArtworks.map((artwork) => {
        return (
          <ul key={artwork.id}>
            <h1>
              {artwork.title} ♥ ({artwork.hearts})
            </h1>
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
