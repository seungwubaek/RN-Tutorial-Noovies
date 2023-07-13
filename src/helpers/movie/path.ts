export const makeImgPath = (imgPath: string | null, size: string = 'w500') => {
  return `https://image.tmdb.org/t/p/${size}${imgPath}`;
}
