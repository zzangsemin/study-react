# 2일차

## JSX 문법
### 감싸인 요소
- 컴포넌트에 여러 요소가 있다면 반드시 부모 요소 하나로 감싸야 함
```jsx
// 오류 코드
import React from 'react';
function App(){
    return (
        <h1>리액트안녕</h1>
        <h2>잘작동하니</h2>
    );
}
export default App;
// 올바른 코드
import React from 'react';
function App(){
    return (
        <div>
            <h1>리액트안녕</h1>
            <h2>잘작동하니</h2>
        </div>
    );
}
export default App;
```
### 자바스크립트 표현
- JSX는 단순히 DOM 요소를 렌더링하는 기능만 있는 것이 아니라 자바스크립트 표현식을 쓸 수 있음
- 자바스크립트 표현식을 작성하려면 JSX 내부에서 코드를 { }로 감싸면 됨
```jsx
import React from 'react';
function App(){
    const name = '리액트';
    return (
        <>
            <h1>${name} 안녕</h1>
            <h2>잘작동하니</h2>
        </>
    );
}
export default App;
```
### if문 대신 조건부 연산자
- JSX 내부의 자바스크립트 표현식에서 if문을 사용할 수 없음
- 조건에 따라 다른 내용을 렌더링해야 할 때는 JSX 밖에서 if문을 사용하여 사전에 값을 설정하거나, { } 안에 조건부 연산자(삼항 연산자)를 사용
```jsx
import React from 'react';
function App(){
    const name = '리액트';
    return (
        <div>
            {name === '리액트' ? (
                <h1>리액트입니다.</h1>
            ) : (
                <h2>리액트가 아닙니다.</h2>
            )}
        </div>
    );
}
export default App;
```
### AND 연산자(&&)를 사용한 조건부 렌더링
- 특정 조건을 만족할 때 내용을 보여주고, 만족하지 않을 때 아무것도 렌더링하지 않아야 할 상황에 조건부 연산자를 통해 구현 가능
- && 연산자로 조건부 렌더링을 할 수 있는 이유는 리액트에서 false를 렌더링할 때는 null과 마찬가지로 아무것도 나타나지 않기 때문
    + **주의 사항 falsy한 값인 0은 예외적으로 화면에 나타남!!**
```jsx
import React from 'react';
function App(){
    const name = '뤼액트';
    // 1
    return <div>{name === '리액트' ? <h1>리액트입니다.</h1> : null}</div>;
    // 2(&& 연산자 사용)
    return <div>{name === '리액트' && <h1>리액트입니다.</h1>}</div>;
}
export default App;
```
### undefined를 렌더링하지 않기
- 리액트 컴포넌트에서는 함수에서 undefined만 반환하여 렌더링하는 상황을 만들면 안됨
    + 어떤 값이 undefined일 수도 있다면, OR(||) 연산자를 사용해서 오류 방지
    + JSX 내부에서 undefined를 렌더링하는 것인 괜찮
```jsx
import React from 'react';
import './App.css';
function App(){
    const name = undefined;
    return name || '값이 undefined입니다.';
}
export default App;
```
### 인라인 스타일링
- 리액트에서 DOM 요소에 스타일을 적용할 때는 문자열 형태가 아니라 객체 형태로 넣어야 함
    +  '-' 문자가 포함되는 이름은 '-' 문자를 없애고 카멜 표기법으로 작성
```jsx
import React from 'react';
function App(){
    const name = '리액트';
    const style = {
        backgroundColor: 'black',
        fontSize: 'aqua',
        fontWeight: 'bold',
        padding: 16 // 단위를 생략하면 px로 지정
    };
}
```
### class 대신 className
- 일반 HTML에서 CSS 클래스를 사용할 때는 `<div class="myclass"></div>`와 같이 class라는 속성을 설정하지만 JSX에서는 className으로 설정해 주어야 함
```css
/* css 파일 */
.react{
    background: aqua;
    color: black;
    font-size: 48px;
    font-weight: bold;
    padding: 16px;
}
```
```jsx
import React from 'react';
import './App.css';
function App(){
    const name = '리액트';
    return <div className="react">{name}</div>;
}
export default App;
```
### 꼭 닫아야 하는 태그
- 예를 들어 input HTML 요소는 `<input></input>` 이라 입력하지 않고 `<input>`이라고만 입력해도 작동하지만 JSX에서는 태그를 닫지 않으면 오류가 발생함
    + 태그 사이에 별도의 내용이 들어가지 않는 경우 self-closing 태그(`<input />`)로도 가능 
```jsx
import React from 'react';
import './App.css';
function App(){
    <>
        <div className="react">{name}</div>
        <input></input>
    </>
}
export default App;
```
### 주석
- JSX 내부에서 주석을 작성할 때는 `{/* ... */}`와 같은 형식으로 작성