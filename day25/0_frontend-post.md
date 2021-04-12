# 25일차

## 프런트엔드 프로젝트: 글쓰기 기능 구현하기

1. 에디터 UI 구현하기

> /blog/blog-frontend/src/components/write/Editor.js

- 글을 작성하는 에디터는 Quill 라이브러리 사용
- 외부 라이브러리를 연동할 때는 useRefdhk useEffect를 적절하게 사용

2. 에디터 하단 컴포넌트 UI 구현하기

- 태그를 추가하는 컴포넌트와 포스트 작성을 완료하거나 취소하는 버튼을 보여주는 컴포넌트 만들기
- TagBox 컴포넌트에서 TagItem과 TagList 두 컴포넌트로 분리하여 렌더링 최적화
  - 한 컴포넌트에서 전부 직접 렌더링한다면 input 값이 바뀔 때 태그 목록도 리렌더링될 것임(태그 목록 리렌더링->태그 하나하나 모두 리렌더링)
  - React.memo를 사용하여 컴포넌트들을 감싸주어 해당 컴포넌트의 props가 바뀌었을 때만 리렌더링

3. 리덕스로 글쓰기 상태 관리하기

> /blog/blog-frontend/src/modules/write.js

- write 리덕스 모듈 만들기
- Editor, TagBox, WriteActionButtons 컴포넌트 각각에 대해 컨테이너 컴포넌트 만들기
- 글쓰기 API 연동하기
