# 24일차

## 프런트엔드 프로젝트: 시작 및 회원 인증 구현

### 헤더 컴포넌트 생성 및 로그인 유지

1. 헤더 컴포넌트 만들기

- 반응형 디자인을 위한 Responsive 컴포넌트를 이용해 Header 컴포넌트 만들기
  - 헤더는 언제나 페이지 상단에 떠 있도록 position 값을 fixed
- 버튼을 누르면 페이지를 이동 시키기 위해 Button 컴포넌트에서 props.to 값에 따라 Link 컴포넌트 사용하여 주소 연결

2. 로그인 상태를 보여주고 유지하기

2-1. 로그인 상태 보여주기

> /blog/blog-frontend/src/containers/common/HeaderContainer.js

- 헤더 컴포넌트에 리덕스 연결
- 헤더 컴포넌트에서 user 값이 주어질 경우 계정명과 로그아웃 버튼 노출

2-2. 로그인 상태 유지하기

- 회원가입 및 로그인을 하면 사용자 정보를 localStorage에 저장하도록 함
- `/src/index.js`에서 사용자 정보를 불러오도록 처리
  - App 컴포넌트에서 componentDidMount나 useEffect를 사용하면 해당 메서드는 컴포넌트가 한 번 렌더링된 이후 실행되기 때문에 깜박임현상이 나타날 수도 있음

2-3. 로그인 검증 실패시 정보 초기화

> /blog/blog-frontend/src/modules/user.js

- `CHECK_FAILURE` 액션이 발생할 때 localStorage에 user 값 초기화

3. 로그아웃 기능 구현

- 로그아웃 API를 호출하고, localStorage 안의 값을 제거
- `/blog/blog-frontend/src/lib/api/auth.js` logout 함수를 만들어 API 연결
- `LOGOUT` 액션을 만들고, 이 액션이 디스패치되었을 때 API 호출 후 localStorage 값 제거 + 리듀서에서는 스토어의 user 값 null로 설정
  > /blog/blog-frontend/src/modules/user.js
