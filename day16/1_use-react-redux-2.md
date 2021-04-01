# 16일차

## 컨테이너 컴포넌트 만들기

- 컨테이너 컴포넌트 : 리덕스 스토어와 연동된 컴포넌트

> /react-redux-tutorial/src/containers 참고

- 컴포넌트를 리덕스와 연동하려면 react-redux에서 제공하는 connect 함수를 사용

```jsx
connect(mapStateToProps, mapDispatchToProps)(연동할 컴포넌트)
```

- `mapStateToProps` : 리덕스 스토어 안의 상태를 컴포넌트의 props로 넘겨주기 위해 설정하는 함수
- `mapDispatchToProps` : 액션 생성 함수를 컴포넌트의 props로 넘겨주기 위해 사용하는 함수
- 이렇게 connect 함수를 호출하고 나면 또 다른 함수를 반환
  - 반환된 함수에 컴포넌트를 파라미터로 넣어주면 리덕스와 연동된 컴포넌트가 만들어짐

```jsx
const makeContainer = connect(mapStateToProps, mapDispatchToProps)
makeContainer(타깃 컴포넌트)
```

- connect 함수 내부에 익명함수 형태로 선언해도 문제없음
- `mapDispatchToProps`에 해당하는 파라미터를 함수 형태가 아닌 액션 생성 함수로 이루어진 객체 형태로 넣어주는 것
  > /react-redux-tutorial/src/containers/CounterContainer.js 참고
