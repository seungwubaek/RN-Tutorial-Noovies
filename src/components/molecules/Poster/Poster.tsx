import React from 'react';

// scripts
import { makeImgPath } from '~/helpers/movie/path';

// styles
import { PosterImage } from './Poster.style';

interface PosterProps {
  path: string | null;
}

const Poster: React.FC<PosterProps> = ({ path }) => {
  return <PosterImage source={{ uri: makeImgPath(path) }} />;
};

export default Poster;
