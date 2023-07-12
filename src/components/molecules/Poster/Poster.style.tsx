import styled from "styled-components/native";

export const PosterText = styled.Text<{ posterWidth?: boolean }>`
  width: ${({posterWidth}) => posterWidth ? '100px' : 'auto'};
`;

export const StTextMoviePosterTitle = styled(PosterText)`
  color: ${({theme}) => theme.mainText};
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

export const PosterImage = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.5);
`;
