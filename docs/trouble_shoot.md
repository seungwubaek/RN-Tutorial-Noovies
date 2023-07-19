# Trouble Shoot

## Build Error: .MainActivity does not exist.

**Error Message**

```bash
Activity class {com.noovies/com.noovies.MainActivity} does not exist.
```

AVD를 Android Version `Nugat`에서 Android Version `Tiramisu`로 바꾼 후(device 자체를 새로 만듬),
`npm run android`로 실행 시 에러

**Solution**

아래 방법대로 해도 에러 해결이 안됨

- AVD Device 안에서 앱 삭제
- 패키지 삭제
  `adb uninstall com.noovies`
- Shell 재시작
- 재설치
  `npm run android`
- 여전히 실패

근데 미해결된 채로 `npm start`로 Metro Bundler를 실행하고, AVD 안에서 직접 앱을 실행하면 빌드를 완료하며 에러가 안남

## Warning: Encountered two children with the same key

I have same issue and I solved problem by removing items has duplicated key from the page data fetched using `useInfiniteQuery`.

TMDB 서버 데이터 자체 문제라고 생각되며, `useInfiniteQuery`를 이용해서 가져온 page 데이터에서 중복된 key를 가지는 item을 제거하는 것으로 문제를 해결했습니다.

자세한 코드는 아래 링크를 참고해주세요!

- 에러 발생 Commit : [commit 128f1da](https://github.com/seungwubaek/RN-Tutorial-Noovies/commit/128f1dacfc14ec03f232b9ac28b45093accbe97b)
- 에러 해결 Commit : [commit 586a200](https://github.com/seungwubaek/RN-Tutorial-Noovies/commit/586a20062505ab2f3a33d08e050403a4f3c7314d)

### Problem

I think it is not the our problem but maybe TMDB Backend Server's.

In my case, first of all, three APIs and `useInfiniteQuery` functions fetching data(`Trending`, `Airing Today`, and `Top Rated`) from TMDB Server have all same structure.

the differences are only `url` of API and `query key` of `useInfiniteQuery` like below.

**Three APIs**

![image](https://github.com/seungwubaek/RN-Tutorial-Noovies/assets/22609242/5afd0524-fc1b-43b5-8661-57c351289bce)

**Three `useInfiniteQuery` functions**

![image](https://github.com/seungwubaek/RN-Tutorial-Noovies/assets/22609242/188f18c5-fb39-4aa5-afb8-f56a340f61e7)

If problem comes from my code, these three functions may not work all correctly.

However, strangely, the Error Log `Warning: Encountered two children with the same key` was only occurred at API `getAiringToday` and the others were executed properly.

I tried to reload, and re-build the source code many times but all results were same.

So, I ran `console.log(todayData)` showing fetch results of API `getAiringToday` when `Tv` screen component was rendered. And I found there were already duplicated keys in raw data from TMDB.

We can find that there are actually duplicated children keys, as follow real log data.

- First `LOG` shows the results of API `getAiringToday` with query param `page=1`.
- Second `LOG` shows the results First one + the results with query params `page=2`.

![image](https://github.com/seungwubaek/RN-Tutorial-Noovies/assets/22609242/61600e98-c031-42bb-ba3c-32d080ef188e)

I found three duplicated children keys `134224`, `226411`, and `111453` above.
And this matched with the Error Logs `Warning: Encountered two children with the same key`.

### Solve

The main solve key is modifying the data of each page fetched using `useInfiniteQuery` before rendering.

The React Query support some functionalities for that. So, we only need to use option `select` with `useInfiniteQuery`.

We can assign some function to modify data to `select` option.

- Procedure of function in `select` option
  - STEP1: Save all key of items in page 1, and Make page 1 data.
  - STEP2: In next page(=page 2), if item key exists in saved key, remove it, else save that key too, and Make page 2 data.
  - STEP3: Repeat STEP2 for all page.

If want to see detail codes, please see below links.

- Commit has Error : [commit 128f1da](https://github.com/seungwubaek/RN-Tutorial-Noovies/commit/128f1dacfc14ec03f232b9ac28b45093accbe97b)
- Error Solve Commit : [commit 586a200](https://github.com/seungwubaek/RN-Tutorial-Noovies/commit/586a20062505ab2f3a33d08e050403a4f3c7314d)
