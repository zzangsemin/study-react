# 14일차

## Context API

- 리액트 프로젝트에서 전역적으로 사용할 데이터가 있을 때 유용한 기능
  - 전역적으로 여기저기서 사용되는 상태가 있고 컴포넌트의 개수가 많은 상황이라면 Context API 사용을 권함
  - ex) 사용자 로그인 정보, 애플리케이션 환경 설정, 테마 등
- 리덕스, 리액트 라우터, styled-components 등의 라이브러리는 Context API를 기반으로 구현되어 있음

### Context API를 사용한 전역 상태 관리 흐름 이해하기

- 많은 컴포넌트를 거쳐 다루어야 할 데이터가 많을 경우 유지 보수성이 낮아짐
- 기존에는 최상위 컴포넌트에서 여러 컴포넌트를 거쳐 props로 원하는 상태와 함수를 전달했지만, \
  Context API를 사용하면 Context를 만들어 한 번에 원하는 값을 받아와서 사용할 수 있음

### Context API 사용법 익히기

새 Context 만들기

```jsx
import { createContext } from "react";
const ColorContext = createContext({ color: "black" });
```

- createContext 함수 사용
- 파라미터에는 해당 Context의 기본 상태를 지정

Consumer 사용하기

```jsx
<ColorContext.Consumer>
  {(value) => (
    <div
      style={{
        width: "64px",
        height: "64px",
        background: value.color,
      }}
    />
  )}
</ColorContext.Consumer>
```

- ColorContext 안에 들어 있는 Consumer라는 컴포넌트를 통해 색상을 조회
- Consumer 사이에 중괄호를 열어서 함수를 넣어주는 패턴을 `Function as a child`, `Render Props`라고 함
  - 컴포넌트의 children이 있어야 할 자리에 일반 JSX 혹은 문자열이 아닌 함수를 전달

Provider

```jsx
<ColorContext.Provider value={{ color: "red" }}>
  <div>
    <ColorBox />
  </div>
</ColorContext.Provider>
```

- Provider를 사용하면 Context의 value를 변경할 수 있음
- createContext 함수를 사용할 때 파라미터로 넣은 기본값은 Provider를 사용하지 않았을 때만 사용됨
  - 만약 Provider는 사용했는데 value를 명시하지 않았다면, 이 기본값을 사용하지 않기때문에 오류가 발생
