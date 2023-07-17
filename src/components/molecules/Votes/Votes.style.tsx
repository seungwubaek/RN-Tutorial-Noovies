import styled from 'styled-components/native';

import { PosterText } from '~/components/molecules/Poster/Poster.style';

export const StVoteText = styled(PosterText)`
  color: ${({ theme }) => theme.subText};
  font-size: 10px;
`;
