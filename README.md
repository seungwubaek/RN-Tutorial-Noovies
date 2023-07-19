# RN-Tutorial-Novies

React Native 튜토리얼 - Novies

## Installation

### Typescript for React Native

[RN 공홈 Typescript 가이드](https://reactnative.dev/docs/typescript) 참고. 내용은 바뀔 수 있다. (2023-07-09 기준)

1. npm install

```bash
npm install -D @tsconfig/react-native @types/jest @types/react @types/react-test-renderer typescript
```

2. Add a TypeScript config file. Create a tsconfig.json in the root of your project:

```json
{
  "extends": "@tsconfig/react-native/tsconfig.json"
}
```

### Path Alias

1. `tsconfig.json`

```json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@components/*": ["components/*"],
      "@navigations/*": ["navigations/*"],
      "@screens/*": ["screens/*"],
      "@utils/*": ["utils/*"]
    }
  }
}
```

2. Install `babel-plugin-module-resolver`

```bash
npm install --save-dev babel-plugin-module-resolver
```

3. Add `babel.config.js`

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: [
            '.ios.ts',
            '.android.ts',
            '.ios.tsx',
            '.android.tsx',
            '.ts',
            '.tsx',
            '.js',
            '.jsx',
            '.json',
          ],
          alias: {
            '@assets': './assets',
            '~': './src',
            '@components': '~/components',
          },
        },
      ],
    ],
  };
};
```

### Typescript in RN for styled-components

* Create file `src/types/styled.d.ts`
* Insert code for [`declaration merging`](https://www.typescriptlang.org/docs/handbook/declaration-merging.html)

  ```js
  import 'styled-components/native'

  declare module 'styled-components/native' {
    export interface DefaultTheme {
      borderRadius: string;


      colors: {
        main: string;
        secondary: string;
      };
    }
  }
  ```

## Topics

## 개발 환경

* `jsconfig.json`, `tsconfig.json`, `babel.config.js`
  * path alias
  * intellisense
  * typescript

### Typescript in RN

* React Native에서 Typescript 사용하기
  * 세팅하기 참조 <https://reactnative.dev/docs/typescript>

* `interface` 및 `type`
  * `number`, `string`, `boolean`, `object`, `array`
  * `function`
  * 서로 다른 2개의 `object`의 `Array`가 모두 올 수 있는 `property`
    * `Movie`와 `Tv`
  * 특정한 경우에만 `type` 수정
    * `Movie`에서는 `original_title` 이지만 `Tv`에서는 `original_name`

* Styled Component
* React Navigation

### Splash Screen

`App.js`의 `onLayoutRootView` 참고

### Navigation

[React Navigation](https://reactnavigation.org/docs/getting-started)을 이용하여 Stack Navigation 안에 Nested Navigators Tab & Stack 구현

### Infinite Scroll

`FlatList`와 React Query의 `useQuery`, `useInfinityQuery`를 이용하여 API 호출
