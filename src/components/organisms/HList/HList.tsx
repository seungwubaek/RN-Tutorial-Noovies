import React from 'react';
import { FlatList } from 'react-native';

// Components
import { HListSeparator } from '~/components/molecules/HListSeparator';
import VMedia from '~/components/organisms/VMedia';

// Styles
import { ListContainer, ListTitle } from './HList.style';

// Types
import { Movie, Tv } from '~/types/api';

interface HListProps {
  title: string;
  data: Array<(Movie & { original_name?: string }) | (Tv & { original_title?: string })>;
}

const HList: React.FC<HListProps> = ({ title, data }) => {
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
        renderItem={({ item }) => (
          <VMedia
            posterPath={item.poster_path}
            originalTitle={item.original_title ?? item.original_name}
            voteAverage={item.vote_average}
            fullData={item}
          />
        )}
      />
    </ListContainer>
  );
};

export default HList;
