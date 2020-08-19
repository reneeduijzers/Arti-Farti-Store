const initialState = [];

export default (state = initialState, action) => {
  console.log("step 6: inside the reducer, type:", action.type);
  console.log("step 6: inside the reducer, payload:", action.payload);
  switch (action.type) {
    case "ALL_ARTWORKS":
      return [...state, ...action.payload];
    default:
      return state;
  }
};
