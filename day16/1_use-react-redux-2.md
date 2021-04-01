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

## 리덕스 더 편하게 사용하기

1. redux-actions

- redux-actions 라이브러리를 사용하면 액션 생성 함수를 더 짧은 코드로 작성 가능
- createAction 함수를 사용하면 매번 객체를 직접 만들어 줄 필요없이 간단하게 액션 생성 함수를 선언할 수 있음
  - 액션에 필요한 추가 데이터는 payload라는 이름을 사용
  - 액션 생성 함수에서 받아온 파라미터를 변형을 주어서 넣고싶다면, 두 번째 함수에 payload를 정의하는 함수를 따로 선언해서 넣어주면 됨

```jsx
const MY_ACTION = "sample/MY_ACTION";
const myAction = createAction(MY_ACTION, (text) => `${text}!`);
const action = myAction("hello world");
// 결과 : {type: MY_ACTION, payload: 'hello world!'}
```

- handleActions 함수로 리듀서 함수를 간단하고 가독성 높게 작성할 수 있음
  - 첫 번째 파라미터에 각 액션에 대한 업데이트 함수를 넣고, 두 번째 파라미터에 초기 상태를 넣어줌
  - 액션에 필요한 추가 데이터(payload)를 사용했을 경우 action.payload 값을 조회하도록 리듀서 구현

2. immer

- 리듀서에서 상태를 업데이트할 때는 불변성을 지켜야 하기 때문에 spread 연산자와 배열의 내장함수를 활용하였으나 \
  객체의 구조가 복잡해지거나 객체로 이루어진 배열을 다룰 경우, immer를 사용하여 편리하게 상태 관리

## Hooks를 사용하여 컨테이너 컴포넌트 만들기

- 리덕스 스토어와 연동된 컨테이너 컴포넌트를 만들 때 connect 함수를 사용하는 대신 react-redux에서 제공하는 Hooks를 사용할 수도 있음

1. useSelector로 상태 조회하기

- connect 함수를 사용하지 않고도 리덕스 상태를 조회할 수 있음
- `const 결과 = useSelector(상태 선택 함수);`
  - 여기서 상태 선택 함수는 mapStateToPropsdhk gudxork Ehrrkx

2. useDispatch를 사용하여 액션 디스패치하기

- 컴포넌트 내부에서 스토어의 내장 함수 dispatch를 사용할 수 있게 해줌
- useCallback과 함께 사용하는 습관을 들여 컴포넌트 성능 최적화

3. useStore를 사용하여 리덕스 스토어 사용하기

- 컴포넌트 내부에서 리덕스 스토어 객체를 직접 사용할 수 있음
- 정말 어쩌다가 스토어에 직접 접근해야 하는 상황에만 사용(상황이 흔치않음)

4. TodosContainer를 Hooks로 전환하기

- todosContainer를 connect 함수 대신 useSelector와 useDispatch Hooks를 사용하는 형태로 전환

5. useActions 유틸 Hook을 만들어서 사용하기

- useActions Hook은 액션 생성 함수를 액션을 디스패치하는 함수로 변환해줌
- 첫 번째 파라미터는 액션 생성 함수로 이루어진 배열, 두 번째 파라미터는 deps 배열이며, 이 배열안에 들어 있는 원소가 바뀌면 액션을 디스패치하는 함수를 새로 만들게 됨

**connect 함수와의 주요 차이점**

- 컨테이너 컴포넌트를 만들 때 connect 함수나, 리덕스 관련 Hook(useSelector, useDispatch) 편한 것을 사용해도 됨
- connect 함수를 사용할 경우, 해당 컨테이너 컴포넌트의 부모 컴포넌트가 리렌더링될 때 porps가 바뀌지 않았다면 리렌더링이 자동으로 방지되어 성능 최적화
- useSelector를 사용하여 리덕스 상태를 조회했을 때 최적화 작업이 이루어지지 않으므로, React.memo를 컨테이너 컴포넌트에 사용해주어야 함

## 정리

- 리액트 프로젝트에서 리덕스를 사용하면 업데이트에 관련된 로직을 리액트 컴포넌트에서 완벽하게 분리시킬 수 있음
- 작은 프로젝트에서 리덕스를 적용하면 프로젝트에 복잡도가 높아지지만 규모가 큰 프로젝트에 적용한다면 상태를 더 체계적으로 관리할 수 있음
