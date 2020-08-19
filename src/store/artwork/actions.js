import Axios from "axios";

export async function fetchArtworks(dispatch, getState) {
  const { artwork } = getState();
  if (!artwork.length) {
    const response = await Axios.get("http://localhost:4000");
    const artworks = response.data;
    dispatch({ type: "ALL_ARTWORKS", payload: artworks });
  }
}
