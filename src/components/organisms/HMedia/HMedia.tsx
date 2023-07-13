import React from 'react';
import styled from 'styled-components/native';
import Poster from '~/components/molecules/Poster';
import Votes from '~/components/molecules/Votes';

import { StTextMoviePosterTitle } from '~/components/molecules/Poster/Poster.style';

import {
  StTextOverview,
  StTextRelease,
  StViewHColumn,
  StViewHMovie
} from './HMedia.style';

interface HMediaProps {
  posterPath: string | null;
  originalTitle: string;
  overview: string;
  releaseDate?: string;
  voteAverage?: number;
}

const HMedia: React.FC<HMediaProps> = ({
  posterPath,
  originalTitle,
  overview,
  releaseDate,
  voteAverage,
}) => {
  return (
    <StViewHMovie>
      <Poster path={posterPath} />
      <StViewHColumn>
        <StTextMoviePosterTitle
          posterWidth={false}
        >
          {originalTitle.length > 30
            ? `${originalTitle.slice(0, 30)}...`
            : originalTitle}
        </StTextMoviePosterTitle>
        {releaseDate ? (
          <StTextRelease>
            {new Date(releaseDate).toLocaleDateString('ko', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </StTextRelease>
        ) : null}
        {voteAverage ? <Votes voteAverage={voteAverage} /> : null}
        <StTextOverview numberOfLines={3}>{overview}</StTextOverview>
      </StViewHColumn>
    </StViewHMovie>
  );
};

export default HMedia;
