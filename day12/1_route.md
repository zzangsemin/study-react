# 12일차

## 서브 라우트

- 서브 라우트 : 라우트 내부에 또 라우트를 정의하는 것
- 라우트로 사용되고 있는 컴포넌트의 내부에 Route 컴포넌트를 또 사용하면 됨

```jsx
<Route
  path="/prpfiles"
  exact
  render={() => <div>사용자를 선택해주세요.</div>}
/>
```

- Route 컴포넌트에 render라는 props를 넣어 보여주고 싶은 JSX를 넣어줄 수도 있음
  - 따로 컴포넌트를 만들기 애매한 상황에 사용해도 되고, 컴포넌트에 props를 별도로 넣어주고 싶을 때도 사용
- JSX에서 props를 설정할 때 값을 생략하면 자동으로 true로 설정
  - ex) `exact={true}`와 `exact`는 같은 의미

## 리액트 라우터 부가 기능

### history

- history 객체는 라우트로 사용된 컴포넌트에 match, location과 함께 전달되는 props
- 컴포넌트 내에 구현하는 메서드에서 라우터 API를 호출할 수 있음
- 특정 버튼을 눌렀을 때 뒤로 가거나, 로그인 후 화면을 전환하거나, 다른 페이지로 이탈하는 것을 방지해야 할 때 활용

> /router-tutorial/src/HistorySample.js

### withRouter

- withRouter 함수는 HoC(Higher-order Component)임
- 라우트로 사용된 컴포넌트가 아니어도 match, location, history 객체를 접근할 수 있게 해줌
- withRouter를 사용할 때는 컴포넌트를 내보내 줄 때 함수로 감싸줌
- match 객체의 경우 현재 자신을 보여주고 있는 라우트 컴포넌트를 기준으로 전달되기에 파라미터를 읽어오지 못함

> /router-tutorial/src/WithRouterSample.js

### Switch

- Switch 컴포넌트는 여러 Route를 감싸서 그중 일치하는 단 하나의 라우트만을 렌더링 시켜줌
- 모든 규칙과 일치하지 않을 때 보여줄 Not Found 페이지도 구현할 수 있음

### NavLink

- Link와 비슷한 컴포넌트로, 현재 경로와 Link에서 사용하는 경로가 일치하는 경우 특정 스타일 혹은 CSS 클래스를 적용할 수 있음
  - 스타일을 적용할 때는 activeStyle 값을, CSS 클래스는 activeClassName 값을 props로 넣어줌
