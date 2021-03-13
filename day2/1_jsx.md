# 2일차

## JSX
- 자바스크립트의 확장 문법
- 브라우저에서 실행되기 전에 코드가 번들링되는 과정에서 바벨을 사용하여 일반 자바스크립트 형태의 코드로 변환됨
```jsx
// 1.
function App(){
    return (
        <div>
            Hello <b>react</b>
        </div>
    );
}
// 2.
function App(){
    return React.createElement("div", null, "Hello", React.createElement("b", null, "react"));
}
```
- 1번처럼 작성된 코드는 2번과 같이 변환됨
### JSX의 장점
- 보기 쉽고 익숙하다
    - HTML 코드를 작성하는 것과 비슷하므로
    - 자바스크립트로 요소들을 일일이 만들어야 한다면 매우 불편할듯
- 높은 활용도
    - div나 span 같은 HTML 태그 뿐만 아니라 앞으로 만들 컴포넌트도 JSX 안에서 작성 가능
### VSCode Extension
- `ESLint` : 코드를 작성할 때 실수를 하면 에러 혹은 경고 메시지를 에디터에서 바로 확인할 수 있게 해줌
- `Prettier` : 코드 정렬 및 세미콜론 빠진 곳에 추가 등 code formatting 도구
    + 커스터마이징 가능