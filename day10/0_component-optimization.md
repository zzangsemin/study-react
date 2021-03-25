# 10일차

## 컴포넌트 성능 최적화

> /todo-app 프로젝트로 설명

- 많은 데이터를 렌더링 한다면 랙(lag)을 느낄 수 있음
- 리액트 컴포넌트의 렌더링은 기본적으로 빠르기에 최적화 작업에 대해 큰 스트레스타 모든 컴포넌트에 React.memo를 작성할 필요는 x
  - 단, 리스트와 관련된 컴포넌트 항목이 100개 이상이고 업데이트가 자주 발생한다면, 꼭 필요

```jsx
function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    });
  }
  return array;
}
const App = () => {
  const [todos, setTodos] = useState(createBulkTodos);
};
```

- useState 기본값의 파라미터를 함수 형태로 `useState(createBulkTodos())`라고 작성하면 리렌더링될 때마다 함수를 호출하지만, \
   `useState(createBulkTodos)`처럼 한다면 컴포넌트가 처음 렌더링될 때만 함수가 실행
- '할 일 1' 항목을 체크할 경우 '할 일 2'부터 '할 일 2500'까지는 리렌더링을 안 해도 되는 상황인데 모두 리렌더링되고 있음
- **리렌더링이 불필요할 때는 리렌더링을 방지**하여 컴포넌트 리렌더링 성능을 최적화해주는 작업이 필요

### React.memo를 사용하여 컴포넌트 성능 최적화

- 컴포넌트의 props가 바뀌지 않았다면, 리렌더링하지 않도록 함수형 컴포넌트에서는 React.memo라는 함수를 사용 \
  클래스형은 shouldComponentUpdate라는 라이프사이클을 사용
- 컴포넌트를 만들고 나서 감싸주면 됨

```jsx
// /hello-react/src/components/TodoListItem.js
export default React.memo(TodoListItem);
```

### onToggle, onRemove 함수가 바뀌지 않게 하기

- 두 개의 함수는 배열 상태를 업데이트하는 과정에서 최신 상태의 todos를 참조하기 때문에 todos 배열이 바뀔 때마다 함수가 새로 만들어짐

1. useState의 함수형 업데이트

- 함수형 업데이트 : setTodos를 사용할 때 새로운 상태를 파라미터로 넣는 대신, 상태 업데이트를 어떻게 할지 정의해주는 업데이트 함수를 넣음

```jsx
const onRemove = useCallback((id) => {
  setTodos((todos) => todos.filter((todo) => todo.id !== id));
}, []);
const onToggle = useCallback((id) => {
  setTodos((todos) =>
    todos.map((todo) =>
      todo.id === id ? { ...todo, checked: !todo.checked } : todo
    )
  );
}, []);
```

2. useReducer 사용하기

```jsx
const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);
```

- useReducer를 사용할 때는 원래 두 번째 파라미터에 초기 상태를 넣어주어야 하는데, 그 대신 두 번째 파라미터에 undefined를 넣고, 세 번째 파라미터에 함수를 넣어주면 컴포넌트가 맨 처음 렌더링될 때만 함수가 호출
- useReducer를 사용하는 방법은 기존 코드를 많이 고쳐야한다는 단점이 있지만 \
  상태를 업데이트하는 로직을 모아서 컴포넌트 바깥에 둘 수 있다는 장점이 있음

### 불변성의 중요성

- 기존 데이터를 수정할 때 직접 수정하지 않고, 새로운 배열을 만든 다음에 새로운 객체를 만들어서 필요한 부분을 교체하였기에 \
  React.memo를 사용했을 때 props가 바뀌었는지 혹인 바뀌지 않았는지를 알아내서 리렌더링 성능을 최적화함
- `불변성을 지킨다` : 기존의 값을 직접 수정하지 않으면서 새로운 값을 만들어 내는 것
- 배열 혹은 객체의 구조가 매우 복잡해진다면 불변성을 유지하면서 업데이트하는 것도 까다로울 상황일 경우 **immer**라는 라이브러리를 활용
- 리스트 관려 컴포넌트를 작성할 때는 리스트 아이템과 리스트, 두 가지 컴포넌트 최적화

### react-virtualized를 사용한 렌더링 최적화

- 리스트 컴포넌트에서 스크롤되기 전에 보이지 않는 컴포넌트는 렌더링 하지 않고, 스크롤되면 렌더링시켜줌

\* 비고 \
`npm install react-virtualized`했을 때

```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

이러한 에러가 나서 `npm install -react-virtualized --force`로 해줌
