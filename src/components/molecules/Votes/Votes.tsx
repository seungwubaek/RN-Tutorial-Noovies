import React from 'react';

import { StVoteText } from './Votes.style';

interface VotesProps {
  voteAverage: number;
}

const Votes: React.FC<VotesProps> = ({ voteAverage }) => (
  <StVoteText
    posterWidth={true}
  >{voteAverage > 0 ? `⭐️ ${voteAverage}/10` : `Coming soon`}</StVoteText>
);

export default Votes;
