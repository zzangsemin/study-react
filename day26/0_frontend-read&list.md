# 26일차

## 프런트엔드 프로젝트: 포스트 조회 기능 구현하기

- 포스트 읽기 페이지 구현하기

1. PostViewer UI 준비하기

> /blog/blog-frontend/src/components/post/PostViewer.js

- `dangerouslySetInnerHTML`이라는 props를 설정하여 HTML 태그가 적용되게 출력

2. API 연동하기

- post라는 리덕스 모듈 만들기
  - 페이지를 벗어날 때 리덕스 상태의 데이터를 비우는 작업(비우지 않으면 특정 포스트 읽은 후 또 다른 포스트를 읽을 때 이전 데이터가 나타나는 깜박임 현상)
- PostViewer를 위한 컨테이너 컴포넌트를 만들어 URL 파라미터로 받아 온 id 값 조회

- 포스트 목록 페이지 구현하기

1. PostList UI 준비하기

> /blog/blog-frontend/src/components/post/PostList.js

2. 포스트 목록 조회 API 연동하기

- list API는 username, page, tag 값을 쿼리 값으로 넣어서 사용
- qs 라이브러리를 사용해 쿼리 값을 편리하게 생성하고 JSON으로 변환
- 요청의 상태를 관리하는 posts 리덕스 모듈 만들기
- PostListContainer 컴포넌트 만들어 listPosts API 호출

3. HTML 필터링하기

- 해당 작업은 서버쪽에서 해야함(백엔드 프로젝트)
- sanitize-html 라이브러리를 사용하여 HTML 필터링
  - HTML을 작성하고 보여주어야 하는 서비스에 유용
  - 특정 HTML만 허용하는 기능도 있기때문에 글쓰기 API에서 사용하면 악성 스크립트 삽입을 막을 수 있음

4. 페이지네이션 구현하기

- createRequestSaga에서 meta 값을 response로 넣어주어 HTTP 헤더 및 상태 코드를 쉽게 조회할 수 있게 해줌
- Pagination 컴포넌트와 해당 컴포넌트를 위한 컨테이너 컴포넌트 만들기
