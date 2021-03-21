# 7일차

## Hooks
- 함수형 컴포넌트에서도 상태 관리를 할 수 있는 useState, 렌더링 직후 작업을 설정하는 useEffect 등의 기능을 제공

### useState
- 가장 기본적인 Hook이며, 가변적인 상태를 지닐 수 있게 해줌
```jsx
const [value, setValue] = useState(0);
```
- useState 함수가 호출되면 배열을 반환
  + 첫 번째 원소는 상태 값, 두 번째 원소는 상태를 설정하는 함수
- 파라미터를 넣어서 호출하면 전달받은 파라미터로 값이 바뀌고 컴포넌트가 정상적으로 리렌더링

### useEffect
```jsx
useEffect(() => {
  console.log('렌더링이 완료되었습니다.')
  console.log({name, nickname})
})
```
- 리액트 컴포넌트가 렌더링될 때마다 특정 작업을 수행하도록 설정할 수 있는 Hook
- 클래스형 컴포넌트의 componentDidMount와 componentDidUpdate를 합친 형태로 보아도 무방
```jsx
useEffect(() => {
  console.log('마운트될 때만 실행됩니다')
}, [])
```
- 마운트될 때(맨 처음 렌더링)만 실행하려면 함수의 두 번째 파라미터로 비어있는 배열을 넣음
```jsx
useEffect(() => {
  console.log(name)
}, [name])
```
- 특정 값이 업데이트될 때만 실행하고 싶을 때는 두 번째 파라미터로 전달되는 배열 안에 검사하고 싶은 값을 넣어주면 됨

### useReducer
- 다양한 컴포넌트 상황에 따라 다양한 상태를 다른 값으로 업데이트해 주고 싶을 때 사용하는 Hook(리덕스에서 자세히 배움)
- 현재 상태, 그리고 업데이트를 위해 필요한 정보를 담은 액션 값을 전달받아 새로운 상태를 반환하는 함수
- 리듀서 함수에서 새로운 상태를 만들 때는 반드시 불변성을 지켜주어야 함
- 가장 큰 장점은 컴포넌트 업데이트 로직을 컴포넌트 바깥으로 빼낼 수 있다는 것
```jsx
function reducer(state, action){
  // action.type에 따라 다른 작업 수행
  switch(action.type){
    case 'INCREMENT':
      return {value : state.value + 1}
    case 'DECREMENT':
      return {value : state.value - 1}
    default:
      // 아무것도 해당되지 않을 때 기존 상태 반환
      return state
  }
}

const [state, dispatch] = useReducer(reeducer, {value: 0})
```
- useReducer의 첫 번째 파라미터에는 리듀서 함수를 넣고, 두 번째 파라미터에는 해당 리듀서의 기본값을 넣음
- 이 Hook을 사용하면 state 값과 dispatch 함수를 받아옴
  + state는 현재 가리키고 있는 상태고, dispatch는 액션을 발생시키는 함수
  + dispatch(action)과 같은 형태로, 함수 안에 파라미터로 액션 값을 넣어주면 리듀서 함수가 호출되는 구조

### useMemo
- useMemo를 사용하면 함수형 컴포넌트 내부에서 발생하는 연산을 최적화할 수 있음
- 렌더링하는 과정에서 특정 값이 바뀌엇을 때만 연산을 실행하고, 원하는 값이 바뀌지 않았다면 이전에 연산했던 결과를 다시 사용하는 방식

### useCallback
- useMemo와 비슷한 함수로, 주로 렌더링 성능을 최적화해야 하는 상황에서 사용
- 이 Hook을 사용하면 이벤트 핸들러 함수를 필요할 때만 생성할 수 있음
```jsx
const onChange = useCallback(e => {
  setNumber(e.target.value)
}, []) // 컴포넌트가 처음 렌더링될 때만 함수 생성
const onInsert = useCallback(() => {
  const nextList = list.concat(parseInt(number))
  setList(nextList)
  setNumber('')
}, [number, list]) // number 혹은 list가 바뀌었을 때만 함수 생성
```
- 첫 번재 파라미터에는 생성하고 싶은 함수를 넣고, 두 번째 파라미터에는 배열을 넣음
- 배열에는 어떤 값이 바뀌었을 때 함수를 새로 생성해야 하는지 명시해야 함
  + 비어있는 배열을 넣게 되면 컴포넌트가 렌더링될 때 단 한 번만 함수가 생성
  + 배열 안에 넣게 되면 인풋 내용이 바뀌거나 새로운 항목이 추가될 때마다 함수 생성
- 함수 내부에서 상태 값에 의존해야 할 때는 그 값을 반드시 두 번째 파라미터 안에 포함시켜 주어야 함

### useRef
- 함수형 컴포넌트에서 ref를 쉽게 사용할 수 있도록 해줌
- useRef를 사용하여 ref를 설정하면 useRef를 통해 만든 객체 안의 current 값이 실제 엘리먼트를 가르킴
- ref 안의 값이 바뀌어도 컴포넌트가 렌더링되지 않으므로 렌더링과 관련되지 않은 값을 관리할 때 사용

## 커스텀 Hooks 만들기
- 여러 컴포넌트에서 비슷한 기능을 공유할 겨웅, 이를 자신만의 Hook으로 작성하여 로직을 재사용할 수 있음
> /hello-react/src/useInputs.js