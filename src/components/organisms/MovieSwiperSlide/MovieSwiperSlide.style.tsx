import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export const SwiperItem = styled.View`
  width: ${WIDTH}px;
  height: 100%;
`;

export const StyledImageBackground = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

export const NowShowingContentWrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const NowShowingContentColumn = styled.View`
  width: 50%;
  margin-left: 15px;
`;

export const NowShowingText = styled.Text`
  color: white;
`

export const NowShowingTitle = styled(NowShowingText)`
  font-size: 18px;
  font-weight: bold;
`;

export const NowShowingTextContent = styled(NowShowingText)`
  color: rgba(255, 255, 255, .75);
`

export const NowShowingOverView = styled(NowShowingTextContent)`
  margin-top: 10px;
  font-size: 12px;
`;

export const NowShowingVotes = styled(NowShowingTextContent)`
  margin-top: 5px;
  font-size: 14px;
`;