# 15일차

## 리덕스

- 가장 많이 사용하는 리액트 상태 관리 라이브러리
- 리덕스를 사용하면 컴포넌트의 상태 업데이트 관련 로직을 다른 파일로 분리시켜서 효율적으로 관리 가능
- 컴포넌트끼리 똑같은 상태를 공유해야 할 때도 여러 컴포넌트를 거치지 않고 상태 값을 전달 or 업데이트 가능
- 편리한 개발자 도구를 지원하며, 미들웨어라는 기능을 제공하여 비동기 작업을 효율적으로 관리할 수 있게 도와줌

**액션**

- 상태에 어떠한 변화가 필요하면 액션(action)이란 것이 발생하는데 하나의 객체로 표현됨
- 액션 객체는 type 필드를 반드시 가지고 있어야 함

```jsx
{
  type: 'ADD_TODO',
  data: {
    id: 1,
    text: '리덕스 배우기'
  }
}
```

**액션 생성 함수**

- 액션 객체를 만들어 주는 함수
- 어떤 변화를 일으켜야 할 때마다 액션 객체를 만들어야 하는데 매번 하기 번거롭고, 실수로 정보를 놓치는 일을 방지하기 위해 함수로 만들어서 관리

```jsx
function addTodo(data) {
  return {
    type: "ADD_TODO",
    data,
  };
}
```

**리듀서**

- 변화를 일으키는 함수
- 액션을 만들어서 발생시키면 리듀서가 현재 상태와 전달받은 액션 객체를 파라미터로 받아옴
  - 두 값을 참고하여 새로운 상태를 만들어서 반환

```jsx
const initialState = {
  counter: 1,
};
function reducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return {
        counter: state.counter + 1,
      };
    default:
      return state;
  }
}
```

**스토어**

- 프로젝트에 리덕스를 적용하기 위해 스토어를 만듬(한개의 프로젝트는 단 하나의 스토어만 가질 수 있음)
- 스토어 안에는 현재 애플리케이션 상태와 리듀서가 들어가 있으며, 외에도 몇 가지 중요한 내장 함수를 지님
- 디스패치 : 스토어의 내장 함수 중 하나로 '액션을 발생시키는 것'이라고 이해
  - dispatch(action)과 같은 형태로 액션 객체를 파라미터로 넣어서 호출
  - 이 함수가 호출되면 스토어는 리듀서 함수를 실행시켜서 새로운 상태를 만들어줌
- 구독 : 스토어의 내장 함수 중 하나
  - subscribe 함수 안에 리스너 함수를 파라미터로 넣어서 호출해주면, 이 리스너 함수가 액션이 디스패치되어 상태가 업데이트될 때마다 호출됨

```jsx
const listener = () => {
  console.log("상태가 업데이트됨");
};
const unsubscribe = store.subscribe(listener);
unsubscribe(); // 추후 구독을 비활성화할 때 함수를 호출
```

## 리덕스의 세 가지 규칙

1. 단일 스토어

- 하나의 애플리케이션 안에는 하나의 스토어가 들어있음
- 여러 개의 스토어를 사용하는 것이 불가능은 아니지만 상태 관리가 복잡해질 수 있으므로 권장x

2. 읽기 전용 상태

- 리덕스 상태는 읽기 전용임
- 리덕스도 상태를 업데이트할 때 기존의 객체는 건드리지 않고 새로운 객체를 생성해 주어야 함
  - 불변성을 유지해야 하는 이유 : 내부적으로 데이터가 변경되는 것을 감지하기 위해 얕은 비교 검사를 하기 때문

3. 리듀서는 순수한 함수

- 변화를 일으키는 리듀서 함수는 순수한 함수여야 함
- 순수한 함수가 만족해야 하는 조건

```
- 리듀서 함수는 이전 상태와 액션 객체를 파라미터로 받습니다.
- 파라미터 외의 값에는 의존하면 안 됩니다.
- 이전 상태는 절대로 건드리지 않고, 변화를 준 새로운 상태 객체를 만들어서 반환합니다.
- 똑같은 파라미터로 호출된 리듀서 함수는 언제나 똑같은 결과 값을 반환해야 합니다.
```

## 리액트 없이 쓰는 리덕스

> ./vanilla-redux 폴더 확인(index.js 주요 파일)

- 리덕스는 리액트에 종속되는 라이브러리가 아니라 다른 UI 라이브러리, 프레임워크와 함께 사용 가능
  - ex) angular-redux, ember redux
- 바닐라 자바스크립트와도 함께 사용 가능 \
  \* 바닐라 자바스크립트 : 라이브러리나 프레임워크 없이 사용하는 순수 자바스크립트 그 자체