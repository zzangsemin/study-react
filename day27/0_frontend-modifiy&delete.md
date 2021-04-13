# 27일차

## 프런트엔드 프로젝트: 수정/삭제 기능 구현 및 마무리

### 포스트 수정

1. PostActionButtons 컴포넌트 만들기

- 포스트 읽는 화면에서 포스트 작성자에게만 수정 버튼과 삭제 버튼 노출
- PostViewer에서 props로 컴포넌트를 받아와 JSX 형태로 렌더링

2. 수정 버튼 클릭 시 글쓰기 페이지로 이동하기

- write 모듈에 SET_ORIGINAL_POST 액션 추가
  - 현재 보고있는 포스트 정보를 write 모듈에서 관리하는 상태에 넣음
- `lib/api/posts.js`에 수정 API 요청
- write 모듈에 UPDATE_POST 액션과 updatePostSaga 만들기

### 포스트 삭제

- 삭제 버튼을 누를 때 사용자의 확인을 한 번 더 요청하는 모달 컴포넌트 만들기

  - 모달별로 파일 분리 시 무달의 개수가 많아졌을 때 관리가 쉬움

  > /blog/blog-frontend/src/components/common/AskModal.js
  > /blog/blog-frontend/src/components/post/AskRemoveModal.js

- `lib/api/posts.js`에 삭제 API 요청(따로 보여주어야 할 결과가 없으니 리덕스 액션과 사가를 만드는 작업 생략)

### react-helmet-async로 meta 태그 설정하기

- react-helmet-async 라이브러리를 사용하여 meta 태그를 리액트 앱에서 설정
- `src/index.js`에서 `HelmetProvider` 컴포넌트로 App 컴포넌트를 감싸주기 \
  ->meta 태그를 설정하고 싶은 곳에 `Helmet` 컴포넌트를 사용

```jsx
// ex) title(브라우저 페이지의 제목) 설정
import { Helmet } from "react-helmet-async";

const App = () => {
  return (
    <>
      <Helmet>
        <title>REACTERS</title>
      </Helmet>
      (...)
    </>
  );
};
```

### 프로젝트 마무리

1. 프로젝트 빌드하기

- 백엔드 서버를 통해 리액트 앱을 제공할 수 있도록 빌드해주어야 함
- 클라이언트 프로젝트 디렉터리에서 `yarn build`를 실행하면 `build` 디렉터리 생성

2. koa-static으로 정적 파일 제공하기

- `/blog/blog-frontend/build` 디렉터리 안의 파일을 사용할 수 있도록 서버 프로젝트에 koa-static을 사용하여 정적 파일 제공기능 구현

```jsx
// /blog/blog-backend/src/main.js 관련없는 코드 생략
import serve from "koa-static";
import path from "path";
import send from "koa-send";
const buildDirectory = path.resolve(__dirname, "../../blog-frontend/build");
app.use(serve(buildDirectory));
app.use(async (ctx) => {
  // Not Found이고, 주소가 /api로 시작하지 않는 경우
  if (ctx.status === 404 && ctx.path.indexOf("/api") !== 0) {
    // index.html 내용을 반환
    await send(ctx, "index.html", { root: buildDirectory });
  }
});
```

- send라는 함수를 사용하는 미들웨어로 클라이언트 기반 라우팅이 제대로 작동하게 해줌

3. 더 할 수 있는 작업

```
- 코드 스플리팅
- 서버 호스팅
- 서버 사이드 렌더링
```

### 정리

- 리액트 프로젝트를 만들 때 반복되는 개발 흐름

```
1. 기능 설계하기 : 어떤 컴포넌트가 필요할지 생각
2. UI 만들기 : 사용자에게 보이는 UI를 먼저 만들기
3. API 연동하기 : API 연동이 필요할 경우 필요한 코드를 준비
4. 상태 관리하기 : 리덕스, 컴포넌트 자체 상태 등을 통해 상태를 관리하고, 필요하면 컨테이너 컴포넌트를 새로 만들기
```

- 개발을 진행하는 과정에서 반복되는 코드가 있을 경우, 함수로 분리하거나 재사용할 수 있는 컴포넌트로 분리
- 성능상 문제되는 부분이 있다면 shouldComponentUpdate 또는 React.memo를 사용하여 최적화 시도
