# 1일차

## 작업 환경 설정
```
1. Node.js / npm, yarn 설치하기
2. 코드 에디터 설치하기
3. Git 설치하기
4. create-react-app으로 프로젝트 만들기
```
- `create-react-app` : 리액트 프로젝트를 생성할 때 필요한 웹팩, 바벨의 설치 및 설정 과정을 생략하고 바로 간편하게 프로젝트 작업 환경을 구축해주는 도구
    + hello-react 프로젝트 생성하여 실행
```
yarn create react-app hello-react # 또는 npm init react-app <프로젝트 이름>
cd hello-react
yarn start # 또는 npm start
```
   \
**참고**   \
똑같이 따라하는데 아래와 같은 오류가 났다
```
error Command failed with exit code 1
```
터미널에서 하란대로 삭제하고 뭐하고 해도 해결되지 않아서 /User 아래에 있는 node_modules 폴더를 삭제했다.. 괜찮겠지..?