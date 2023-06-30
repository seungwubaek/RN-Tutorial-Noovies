export const makeImgPath = (imgPath: string, size: string = 'w500') => {
  return `https://image.tmdb.org/t/p/${size}${imgPath}`;
}
