const importAll = (r) => r.keys().map(r);

export const characterImages = importAll(require.context("assets/characters", false, /\.(png|jpe?g|svg)$/));

export const getCharacterImage = (name) => {
  const image = characterImages.find((image) => {
    const characterName = image.default.split('/')[3].split('.')[0];
    return characterName === name;
  });

  return image.default;
}
