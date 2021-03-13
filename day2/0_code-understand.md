# 2일차

> hello-react 디렉터리에 src/App.js 코드 이해하기
```jsx
import React from 'react';
```
- 프로젝트 생성 과정에서 node_modules 디렉터리에 설치된 react 모듈을 import 구문을 통해 불러와서 사용
    + 브라우저가 아닌 환경에서 자바스크립트를 실행할 수 있게 해주는 환경인 Node.js에서 지원하는 기능
    + 브라우저에서도 이러한 기능을 사용하기 위해 번들러(bundler)를 사용
```jsx
import logo from './logo.svg';
import './App.css';
```
- 웹팩을 사용하면 SVG 파일과 CSS 파일도 불러와서 사용 가능
    - 이렇게 파일들을 불러오는 것은 웹팩의 로더(loader)라는 기능이 담당
    - 웹팩의 로더는 원래 직접 설치하고 설정해야 하지만 create-react-app이 번거로움 작업을 대신 해줬음(커스터마이징가능)
```jsx
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
```
- App이라는 함수형(function 키워드 사용) 컴포넌트를 만들어줌
    - 프로젝트에서 컴포넌트를 렌더링하면(렌더링=보여준다) 함수에서 반환하고 있는 내용을 나타냄
    - 이런 코드를 **JSX**라고 부름