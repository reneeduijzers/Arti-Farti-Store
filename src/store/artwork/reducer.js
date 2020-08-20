const initialState = [];

export default (state = initialState, action) => {
  console.log("step 6: inside the reducer, type:", action.type);
  console.log("step 6: inside the reducer, payload:", action.payload);
  switch (action.type) {
    case "ALL_ARTWORKS":
      console.log("step 7: inside the case ALL_ARTWORKS:", state);
      return [...state, ...action.payload];
    case "LOVE": {
      console.log("step 7: inside the case LOVE:", state);
      const newState = state.map((artwork) => {
        if (artwork.id === action.payload) {
          const newLove = artwork.hearts + 1;
          const newArtwork = { ...artwork, hearts: newLove };
          return newArtwork;
        }
        return artwork;
      });
      return newState;
    }
    case "ADD_BID": {
      console.log("step 7: inside the case ADD_BID:", action.payload);
      const newState = state.map((artwork) => {
        if (artwork.id === action.payload.artworkId) {
          const newBid = action.payload;
          const newArtwork = { ...artwork, bids: [...artwork.bids, newBid] };
          return newArtwork;
        }
        return artwork;
      });
      return newState;
    }
    default:
      return state;
  }
};
