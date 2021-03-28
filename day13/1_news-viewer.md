# 13일차

## axios로 API 호출해서 데이터 받아오기

- axios : 현재 가장 많이 사용되고 있는 자바스크립트 HTTP 클라이언트
  - 이 라이브러리의 특징은 HTTP 요청을 Promise 기반으로 처리한다는 점

```jsx
const onClick = () => {
  axios.get("https://jsonplaceholder.typicode.com/todos/1").then((response) => {
    setData(response.data);
  });
};
```

- 파라미터로 전달된 주소에 GET 요청을 하고 이에 대한 결과를 .then을 통해 비동기적으로 확인할 수 있음

## 데이터 연동하기

> 여기서부터 /news-viewr 프로젝트와 관련된 이야기

- useEffect를 사용하여 컴포넌트가 처음 렌더링되는 시점에 API를 요청하면 됨
- 주의할 점 : useEffect에서 반환해야 하는 값은 뒷정리 함수이기에 등록하는 함수에 async를 붙이면 안됨
  - 사용하고 싶다면, 함수 내부에 async 키워드가 붙은 또 다른 함수를 만들어서 사용해주어야 함
- loading이라는 상태도 관리하여 API 요청이 대기 중인지 판별
- map 함수를 사용하기 전에 꼭 해당 값이 현재 null인지 아닌지를 검사해야 함
  - 이 작업을 하지 않으면, 아직 데이터가 없을 때 null에는 map 함수가 없기에 렌더링 과정에서 오류가 발생

## 리액트 라우터 적용하기

```jsx
<Route path="/:category?" component={NewsPage} />
```

- path에 /:category?와 같은 형태로 맨 뒤에 물음표는 category 값이 선택적이라는 의미
  - category URL 파라미터가 없다면 전체 카테고리를 선택한 것으로 간주

```jsx
const Category = styled(NavLink)`
  (...)
  &.active {
    font-weight: 600;
    border-bottom: 2px solid #22b8cf;
    color: #22b8cf;
    &:hover {
      color: #3bc9db;
    }
  }
  (...)
`;
<Category
  key={c.name}
  activeClassName="active"
  exact={c.name === "all"}
  to={c.name === "all" ? "/" : `/${c.name}`}
>
  {c.text}
</Category>;
```

- 선택된 카테고리에 다른 스타일을 주는 기능을 NavLink로 대체
- 일반 HTML 태그가 아닌 특정 컴포넌트에 styled-components를 사용할 때는 styled(컴포넌트이름)``과 같은 형식 사용
- NavLink로 만들어진 Category 컴포넌트에 to 값은 "/카테고리이름"으로 설정
  - '전체보기'의 경우 예외적으로 "/all" 대신 "/"로 설정
- to 값이 "/"를 가리키고 있을 때 exact 값을 true로 설정
  - 이 값을 설정하지 않으면, 다른 카테고리가 선택되었을 때도 '전체보기' 링크에 active 스타일이 적용되는 오류 발생

## usePromise 커스텀 Hook 만들기

> /news-reviewr/src/lib/usePromises.js

- 프로젝트의 다양한 곳에서 사용될 수 있는 유틸 함수들은 보통 lib 디렉터리를 만든 후 작성
- 컴포넌트에서 API 호출처럼 Promise를 사용해야 하는 경우 간결하게 코드 작성할 수 있도록 커스텀 Hook usePromise 만듬
- usePromise Hookdms Promise의 대기 중, 완료 결과, 실패 결과에 대한 상태를 관리하며, usePromise의 의존 배열 deps를 파라미터로 받아옴
- usePromise를 사용하면 NewsList에서 대기 중 상태 관리와 useEffect 설정을 직접하지 않아도 돼서 코드가 간결해짐
