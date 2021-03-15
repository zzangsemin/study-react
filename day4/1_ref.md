# 4일차

## ref: DOM
- ref(reference) : 리액트 프로젝트 내부에서 DOM에 이름을 다는 방법
- DOM을 꼭 직접적으로 건드려야 할 때 `ref` 사용(먼저 ref를 사용하지 않고도 기능을 구현할 수 있는지 반드시 고려 후 활용)
  + 특정 input에 포커스 주기
  + 스크롤 박스 조작하기
  + Canvas 요소에 그림 그리기 등
- 함수형 컴포넌트에서는 useRef라는 Hook 함수를 사용
- 서로 다른 컴포넌트끼리 데이터를 교류할 때 ref를 사용한다면 잘못 사용된 것(어긋난 설계이고, 앱 규모가 커지면 유지 보수 불가능)
> ./hello-react/src/ValidationSample.js

### 콜백 함수를 통한 ref 설정
- ref를 달고자 하는 요소에 ref라는 콜백 함수를 props로 전달
  + 이 콜백함수는 ref값을 파라미터로 전달받음
  + 함수내부에서 파라미터로 받은 ref를 컴포넌트의 멤버 변수로 설정
```jsx
<input ref={(ref) => {this.input=ref}} />
```
- 이렇게 하면 앞으로 this.input은 input 요소의 DOM을 가르킴

### createRef를 통한 ref 설정
- craeteRef를 사용하여 ref를 만들려면 우선 컴포넌트 내부에서 멤버 변수로 React.createRef()를 담아 주어야 함
- 그리고 해당 멤버 변수를 ref를 달고자 하는 요소에 ref props로 넣어주면 ref 설정 완료
```jsx
import React, {Component} from 'react';
class RefSample extends Component{
  input = React.createRef();
  handleFocus = () => {
    this.input.current.focus();
  }
  render(){
    return(
      <div>
        <input ref={this.input} />
      </div>
    );
  }
}
```
- 나중에 ref를 설정해준 DOM에 접근하려면 this.input.current를 조회
  + 콜백함수를 사용할 때와 다른 점이 .current를 넣어 주어야 한다는 것

## 컴포넌트에 ref 달기
- 이 방법은 주로 컴포넌트 내부에 있는 DOM을 컴포넌트 외부에서 사용할 때 사용
```jsx
<MyComponent
  ref={(ref) => {this.myComponent=ref}}
/>
```
- 이렇게 하면 MyComponent 내부의 메서드 및 멤버변수에도 접근 가능
> ./hello-react/src/ScrollBox.js