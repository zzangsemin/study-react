# 22일차~24일차

## 프런트엔드 프로젝트: 시작 및 회원 인증 구현

### 회원가입과 로그인 구현

1. UI 준비하기

- 프레젠테이셔널 컴포넌트들은 `components` 디렉토리에 작성하고, 그 안에 기능별로 디렉터리로 컴포넌트를 분류
  - ex) /common : 재사용되는 컴포넌트, /wirte : 글씨기 관련 컴포넌트
- 각 컴포넌트의 최상위 컴포넌트를 선언할 때는 이름 뒤에 Block이라는 단어를 붙여줄 것임
- 회원 인증에 필요한 UI를 작성

2. 리덕스로 폼 상태 관리하기

- 로그인 페이지, 회원가입 페이지 폼 상태 값 리덕스에 반영

3. API 연동하기

- axios를 사용하여 API연동과 비동기 작업을 쉽게 관리하기 위해 redux-saga와 createRequestSaga 유틸함수를 이용

3-1. axios 인스턴스 생성

> /blog/blog-frontend/src/lib/api/client.js

- axios 인스턴스를 만들면 API 클라이언트에 공통된 설정을 쉽게 넣어줄 수 있음
- 인스턴스를 만들지 않으면 모든 요청에 대해 설정하게 되므로, 다른 API 서버를 사용할 때 곤란해질 수도 있음

3-2. 프록시 설정

- 백엔드 서버와 리액트 개발서버 포트가 달라 CORS 오류가 발생
- 다른 주소에서도 API를 호출할 수 있도록 서버쪽 코드를 수정 \
  하지만 프로젝트를 다 완성하면 리액트 앱도 같은 호스트에서 제공할 것이니 이러한 설정이 불필요
- 대신 프록시(proxy)라는 기능 사용. 웹팩 개발 서버에서 지원하는 기능
  - 개발 서버로 요청하는 API들을 우리가 프록시로 정해둔 서버로 그대로 전달해주고 응답을 애플리케이션에서 사용할 수 있게 해줌
- `package.json`에 `"proxy": "http://localhost:4000/"` 추가하면 \
  `client.get('/api/posts')` `http://localhost:4000/api/posts/`에 대신 요청한뒤 결과물을 응답

3-3. API 함수 작성

> /blog/blog-frontend/src/lib/api/auth.js

3-4. 더 쉬운 API 요청 상태 관리

- redux-saga를 통해 API 요청할 수 있도록 loading 리덕스 모듈과 createRequestSaga 유틸함수 설정

3-5. auth 리덕스 모듈에서 API 사용하기

- 만든 유틸함수를 사용하여 auth 리덕스 모듈에서 API 사용할 수 있도록 구현
  - createRequestSaga를 통해 각 API를 위한 사가를 생성하고, 액션 생성 함수와 리듀서 구현
- 프로젝트의 rootSaga를 만들고, 스토어에 redux-saga 미들웨어 적용

4. 회원가입 구현

> /blog/blog-frontend/src/containers/auth/RegisterForm.js

- onSubmit 이벤트가 발생했을 때 액션을 디스패치해주고, 사가에서 API 요청을 처리하고, 결과를 auth/authError를 통해 조회
- 결과를 얻었을 때 특정 작업을 하기 위해 useEffect를 사용
- 사용자의 상태를 담은 user 리덕스 모듈 만들고, 회원가입 성공 후 check를 호출하여 현재 사용자가 로그인 상태가 되었는지 확인
- 회원가입 성공했다면 withRouter와 history 객체를 사용하여 홈 화면으로 라우트 이동

5. 로그인 구현

- 회원가입 구현할 때와 비슷하게 LoginForm 컴포넌트 구현

6. 회원 인증 에러 처리하기

- 요청이 실패했을 때 에러 메시지를 보여주는 UI 준비
- loginForm에서 잘못된 계정 정보를 사용하여 로그인하였을 때 에러 처리
- registerForm에서는 input 박스의 값이 하나라도 비어있을 때, password와 passwordConfirm 값이 일치하지 않을 때, username이 중복일 때 에러 처리
