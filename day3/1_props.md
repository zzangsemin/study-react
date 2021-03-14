# 3일차

## props
- properties를 줄인 표현으로 컴포넌트 속성을 설정할 때 사용하는 요소
- props 값은 해당 컴포넌트를 불러와 사용하는 부모 컴포넌트에서 설정할 수 있음
> ./hello-react/src 안 파일들로 실습한 코드 복붙하면서 정리함

### 1. JSX 내부에서 props 렌더링
- props 값은 컴포넌트 함수의 파라미터로 받아와서 사용할 수 있음
```jsx
// MyComponent.js
import React from 'react';
const MyComponent = props => {
    return <div>안녕하세요, 제 이름은 {props.name}입니다.</div>;
};
export default MyComponent;
```

### 2. 컴포넌트를 사용할 때 props 값 지정하기
```jsx
// App.js
import React from 'react';
import MyComponent from './MyComponent';
const App = () => {
  return <MyComponent name="React"/>;
};
export default App;
```

### 3. props 기본값 설정 : defaultProps
```jsx
// MyComponent.js
import React from 'react';
const MyComponent = props => {
    return <div>안녕하세요, 제 이름은 {props.name}입니다.</div>;
};
MyComponent.defaultProps = {
    name: '기본 이름'
};
export default MyComponent;
```

### 4. 태그 사이의 내용을 보여 주는 children
- `children` : 리액트 컴포넌트를 사용할 때 컴포넌트 태그 사이의 내용을 보여주는 props
```jsx
// App.js
import React from 'react';
import MyComponent from './MyComponent';
const App = () => {
  return <MyComponent>리액트</MyComponent>;
};
export default App;
```
```jsx
// MyComponent.js
import React from 'react';
const MyComponent = props => {
    return (
        <div>
            안녕하세요, 제 이름은 {props.name}입니다 <br/>
            children 값은 {props.children} 입니다.
        </div>
    );
};
MyComponent.defaultProps = {
    name: '기본 이름'
};
export default MyComponent;
```

### 5. 비구조화 할당 문법을 통해 props 내부 값 추출하기
- `비구조화 할당(destructuring assignment)` : 객체에서 값을 추출하는 문법으로 구조 분해 문법이라고도 부름
    + 함수의 파라미터 부분에서도 사용할 수 있음. 만약 함수의 파라미터가 객체라면 그 값을 바로 비구조화해서 사용
```jsx
// MyComponent.js
import React from 'react';
// const MyComponent = props => {
    // const {name, children} = props;
const MyComponent = ({name, children}) => {
    return (
        <div>
            안녕하세요, 제 이름은 {name}입니다 <br/>
            children 값은 {children} 입니다.
        </div>
    );
};
MyComponent.defaultProps = {
    name: '기본 이름'
};
export default MyComponent;
```

### 6. propTypes를 통한 props 검증
- 컴포넌트의 필수 props를 지정하거나 props 의 타입(type)을 지정할 때는 propTypes를 사용
- propTypes를 사용하려면 코드 상단에 import 구문을 사용하여 불러와야 함
```jsx
// MyComponent.js
import React from 'react';
import PropTypes from 'prop-types';
const MyComponent = ({name, children}) => {
    return (
        <div>
            안녕하세요, 제 이름은 {name}입니다 <br/>
            children 값은 {children} 입니다.
        </div>
    );
};
MyComponent.defaultProps = {
    name: '기본 이름'
};
MyComponent.propTypes = {
    name: PropTypes.string
};
export default MyComponent;
```
- 이렇게 설정해 주면 name 값은 무조건 문자열(string) 형태로 전달해야 된다는 것을 의미
```jsx
// MyComponent.js
(...)
MyComponent.propTypes = {
    name: PropTypes.string.isRequired
};
(...)
```
- `isRequired`를 사용하면 propTypes를 지정하지 않았을 때 경고 메시지를 띄워줌

### 7. 클래스형 컴포넌트에서 props 사용하기
- 클래스형 컴포넌트에서 props를 사용할 때는 render 함수에서 this.props를 조회하면 됨
    + 클래스형 컴포넌트에서 defaultProps와 propTypes를 설정할 때 class 내부에서 지정하는 방법도 있음
```jsx
import React, {Component} from 'react';
import PropTypes from 'prop-types';
class MyComponent extends Component{
    static defaultProps = {
        name : '기본 이름'
    };
    static propTypes = {
        name : PropTypes.string,
        favoriteNumber : PropTypes.number.isRequired
    };
    render(){
        const {name, favoriteNumber, children} = this.props; // 비구조화 할당
        return(
            <div>
                안녕하세요, 제 이름은 {name}입니다.<br />
                children 값은 {children}입니다.<br />
                제가 좋아하는 숫자는 {favoriteNumber}입니다.
            </div>
        );
    }
}
export default MyComponent;
```