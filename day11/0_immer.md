# 11일차

## immer를 사용하여 더 쉽게 불변성 유지하기

- immer라는 라이브러리를 사용하여 복잡한 상태의 객체도 쉽고 짧은 코드로 불변성을 유지하면서 업데이트해 줄 수 있음
- 이 라이브러리는 편의를 위한 것이므로 꼭 필요하지는 않지만, 사용한다면 생산성을 크게 높일 수 있음

```jsx
import produce from "immer";
const nextState = produce(originalState, (draft) => {
  // 바꾸고 싶은 값 바꾸기
  draft.somewhere.deep.inside = 5;
});
```

- produce라는 함수는 첫 번째 파라미터에 수정하고 싶은 상태, 두 번째 파라미터는 상태를 어떻게 업데이트할지 정의하는 함수를 받음
  - 두 번째 파라미터로 전달되는 함수 내부에서 원하는 값을 변경하면, produce 함수가 불변성 유지를 대신해주면서 새로운 상태를 생성

### useState의 함수형 업데이트와 immer 함께 쓰기

- immer에서 제공하는 produce 함수를 호출할 때, 첫 번째 파라미터가 함수 형태라면 업데이트 함수를 반환함

```jsx
const update = produce((draft) => {
  draft.value = 2;
});
const originalState = {
  value: 1,
  foo: "bar",
};
const nextState = update(originalState);
console.log(nextState); // {value: 2, foo: 'bar'}
```
