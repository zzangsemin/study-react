# 20일차

## mongoose를 이용한 MongoDB

### 요청 검증

1. ObjectId 검증

- id 값이 올바른 ObjectId인지 확인하여 클라이언트가 잘못 전달했다면 400 Bad Request 오류를 띄워주어야 함

```jsx
import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;
export const checkObjectId = (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; // Bad Request
    return;
  }
  return next();
};
```

- 미들웨어를 만들어서 ObjectId 검증이 필요한 부분에 미들웨어를 추가

```jsx
const posts = new Router();
posts.get("/", postCtrl.list);
posts.post("/", postCtrl.write);
const post = new Router(); // /api/posts/:id
post.get("/", postCtrl.read);
post.delete("/", postCtrl.remove);
post.patch("/", postCtrl.update);

posts.use("/:id", postCtrl.checkObjectId, post.routes());
```

- `/api/posts/:id` 경로를 위한 새로운 라우터 생성하고, posts에 해당 라우터 등록

2. Request Body 검증

- 클라이언트에게 전달받은 요청 내용을 검증하는 방법, 값을 빼먹었을 때는 400 오류가 발생해야 함
- 객체를 검증하기 위해 각 값을 if문으로 비교하는 방법도 있지만, Joi 라이브러리 이용하겠음

```jsx
const schema = Joi.object().keys({
  // 객체가 다음 필드를 가지고 있음을 검증
  title: Joi.string().required(), // required()가 있으면 필수항목
  body: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required(), // 문자열로 이루어진 배열
});
// 검증하고 나서 검증 실패인 경우 에러 처리
const result = schema.validate(ctx.request.body);
if (result.error) {
  ctx.status = 400; // Bad Request
  ctx.body = result.error;
  return;
}
```

### 페이지네이션 구현

- 페이지네이션 기능 : 포스트 목록을 볼 때 한 페이지에 보이는 페이지의 개수는 10~20개(현재는 모든 포스트를 불러옴) \
  또한 목록을 볼 때는 전체 내용을 보여줄 필요는 없고, 처음 200자 정도가 적당 불필요하게 모든 내용을 보여주면 로딩 속도 지연&트래픽 낭비

```jsx
export const list = async (ctx) => {
  // query는 문자열이기 때문에 숫자로 변환해주어야 함
  // 값이 주어지지 않았다면 1을 기본으로 사용
  const page = parseInt(ctx.query.page || "1", 10); // url?page=2

  if (page < 1) {
    ctx.status = 400;
    return;
  }

  try {
    const posts = await Post.find()
      .sort({ _id: -1 }) // 포스트 역순으로 불러오기
      .limit(10) // 개수 제한(10개)
      .skip((page - 1) * 10)
      .lean() // 데이터를 조회할 때 lean() 함수를 사용해 JSON 형태로 조회
      .exec();
    const postCount = await Post.countDocuments().exec();
    // Last-Page라는 커스텀 HTTP 헤더를 설정
    ctx.set("Last-Page", Math.ceil(postCount / 10)); // 마지막 페이지 번호 알려주기
    ctx.body = posts // 내용 길이 제한
      // .map((post) => post.toJSON())
      .map((post) => ({
        ...post,
        body:
          post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...`,
      }));
  } catch (e) {
    ctx.throw(500, e);
  }
};
```

- sort({key: 1}) 함수 : key는 정렬할 필드를 설정 \
  오른쪽 값을 1로 설정하면 오름차순, -1로 설정하면 내림차순
- limit() 함수 : 파라미터에 제한할 숫자를 넣어 보이는 개수 제한
- skip() 함수 : 만약 2페이지를 불러온다면 앞에 10개 데이터를 제외한 데이터를 불러와야 하기에 (page-1) \* 10으로 넣어줌
- lean() 함수 : 데이터를 JSON 형태로 조회 \
  find()를 통해 조회한 데이터는 mongoose 문서 인스턴스의 형태임
