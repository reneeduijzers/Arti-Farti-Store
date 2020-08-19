import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllArtworks } from "../store/artwork/selectors";
import { fetchArtworks } from "../store/artwork/actions";
import "./HomePage.css";

export default function HomePage() {
  const dispatch = useDispatch();
  const artworks = useSelector(getAllArtworks);

  useEffect(() => {
    dispatch(fetchArtworks);
  }, [dispatch]);

  return (
    <div>
      {artworks.map((artwork) => {
        return (
          <ul key={artwork.id}>
            <h1>
              {artwork.title} ♥ ({artwork.hearts})
            </h1>
            <p>
              <img className="ArtPic" src={artwork.imageUrl} alt="artwork" />
            </p>
            <h3>total bids: {artwork.bids.length}</h3>
            <button className="Button">
              <Link className="ButtonLink" to={`/artworks/${artwork.id}`}>
                view details
              </Link>
            </button>
          </ul>
        );
      })}
    </div>
  );
}
