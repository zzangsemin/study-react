# 22일차

## 프런트엔드 프로젝트: 시작 및 회원 인증 구현

### 작업 환경 준비하기

1. 설정 파일 만들기

- `.prettierrc` 프로젝트의 코드 스타일을 정리해주는 Prettier의 설정 파일을 만듬
- `jsconfig.json` 프로젝트에서 자동 import 기능이 제대로 작동할 수 있게 함

2. 라우터 적용

- 프로젝트를 처음 만들고 설계를 시작할 때 리액트 라우터를 프로젝트에 설치하고 적용하는 것이 좋음
- 주요 페이지의 라우트 컴포넌트 만들기

```
LoginPage.js - 로그인
RegisterPage.js - 회원가입
WritePage.js - 글쓰기
PostPage.js - 포스트 읽기
PostListPage.js - 포스트 목록
```

3. 스타일 설정&Button 컴포넌트 만들기

- styled-components를 사용하여 스타일링
- `/blog/blog-frontend/src/lib/styles/paletee.js` : 필요한 색상만 불러와서 사용할 것
- `/blog/blog-frontend/src/components/src/Button.js` : 다양한 곳에서 버튼 컴포넌트를 재사용할 예정

4. 리덕스 적용

```
yarn add redux react-redux redux-actions immer redux-devtools-extension
```

- immer 라이브러리가 꼭 필요하지는 않지만 불변성을 편하게 관리하려고 사용
