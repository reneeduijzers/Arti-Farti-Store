import Axios from "axios";
import { apiUrl } from "../../config/constants";

export async function fetchArtworks(dispatch, getState) {
  const { artwork } = getState();
  if (!artwork.length) {
    const response = await Axios.get(`${apiUrl}`);
    console.log("did the API handle the get artworks request?", response);
    const artworks = response.data;
    dispatch({ type: "ALL_ARTWORKS", payload: artworks });
  }
}

export const addHeart = (heart, id) => {
  return async (dispatch) => {
    const response = await Axios.patch(`${apiUrl}/addheart`, {
      hearts: heart,
      artworkId: id,
    });
    console.log("did the API handle the PATCH heart request?", response);
    const artwork = response.data.id;
    dispatch({ type: "LOVE", payload: artwork });
  };
};

export const addBid = (bid, id) => {
  return async (dispatch, getState) => {
    const state = getState();
    const email = state.user.email;
    const token = state.user.token;
    const response = await Axios.post(
      `${apiUrl}/addbid`,
      {
        email: email,
        amount: bid,
        artworkId: id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Did the API handle the POST add bid request?", response);
    const newBid = response.data;
    dispatch({ type: "ADD_BID", payload: newBid });
  };
};

export const addArtwork = (title, bid, url) => {
  return async (dispatch, getState) => {
    const { user } = getState();
    const id = user.id;
    const token = user.token;

    const response = await Axios.post(
      `${apiUrl}/addartwork`,
      {
        title: title,
        imageUrl: url,
        minimumBid: bid,
        userId: id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Did the API handle the POST add artwork request?", response);
  };
};
