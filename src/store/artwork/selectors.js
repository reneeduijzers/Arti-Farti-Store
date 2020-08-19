export const getAllArtworks = (reduxState) => {
  console.log("What is the reduxState?", reduxState);
  const artworks = reduxState.artwork;
  return artworks;
};
