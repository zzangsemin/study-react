# 4일차

## 이벤트(event)
- 사용자가 웹 브라우저에서 DOM 요소들과 상호 작용하는 것
- 리액트의 이벤트 시스템은 웹 브라우저의 HTML 이벤트와 인터페이스가 동일하기 때문에 사용법이 꽤 비슷

### 이벤트를 사용할 때 주의사항
1. 이벤트 이름은 카멜 표기법으로 작성   \
ex) onclick -> onClick , onkeyup -> onKeyUp
2. **이벤트를 실행할 자바스크립트 코드를 전달하는 것이 아니라, 함수 형태의 값을 전달**
3. DOM 요소에만 이벤트를 설정할 수 있음   \
div, button, input 등의 DOM 요소에는 이벤트를 설정할 수 있지만, 컴포넌트에 지체적으로 이벤트를 설정할 수는 없음
하지만 전달받은 props를 컴포넌트 내부의 DOM 이벤트로 설정은 가능


### 리액트에서 지원하는 이벤트 종류
- `Clipboard`
- `Touch`
- `Composition`
- `UI`
- `Keyboard`
- `Wheel`
- `Focus`
- `Media`
- `Form`
- `Image`
- `Mouse`
- `Animation`
- `Selection`
- `Transition`

### 클래스형 컴포넌트 이벤트 실습
> ./hello-react/src/EventClassPractice.js
- Property Initizlizer Syntax를 사용하여 메서드 작성하기
### 함수형 컴포넌트 이벤트 실습
> ./hello-react/src/EventFunctionPractice.js
- 여러 개의 인풋 상태를 관리하기 위해 useState에서 form 객체 사용하기