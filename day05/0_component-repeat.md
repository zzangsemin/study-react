# 5일차

## 컴포넌트 반복
- 데이터 배열을 컴포넌트 배열로 변환하기
  + 리액트에서 `key`는 컴포넌트 배열을 렌더링했을 때 어떤 원소에 변동이 있었는지 알아내려고 사용함
  + `key` 값을 설정할 때는 map 함수의 인자로 전달되는 함ㅁ수 내부에서 컴포넌트 props를 설정하듯이 설정
  + `key` 값은 언제나 유일해야 하기에 데이터가 가진 고윳값을 `key` 값으로 설정
```jsx
const IterationSample = () => {
  const names = ['눈사람', '얼음', '눈', '바람'];
  const nameList = names.map((name, index) => <li key={index}>{name}</li>)
  return <ul>{nameList}</ul>
}
```

> /hello-react/src/IterationSample.js
- 상태 안에서 배열을 변형할 때는 배열에 직접 접근하여 수정하는 것이 아니라 concat, filter 등의 배열 내장 함수를 사용하여 새로운 배열을 만든 후 이를 새로운 상태로 설정해주어야 한다는 점을 명심
