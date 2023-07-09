# Trouble Shoot

## Build Error: .MainActivity does not exist.

__Error Message__

```bash
Activity class {com.noovies/com.noovies.MainActivity} does not exist.
```

AVD를 Android Version `Nugat`에서 Android Version `Tiramisu`로 바꾼 후(device 자체를 새로 만듬),
`npm run android`로 실행 시 에러

__Solution__

아래 방법대로 해도 에러 해결이 안됨

* AVD Device 안에서 앱 삭제
* 패키지 삭제
  `adb uninstall com.noovies`
* Shell 재시작
* 재설치
  `npm run android`
* 여전히 실패

근데 미해결된 채로 `npm start`로 Metro Bundler를 실행하고, AVD 안에서 직접 앱을 실행하면 빌드를 완료하며 에러가 안남
