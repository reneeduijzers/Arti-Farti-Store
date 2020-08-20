import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addArtwork } from "../store/artwork/actions";

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
    <div>
      <h2>Hi there artist, post your artworks here: </h2>
      <form onSubmit={handleSubmit}>
        <p>
          <label>
            Title:{" "}
            <input
              type="text"
              value={title}
              onChange={(e) => set_Title(e.target.value)}
            />
          </label>
        </p>
        <p>
          <label>
            Minimum bid:{" "}
            <input
              type="number"
              value={bid}
              onChange={(e) => set_Bid(e.target.value)}
            />
          </label>
        </p>
        <p>
          <label>
            Image url:{" "}
            <input
              type="url"
              value={url}
              onChange={(e) => set_Url(e.target.value)}
            />
          </label>
        </p>
        <p>
          <button className="Button" type="submit">
            Start auction
          </button>
        </p>
      </form>
      {message}
    </div>
  );
}
