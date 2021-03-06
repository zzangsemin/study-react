# 3일차

## state
- 리액트에서 `state`는 컴포넌트 내부에서 바뀔 수 있는 값을 의미

### 클래스형 컴포넌트의 state
> ./hello-react/src/Counter.js
- 클래스형 컴포넌트에서 constructor를 작성할 때는 반드시 super(props)를 호출해 주어야 함
    + 이 함수가 호출되면 현재 클래스형 컴포넌트가 상속받고 있는 클래스가 지닌 생성자 함수를 호출해줌
    + constructor 메소드를 선언하지 않고도 state 초깃값 설정 가능
- 컴포넌트의 state는 객체 형식

### 함수형 컴포넌트에서 useState 사용하기
> ./hello-react/src/Say.js
- 배열 비구조화 할당 문법을 알고 나면 useState 사용 방법을 쉽게 이해할 수 있음
    + 배열 안에 들어 있는 값을 쉽게 추출할 수 있도록 해주는 문법
```js
const array = [1, 2];
const [one, two] = array;
```
- useState 함수의 인자에는 상태의 초깃값을 넣어줌
    + 클래스형 컴포넌트에서의 state 초깃값은 객체 형태로 넣어주어야 하지만 useState에서 값의 형태는 자유
- 함수를 호출하면 배열이 반환되는데, 배열의 첫 번째 원소는 현재 상태이고, 두 번째 원소는 상태를 바꾸어 주는 함수(setter 함수)
    + 이것을 배열 비구조화 할당을 통해 이름을 자유롭게 정해줄 수 있음
- 한 컴포넌트에서 useState를 여러번 사용해도 상관X

### state를 사용할 때 주의사항
- state 값을 바꾸어야 할 때는 setState 혹은 useState를 통해 전달받은 세터 함수를 사용해야 함
- 새로운 컴포넌트를 만들 때는 useState 사용 권장
    + 코드가 더 간결해질 뿐만 아니라, 리액트 개발팀이 함수형 컴포넌트와 Hooks를 사용하는 것이 주요 컴포넌트 개발방식이 될 것이라 공지했기 때문