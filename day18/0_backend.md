# 18일차

- 백엔드 프로그래밍(서버 프로그래밍) : 어떤 종류의 데이터를 몇 개씩 보여줄지, 어떻게 보여줄지 등에 관한 로직을 만드는 것
  - 언어에 구애받지 않고 PHP, 파이썬, 자바, 루비 등 여러 가지 환경으로 진행 가능
- Node.js : 자바스크립트 엔진을 기반으로 웹 브라우저뿐만 아니라 서버에서도 자바스크립트를 사용할 수 있는 런타임
- Koa : Express 개발팀이 개발함 프레임워크로, 미들웨어 기능만 갖추고 있으며 나머지는 다른 라이브러리를 적용하여 사용
  - 즉 우리가 필요한 기능들만 붙여서 서버를 만들기에 Express보다 가볍
  - async/await 문법을 정식으로 지원하기에 비동기 작업을 더 편하게 관리 가능

### 미들웨어(Koa)

- Koa 애플리케이션은 미들웨어의 배열로 구성되어 있음
- 미들웨어는 app.use를 사용하여 등록되는 순서대로 처리

```
(ctx, next) => {
}
```

- ctx는 Context의 줄임말로 웹 요청과 응답에 관한 정보를 지니고 있음
- next는 현재 처리 중인 미들웨어의 다음 미들웨어를 호출하는 함수, 미들웨어를 등록하고 next 함수를 호출하지 않으면 그다음 미들웨어 처리 X

```jsx
app.use((ctx, next) => {
  console.log(ctx.url);
  console.log(1);
  console.log(ctx.query);
  if (ctx.query.authorized !== "1") {
    ctx.status = 401; // Unauthorized
    return;
  }
  next();
});
```

- `authorized=1`이라는 쿼리 파라미터가 포함되어 있으면 이후 미들웨어 처리
  - 쿼리 파라미터는 문자열이기에 비교할 때는 꼭 문자열 형태로 비교
- 나중에는 웹 요청의 쿠키 혹은 헤더를 통해 처리

```jsx
app.use((ctx, next) => {
  (...) // 위와 겹치는 코드 생략
  next().then(() => {
    console.log('END');
  });
});
```

- 또한 next 함수를 호출하면 Promise를 반환하기에 then을 사용하여 Promise가 끝난 다음 해야할일을 작성하는 것도 가능

```jsx
app.use(async (ctx, next) => {
  (...) // 생략
  await next();
  console.log('END');
});
```

- Koa는 async/await을 정식으로 지원하기에 해당 문법으로도 사용 가능
