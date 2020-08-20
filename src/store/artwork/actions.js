import Axios from "axios";

export async function fetchArtworks(dispatch, getState) {
  const { artwork } = getState();
  if (!artwork.length) {
    const response = await Axios.get("http://localhost:4000");
    console.log("did the API handle the get artworks request?", response);
    const artworks = response.data;
    dispatch({ type: "ALL_ARTWORKS", payload: artworks });
  }
}

export const addHeart = (heart, id) => {
  return async (dispatch) => {
    const response = await Axios.patch("http://localhost:4000/addheart", {
      hearts: heart,
      artworkId: id,
    });
    console.log("did the API handle the patch heart request?", response);
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
      "http://localhost:4000/addbid",
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

    console.log("Did the API hanle the post bid request?", response);
    const newBid = response.data;
    dispatch({ type: "ADD_BID", payload: newBid });
  };
};
