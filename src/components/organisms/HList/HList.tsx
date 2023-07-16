import React from 'react';
import { FlatList } from 'react-native';

// Components
import { HListSeparator } from '~/components/molecules/HListSeparator';
import VMedia from '~/components/organisms/VMedia';

// Styles
import {
  ListContainer,
  ListTitle
} from './HList.style';

interface HListProps {
  title: string;
  data: any[];
}

const HList: React.FC<HListProps> = ({
  title,
  data,
}) => {
  return (
    <ListContainer>
      <ListTitle>{title}</ListTitle>
      <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: 20,
          }}
          ItemSeparatorComponent={HListSeparator}
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <VMedia
            posterPath={item.poster_path}
            originalTitle={item.original_title ?? item.original_name}
            voteAverage={item.vote_average}
          />}
        />
    </ListContainer>
  )
}

export default HList;
