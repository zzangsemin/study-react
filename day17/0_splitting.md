# 17일차

## 코드 스플리팅

- 파일을 분리하는 작업
- 웹팩(webpack)이 하는 일

```
- 필드 작업을 통해 프로젝트에서 사용되는 불필요한 주석, 경고 메시지, 공백 등을 제거하여 파일 크기를 최소화
- 브라우저에서 JSX 문법이나 다른 최신 자바스크립트 문법이 원활하게 실행되도록 코드의 트랜스파일 작업
- 만약 프로젝트 내에 이미지와 같은 정적 파일이 있다면 해당 파일을 위한 경로도 설정
* 웹팩에서 별도의 설정을 하지 않는다면 모든 JS 파일이 하나의 파일로 합쳐지고, 모든 CSS 파일도 하나의 파일로 합쳐짐
```

- CRA로 프로젝트를 빌드한 경우 기본 웹팩 설정에는 SplitChunks라는 기능이 적용
  - node_modules에서 불러온 파일, 일정크기 이상의 파일, 여러 파일 간에 공유된 파일을 자동으로 분리시켜 캐싱 효과
  - 애플리케이션의 규모가 커지면 불필요한 컴포넌트 정보도 모두 불러와 로딩이 오래 걸리고, 트래픽이 많이 나옴
- **코드 비동기 로딩**을 통해 자바스크립트 함수, 객체, 혹은 컴포넌트를 처음에는 불러오지 않고 필요한 시점에 불러와서 사용

### 자바스크립트 함수 비동기 로딩

```jsx
// notify.js
export default function notify() {
  alert("안녕하세요!");
}
```

```jsx
const onClick = () => {
  import("./notify").then((result) => result.default());
};
```

- import() 함수 형태로 메서드 안에서 사용하면 파일을 따로 분리시켜서 저장하여 실제 함수가 필요한 시점에 파일을 불러와서 사용
- import를 함수로 사용하면 Promise를 반환
- 표준 자바스크립트는 아니지만 dynamic import 문법으로 웹팩에서 지원
- 이 함수를 통해 모듈을 불러올 때 모듈에서 default로 내보낸 것은 result.default를 참조해야 사용할 수 있음

### React.lazy와 Suspense를 통한 컴포넌트 코드 스플리팅

- state를 따로 선언하지 않고도 간편하게 컴포넌트 코드 스플리팅을 할 수 있음
- React.lazy : 컴포넌트를 렌더링 하는 시점에서 비동기적으로 로딩할 수 있게 해주는 유틸 함수

```jsx
const SplitMe = React.lazy(() => import("./SplitMe(파일이름예시)"));
```

- Suspense : 리액트 내장 컴포넌트로서 코드 스플리팅된 컴포넌트를 로딩하도록 발동시킬 수 있고, 로딩이 끝나지 않았을 때 보여줄 UI 설정 가능
  - fallback props를 통해 로딩 중에 보여줄 JSX를 지정할 수 있음

```jsx
import React, {Suspense} from 'react';
(...)
<Suspense fallback={<div>loading...</div>}>
  <SplitMe />
</Suspense>
```

### Loadable Components를 통한 코드 스플리팅

- `Loadable Components` : 코드 스플리팅을 편하게 하도록 도와주는 서드파티 라이브러리
  - 서버 사이드 렌더링을 지원
  - 렌더링하기 전에 필요할 때 스플리팅된 파일을 미리 불러올 수 있는 기능도 있음

\* 서버 사이드 렌더링 : 웹 서비스의 초기 로딩 속도 개선, 캐싱 및 검색 엔진 최적화를 가능하게 해주는 기술

- 서버 사이드 렌더링을 사용하면 웹 서비스의 초기 렌더링을 사용자의 브라우저가 아닌 서버 쪽에서 처리

```jsx
import loadable from "@loadable/component";
const SplitMe = loadable(() => import("./SplitMe"), {
  fallback: <div>loading...</div>,
});
(...)
const onMouseOver = () => {
  SplitMe.preload();
};
```

- onMouseOver 이벤트에 해당 함수를 걸어주면 컴포넌트를 미리 불러와줌
  - 이런 기능을 구현하면 나중에 사용자에게 더 좋은 경험을 제공할 수 있음
- 이 외에도 타임아웃, 로딩 UI 딜레이, 서버 사이드 렌더링 호환 등 다양한 기능을 제공
