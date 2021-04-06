# 3일차

## 클래스형 컴포넌트
- state 기능 및 라이프사이클 기능 사용할 수 있음
- 메서드 정의할 수 있음
- render 함수가 꼭 있어야 하고, 그 안에서 보여 주어야 할 JSX를 반환해야 함
```jsx
import React, { Component } from 'react';
class App extends Component {
  render(){
    const name = 'react';
    return <div className="react">{name}</div>;
  }
}
export default App;
```

### 함수형 컴포넌트와의 차이
- 함수형 컴포넌트가 클래스형 컴포넌트보다 선언하기 훨씬 편하고, 메모리 자원도 덜 사용함
- 함수형 컴포넌트의 주요 단점인 state와 라이프사이클 API의 사용이 불가능하다는 점은 Hooks라는 기능이 도입되면서 해결됨