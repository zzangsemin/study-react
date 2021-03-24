# 9일차

## 일정 관리 웹 애플리케이션 만들기

> /todo-app 폴더에서 작성한 내용 정리

- 컴포넌트 구성

  - TodoTemplate : 화면을 가운데에 정렬시켜 주며, 앱 타이틀을 보여줌 \
    children으로 내부 JSX를 props로 받아와서 렌더링
  - TodoInsert : 새로운 항목을 입력하고 추가할 수 있는 컴포넌트 \
    state를 통해 인풋의 상태를 관리
  - TodoListItem : 각 할 일 항목에 대한 정보를 보여주는 컴포넌트 \
    todo 객체를 props로 받아와서 상태에 따라 다른 스타일의 UI를 보여줌
  - TodoList : todos 배열을 props로 받아온 후, 이를 배열 내장 함수 map을 사용해서 여러 개의 TodoListItem 컴포넌트로 변환하여 보여줌

- `react-icons` : 리액트에서 다양한 [아이콘](https://react-icons.github.io/react-icons/icons?name=md)을 사용할 수 있는 라이브러리(npm install 해주어야 함)
  - `import {아이콘 이름} from 'react-icons/md'`
