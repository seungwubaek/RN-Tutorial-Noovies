# Summary

## Stack

* React Native with Typescript
* React Navigation
* ScrollView & FlatList
* React Query
* Infinite Scroll

## React Native with Typescript

타입 확인 용도로 사용

* 공식 참고 <https://reactnative.dev/docs/typescript>
* 패키지 추가
* `tsconfig.json` 설정
* `babel-plugin-module-resolver` 설정

### 타입을 무시하려고 할 때

* 타입 `any` 사용
* 무시하려는 코드 바로 위에 주석 `// @ts-ignore` 추가

### 다양한 패키지들의 Typescript 지원

각 공식 문서의 설치 방법과 사용 방법을 참고하자

* Styled Components
* React Navigation
* React Query

## React Navigation

Composite(복합) Navigation 구현

* Native Stack Navigation
  * Tab Navigation
  * Native Stack Navigation

### 주요 요소

* `NavigationContainer`: Provider 역할
* `createNativeStackNavigator`: Native Stack Navigation 생성
* `createStackNavigator`: Stack Navigation 생성
  * JS로 구현하기 때문에 약간 성능 다운이 있다
  * 심플한 사용일 경우 `NativeStackNavigator`를 사용하는 것이 좋음
* `createBottomTabNavigator`: Tab Navigation 생성
* `useNavigation`: Navigation 사용
* `useRoute`: Route 사용

### API

* `navigate`: 다른 스크린으로 이동
  * `navigate('ScreenName', { params })`
* `goBack`

#### 스크린에서 파라미터 받기

```tsx
const Detail: React.FC<<STackScreenProps<'Detail'>>> = (props) => {
  const { route: { params: { id } } } = props;
  ...
}
```

## ScrollView & FlatList

### ScrollView

`ScrollView`는 처음부터 모든 하위 컴포넌트 리스트를 렌더링하므로 `FlatList` 보다 성능이 좋지 않다.

### FlatList

`FlatList`는 `ScrollView`와 달리 화면에 보이는 컴포넌트만 렌더링하므로 상대적으로 성능이 좋다.

#### 속성

* `contentContainerStyle`: `contentContainer`의 스타일링
* `data`: 렌더링할 데이터
* `renderItem`: 각 아이템을 렌더링할 컴포넌트
* `keyExtractor`: 각 아이템의 key를 부여하는 함수
* `onEndReached`: 스크롤이 끝에 도달했을 때 호출되는 함수
* `onEndReachedThreshold`: 현재 렌더링 되어있는 스크린 스크롤의 상단(`0`)부터 맨 아래(`1`) 중 어느 지점에서 다음 데이터의 렌더링이 시작할지 결정하는 threshold 값
* `onRefresh`: 스크롤을 아래로 당겨 rerender를 하려고 할 때 호출되는 함수
* `refreshing`: `onRefresh` 함수가 호출되었을 때 `true`로 변경되어 refresh 중 `ActivityIndicator`를 보여줄지를 결정. `refreshing`을 스위치 할 `state` 값을 하나 만든 다음, `onRefresh` 함수 내부에서 통제하자.
* `ListHeaderComponent`: FlatList의 Header로 사용할 컴포넌트
  * 수직(수평) 스크롤 안에 같은 방향의 수직(수평) 스크롤이 들어가는 경우 `ListHeaderComponent` 응용 가능

### FlatList with styled-components in typescript

typescript로 `FlatList`를 만드는데 Styled Components를 사용하려고 할때 다음과 같은 형변환을 해줘야 `<FlatList>` 컴포넌트 property의 intellisense가 정상적으로 작동한다.

```tsx
// App.style.tsx
import { FlatList } from 'react-native';
import styled from 'styled-components/native';

export const StFlatList = styled.FlatList`` as typeof FlatList;  // 형변환 부분

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

## React Query

### `QueryKey`

* `Array` 형식으로 작성 `['movie', 'trending']`
* 나중에 `refetch` 호출시 그룹 단위 호출 가능

  ```tsx
  await queryClient.refetchQueries(['movie']);  // movie로 시작하는 QueryKey를 갖는 모든 Query들을 호출
  ```


### Query Function에 파라미터 전달

* `useQuery` 사용 시점에 URL 파라미터를 `QueryKey` Array에 넣어 함께 전달
* Fetcher 함수에서 `QueryFunctionContext`(=`QueryKey` Array)를 통해 URL 파라미터를 받아 사용

```tsx
// Movie.tsx
const Movie = () => {
  const { isLoading, data } = useQuery('movies', params.id], movieApi.getDetail);
  ...
}

// movieApi.ts
const getDetail = async ({ queryKey }: QueryFunctionContext) => {
  const [, id] = queryKey;
  return fetch(`${BASE_URL}/movie/${id}?language=ko-KR&append_to_response=videos,images&api_key=${API_KEY}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  }).then((resp) => resp.json());
};
```

## Infinite Scroll

무한 스크롤.

`<FlatList>`와 React Query의 `useInfiniteQuery` 사용
