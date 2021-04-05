# 19일차

## 비동기 작업을 처리하는 미들웨어 사용

### redux-thunk

- 리덕스를 사용하는 프로젝트에서 비동기 작업을 처리할 때 기본적으로 사용하는 미들웨어
- 객체가 아닌 함수 형태의 액션을 디스패치할 수 있게 해줌
- `Thunk` : 특정 작업을 나중에 할 수 있도록 미루기 위해 함수 형태로 감싼 것을 의미

```jsx
const sampleThunk = () => (dispatch, getState) => {
  // 현재 상태를 참조할 수 있고,
  // 새 액션을 디스패치할 수도 있음
};
```

- thunk 함수를 만들어 디스패치하면 리덕스 미들웨어가 함수를 전달받아 store의 dispatch와 getState를 파라미터로 넣어서 호출해줌

```jsx
import ReduxThunk from "redux-thunk";
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
```

- 스토어를 만들 때 redux-thunk 적용
