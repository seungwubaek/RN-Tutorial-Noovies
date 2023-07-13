import React from 'react';
import styled from 'styled-components/native';
import Poster from '~/components/molecules/Poster';
import Votes from '~/components/molecules/Votes';

import { StTextMoviePosterTitle } from '~/components/molecules/Poster/Poster.style';

const Movie = styled.View`
  align-items: center;
`;

interface VMediaProps {
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
}

const VMedia: React.FC<VMediaProps> = ({
  posterPath,
  originalTitle,
  voteAverage,
}) => (
  <Movie>
    <Poster path={posterPath} />
    <StTextMoviePosterTitle
      numberOfLines={1}
      posterWidth={true}
    >
      {originalTitle}
    </StTextMoviePosterTitle>
    <Votes voteAverage={voteAverage} />
  </Movie>
);

export default VMedia;
