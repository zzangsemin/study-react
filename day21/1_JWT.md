# 21일차

## JWT를 통한 회원 인증 시스템 구현하기

### 토큰 발급 및 검증하기

- JWT 토큰을 만들기 위해서 jsonwebtoken이라는 모듈 설치

1. 비밀키 설정하기

- JWT 토큰을 만들 때 사용할 비밀키를 만듬

```
$ openssl rand -hex 64
```

- 해당 랜덤 문자열을 .env 파일에 `JWT_SECRET` 값으로 설정
- 비밀키가 외부에 공개되면 누구든 JWT 토큰을 발급할 수 있기에 공개되면 안됨

2. 토큰 발급하기

```jsx
import jwt from "jsonwebtoken";
UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
    // 첫 번째 파라미터에는 토큰 안에 집어넣고 싶은 데이터를 넣습니다
    {
      _id: this.id,
      username: this.username,
    },
    process.env.JWT_SECRET, // 두 번째 파라미터에는 JWT 암호를 넣습니다
    {
      expiresIn: "7d", // 7일동안 유효함
    }
  );
  return token;
};
```

- 브라우저의 localStorage 혹은 sessionStorage에 담으면 편리하고 구현도 쉽지만 XSS 공격을 받을 수 있음
- 브라우저의 쿠키에 담으면 같은 문제가 발생할 수 있지만 httpOnly 속성을 활성화하면 악성 스크립트로부터 안전 \
  대신 CSRF 공격에 취약해지지만 CSRF 토큰 사용 및 Referer 검증 등의 방식으로 막을 수 있음

```jsx
(...)
const token = user.generateToken();
ctx.cookies.set("access_token", token, {
  maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
  httpOnly: true,
});
(...)
```

3. 토큰 검증하기

> /blog/blog-backend/src/lib/jwtMiddleware.js

- 해당 미들웨어를 적용하는 작업은 app에 router 미들웨어를 적용하기 전에 이루어져야 함
- `iat` : 토큰이 언제 만들어졌는지 알려주는 값
- `exp` : 언제 만료되는지 알려주는 값

4. 토큰 재발급하기

- 토큰의 남은 유효기간이 3.5일 미만이면 재발급

5. 로그아웃 기능 구현하기

- 쿠키를 지워주기만 하면 됨

```jsx
export const logout = async (ctx) => {
  ctx.cookies.set("access_token");
  ctx.status = 204; // No content
};
```
