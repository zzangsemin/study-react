# 18일차

## Koa-router 사용하기

- Koa를 사용할 때 다른 주소로 요청이 들어올 경우 다른 작업을 처리할 수 있도록 Koa-router 모듈을 설치해 사용

```jsx
const Koa = require("koa");
const Router = require("koa-router");
const app = new Koa();
const router = new Router();
// 라우터 설정
router.get("/", (ctx) => {
  ctx.body = "홈";
});
router.get("/about", (ctx) => {
  ctx.body = "소개";
});
// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());
app.listen(4000, () => {
  console.log("Listening to port 4000");
});
```

- 라우트를 설정할 때, 첫 번째 파라미터에는 라우트의 경로, 두 번째 파라미터에는 해당 라우트에 적용할 미들웨어 함수
  - 여기서 get 키워드는 해당 라우트에서 사용할 HTTP 메서드를 의미

### 라우트 파라미터와 쿼리

```jsx
(...)
router.get('/about/:name?', (ctx) => {
  const { name } = ctx.params;
  // name의 존재 유무에 따라 다른 결과 출력
  ctx.body = name ? `${name}의 소개` : '소개';
});
router.get('/posts', (ctx) => {
  const { id } = ctx.query;
  // id의 존재 유무에 따라 다른 결과 출력
  ctx.body = id ? `포스트 #${id}` : '포스트 아이디가 없습니다.';
});
(...)
```

- 파라미터는 함수의 ctx.params 객체에서 조회
- 쿼리는 ctx.query에서 조회
  - 쿼리 문자열을 자동으로 객체 형태로 파싱해줌

### REST API

- 웹 브라우저에서 데이터베이스에 직접 접속하여 데이터를 변경한다면 보안상 문제가 되므로 REST API를 만들어서 사용
- REST API는 요청 종류에 다라 다른 HTTP 메서드를 사용
- REST API를 설계할 때는 API 주소와 메서드에 따라 어떤 역할을 하는지 파악할 수 있도록 작성해야 함

```
메서드  설명
GET 데이터를 조회할 때 사용
POST  데이터를 등록할 때 사용, 인증작업을 거칠 때 사용하기도 함
DELETE  데이터를 지울 때 사용
PUT 데이터를 새 정보로 통째로 교체할 때 사용
PATCH 데이터의 특정 필드를 수정할 때 사용
```

### 라우트 모듈화

- 여러 종류의 라우트를 하나에 파일에 모두 작성하면 유지보수가 힘듬 따라서 라우터를 여러 파일에 분리시켜서 작성
- `컨트롤러` : 라우트 처리 함수만 모아 놓은 파일
- koa-bodyparser 미들웨어 : POST/PUT/PATCH 같은 메서드의 Request Body에 JSON 형식으로 데이터를 넣어주면, 이를 파싱하여 서버에서 사용할 수 있게 함
