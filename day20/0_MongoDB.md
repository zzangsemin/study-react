# 20일차

## mongoose를 이용한 MongoDB

- 데이터베이스를 사용하면 웹 서비스에서 사용되는 데이터를 저장하고, 효율적으로 조회하거나 수정할 수 있음
  - MySQL, OracleDB, PostgreSQL 같은 RDBMS(관계형 데이터베이스)를 자주 사용

**관계형 데이터베이스 한계**

1. 데이터 스키마가 고정적

- 새로 등록하는 데이터 형식이 기존에 있던 데이터랑 다르다면 기존 데이터를 모두 수정해야 새 데이터를 등록해야하므로
  데이터 양이 많을 때는 스키마를 변경하는 작업이 번거로움

\* 스키마 : 데이터베이스에 어떤 형식의 데이터를 넣을지에 대한 정보를 가리킴

2. 확장성

- RDBMS는 저장하고 처리해야 할 데이터양이 늘어나면 해당 데이터베이스 서버의 성능을 업그레이드하는 방시으로 확장해주어야 함

### MongoDB

- 위와 같은 한계를 극복한 문서 지향적 NoSQL 데이터베이스
- 데이터 형식이 바뀌더라도 기존 데이터까지 수정할 필요는 없고, 여러 컴퓨터로 분산하여 처리할 수 있도록 확장하기 쉽게 설계되어 있음
- 데이터의 구조가 자주 바뀐다면 MongoDB가 유리

\* 문서(document)

- RDBMS의 레코드와 개념이 비슷
- 문서의 데이터 구조는 한 개 이상의 키-값 쌍으로 되어있음
- 문서는 BSON(바이너리 형태의 JSON) 형태로 저장
  - JSON 형태의 객체를 데이터베이스에 저장할 때 편리함

```
{
  "_id": ObjectId("5099803df3"),
  "username": "velopert",
  "name": {first: "M.J", last: "kim"}
}
```

- 새로운 문서를 만들면 \_id라는 고윳값을 자동으로 생성
  - 시간, 머신 아이디, 프로세스 아이디, 순차 번호로 되어 있어 고유함을 보장
- `컬렉션` : 여러 문서가 들어있는 곳

\* MongoDB 구조

- 서버 하나에 데이터베이스를 여러 개 가지고 있을 수 있음
- 각 데이터베이스에는 여러 개의 컬렉션이 있으며, 컬렉션 내부에는 문서가 들어있음

\* 스키마 디자인

- RDBMS에서 블로그용 데이터 스키마를 설계한다면 각 포스트, 댓글마다 테이블을 만들어 필요에 따라 JOIN해서 사용하는 것이 일반적
- NoSQL에서는 그냥 모든 것을 문서 하나에 넣음. 보통 MongoDB는 댓글을 포스트 문서 내부에 넣음
- 서브다큐먼트(subdocument) : 문서 내부에 또 다른 문서가 위치
  - 일반 문서를 다루는 것처럼 쿼리할 수 있음

### MongoDB 서버 준비

```
$ brew tap mongodb/brew
$ brew install mongodb-community@4.2
$ brew services start mongodb-community@4.2

$ mongo // 해당 명령아가 안돼서
$ export PATH="$PATH:/usr/local/Cellar/mongodb-community@4.2/4.2.9/bin" // 이거 한다음에 실행
> version()
4.2.9
```

### mongoose의 설치 및 적용

```
$ yarn add mongoose dotenv
```

- mongoose는 Node.js 환경에서 사용하는 MongoDB 기반 ODM(Object Data Modelling) 라이브러리
  - 데이터베이스 문서들을 자바스크립트 객체처럼 사용할 수 있게 해줌
- dotenv는 환경변수들을 파일에 넣고 사용할 수 있게 하는 개발 도구
  - MongoDB에 접속할 때, 서버에 주소가 계정 및 비밀번호를 코드 안에 작성하지 않고 환경변수로 설정하여
    깃허브 등의 서비스에 올릴 때는 .gitignore로 파일 제외시켜줌

```jsx
require("dotenv").config(); // dotenv를 불러와서 config() 함수를 호출해 process.env 값을 통해 조회 가능
const mongoose = require("mongoose");
// 비구조화 할당을 통해 process.env 내부 값에 대한 레퍼런스 만들기
const { PORT, MONGO_URI } = process.env;
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.error(e);
  });
```

### esm으로 ES 모듈 import/export 문법 사용하기

- 지금까지 사용한 ES 모듈 import/export 문법은 Node.js에서 정식 지원이 아님(실험적인 단계이기에 기본 옵션으로 사용 x)
- Node.js에서 import/export 문법을 사용해 모듈을 쉽게 불러올 수 있도록 esm 라이브러리를 사용
- `exports` 코드를 `export conts`로 변환
- `require` 코드를 `import`로 변환
