# Summary

## Stack

## ScrollView & FlatList

### FlatList with styled-components in typescript

typescript로 `FlatList`를 만드는데 Styled Components를 사용하려고 할때 다음과 같은 형변환을 해줘야 `<FlatList>` 컴포넌트 property의 intellisense가 정상적으로 작동한다.

```tsx
// App.style.tsx
import { FlatList } from 'react-native';
import styled from 'styled-components/native';

export const StFlatList = styled.FlatList`` as typeof FlatList;

// App.tsx
import React from 'react';
import { StFlatList } from './App.style';

...

return (
  <StFlatList
    data={data}
    keyExtractor={(item) => item.id.toString()}  // 위에서 FlatList 형변환 하지않으면 item의 type을 추론 못함
    renderItem={({ item }) => <Text>{item.title}</Text>}  // 여기도 마찬가지
  />
)
```
