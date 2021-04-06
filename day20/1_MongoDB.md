# 20일차

## mongoose를 이용한 MongoDB

### 데이터베이스의 스키마와 모델

- 스키마(schema) : 컬렉션에 들어가는 문서 내부의 각 필드가 어떤 형식으로 되어 있는지 정의하는 객체
- 모델(model) : 스키마를 사용하여 만드는 인스턴스로, 데이터베이스에서 실제 작업을 처리할 수 있는 함수들을 지니고 있는 객체

```jsx
import mongoose from "mongoose";
const { Schema } = mongoose;
const AuthorSchema = new Schema({
  name: String,
  email: String,
});
const BookSchema = new Schema({
  title: String,
  description: String,
  authors: [AuthorSchema],
  meta: {
    likes: Number,
  },
  extra: Schema.Types.Mixed,
});
```

- [AuthorSchema]는 Author 스키마로 이루어진 여러 개의 객체가 들어있는 배열을 의미
  - 스키마 내부에 다른 스키마를 내장시킬 수 있다는 뜻

```jsx
const Book = mongoose.model("Book", BookSchema);
export default Book;
```

- model() 함수에 첫 번째 파라미터는 스키마 이름, 두 번째 파라미터는 스키마 객체를 넣음
- 데이터베이스는 스키마 이름을 정해주면 그 이름의 복수 형태로 데이터베이스에 컬렉션 이름을 만듬
  - ex) Book으로 설정하면 컬렉션 이름은 books

### 데이터 생성

```jsx
export const write = async (ctx) => {
  const { title, body, tags } = ctx.request.body;
  const post = new Post({
    title,
    body,
    tags,
  });
  try {
    await post.save();
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};
```

- 인스턴스를 만들 때는 new 키워드 사용하고, 생성자 함수의 파라미터에 정보를 지닌 객체를 넣음
- save() 함수를 실행시켜야 데이터베이스에 저장되는데 이 함수의 반환 값은 Promise이므로 async/await 문법으로 저장 요청을 완료할때까지 대기

### 데이터 조회

```jsx
export const list = async (ctx) => {
  try {
    const posts = await Post.find().exec();
    ctx.body = posts;
  } catch (e) {
    ctx.throw(500, e);
  }
};
```

- find() 함수를 호출한 후에는 exec()를 붙여주어야 서버에 쿼리를 요청함

### 특정 포스트 조회

```jsx
export const read = async (ctx) => {
  const { id } = ctx.params;
  try {
    const post = await Post.findById(id).exec();
    if (!post) {
      ctx.status = 404; // Not Found
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};
```

- 특정 id를 가진 데이터를 조회할 때는 findById() 함수를 사용

### 데이터 삭제

- remove() : 특정 조건을 만족하는 데이터를 모두 지움
- findByIdAndRemove() : id를 찾아서 지움
- findOneAndRemove() : 특정 조건을 만족하는 데이터 하나를 찾아서 제거

```jsx
export const remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204; // No Content (성공하기는 했지만 응답할 데이터는 없음)
  } catch (e) {
    ctx.throw(500, e);
  }
};
```

### 데이터 수정

```jsx
export const update = async (ctx) => {
  const { id } = ctx.params;
  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true, // 이 값을 설정하면 업데이트된 데이터를 반환합니다.
      // false일 때는 업데이트되기 전의 데이터를 반환합니다.
    }).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};
```

- findByIdAndUpdate() 함수의 첫 번째 파라미터는 id, 두 번째 파라미터는 업데이트 내용, 세 번째 파라미터는 업데이트의 옵션
