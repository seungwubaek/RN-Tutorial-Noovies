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
module.exports = function(api) {
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
