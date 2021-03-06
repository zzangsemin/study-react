# 19일차

## 리덕스 미들웨어를 통한 비동기 작업 관리

- 리액트 웹 애플리케이션에서 API 서버를 연동할 때 API 요청에 대한 상태도 잘 관리해야 함
  - ex) 요청이 시작됐을 때는 로딩 중, 요청이 성공하거나 실패했을 때는 로딩이 끝났음을 명시
  - 요청이 성공하면 응답에 대한 상태를 관리, 실패하면 에러에 대한 상태를 관리
- 리액트 프로젝트에서 리덕스를 사용하며 비동기 작업을 관리해야 한다면 `미들웨어(middleware)`를 사용하여 관리

### 미들웨어

- 액션을 디스패치했을 때 리듀서에서 처리하기 전에 지정된 작업들을 실행
- 미들웨어에서 여러 종류의 작업을 처리 가능
  - 특정 조건에 따라 액션을 무시 & 특정 조건에 따라 액션 정보를 가로채서 변경 후 리듀서에게 전달 & 특정 액션에 기반하여 새로운 액션을 여러 번 디스패치
- 미들웨어 속성을 사용하여 네트워크 요청과 비동기 작업을 관리하면 유용

```
액션 -> 미들웨어 -> 리듀서 -> 스토어
```

- 실제로 미들웨어를 직접 만들 일은 그닥 없지만 어떻게 작동하는지 이해하려면 만들어 보는 것이 효과적
  - 실제 프로젝트를 작업할 때는 다른 개발자가 만들어 놓은 미들웨어 사용
  - 원하는 미들웨어를 찾을 수 없을 때 상황에 따라 직접 만들거나 기존 미들웨어를 커스터마이징하여 사용

```jsx
// const loggerMiddleware = function loggerMiddleware(store){
//   return function(next){
//     return function(action){
//     }
//   }
// }
const loggerMiddleware = (store) => (next) => (action) => {
  // 미들웨어 기본 구조
};
```

- store는 리덕스 스토어 인스턴스를, action은 디스패치된 액션을 가리킴
- next는 함수 형태이며, next(action)을 호출하면 그다음 처리할 미들웨어에게 액션을 넘겨주고,
  그다음 미들웨어가 없다면 리듀서에게 액션을 넘겨준다는 것

```jsx
const store = createStore(rootReducer, applyMiddleware(loggerMiddleware));
```

- 미들웨어는 스토어를 생성하는 과정에서 적용
