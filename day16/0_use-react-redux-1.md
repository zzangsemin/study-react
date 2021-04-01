# 16일차

## 리덕스를 사용하여 리액트 애플리케이션 상태 관리하기
- 상태 업데이트에 관한 로직을 모듈에 따로 분리하여 컴포넌트 파일과 별개로 관리할 수 있게 됨 -> 코드 유지보수에 도움
- 여러 컴포넌트에서 동일한 상태를 공유해야 할 때 유용하며, 실제 업데이트가 필요한 컴포넌트만 리렌더링되도록 최적화해 줄 수도 있음

> /react-redux-tutorial 기반으로 작성

## UI 준비하기
- 리액트 프로젝트에서 리덕스를 사용할 때 가장 많이 사용하는 패턴은 프레젠테이셔널 컴포넌트와 컨테이너 컴포넌트를 분리하는 것   \
  \* 프레젠테이셔널 컴포넌트 : 주로 상태 관리가 이루어지지 않고, 그저 props를 받아 와서 화면에 UI를 보여주기만 하는 컴포넌트   \
  \* 컨테이너 컴포넌트 : 리덕스와 연동되어 있는 컴포넌트로, 리덕스로부터 상태를 받아오기도 하고 리덕스 스토어에 액션을 디스패치하기도 함
- UI에 관련된 프레젠테이셔널 컴포넌트는 `src/components`에 저장하고,   \
  리덕스와 연동된 컨테이너 컴포넌트는 `src/containers`에 작성

## 리덕스 관련 코드 작성하기
- 리덕스를 사용할 때 가장 일반적인 구조는 actions, constants, reducers 세 개의 디렉터리를 만들어 기능별로 파일을 하나씩 만드는 방식
  - 코드를 종류에 따라 다른 파일에 작성하여 정리할 수 있어서 편리하지만, 새로운 액션을 만들 때마다 세 종류의 파일을 모두 수정해야 돼서 불편하기도 함
- `Ducks 패턴` : 액션 타입, 액션 생성 함수, 리듀서 함수를 기능별로 파일 하나에 몰아서 작성하는 방식
  - 일반적인 구조로 리덕스를 사용하다가 불편함을 느낀 개발자들이 자주 사용(책에서 사용)

**모듈 작성하기**
- Ducks 패턴을 사용하여 액션 타입, 액션 생성 함수, 리듀서를 작성한 코드를 `모듈`이라고 함
1. 액션 타입 정의하기
```jsx
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';
```
- 액션 타입은 대문자로 정의하고, 문자열 내용은 `모듈 이름/액션 이름`과 같은 형태로 작성

2. 액션 생성 함수 만들기
```jsx
export const increase = () => ({type: INCREASE});
export const decrease = () => ({type: DECREASE});
```
- `export` 키워드를 사용함으로써 이 함수를 다른 파일에서 불러와 사용할 수 있음

3. 초기 상태 및 리듀서 함수 만들기
```jsx
const initialState = {
  number: 0
};

function counter(state = initialState, action){
  switch(action.type){
    case INCREASE:
      return {
        number: state.number + 1
      };
    case DECREASE:
      return {
        number: state.number - 1
      };
    default:
      return state;
  }
}
export default counter;
```
- 초기 상태 number 값 설정, 리듀서 함수에는 현재 상태를 참조하여 새로운 객체를 생성해서 반환하는 코드
- 액션 생성 함수에서 사용한 export는 여러 개를 내보낼 수 있고, export default는 한 개만 내보낼 수 있음
```jsx
// export랑 export default 불러오는 방식
import counter from './counter';
import {increase, decrease} from './counter';
import counter, {increase, decrease} from './counter'; // 한 번에 불러오고 싶을 때
```

**루트 리듀서 만들기**
- createStore 함수를 사용하여 스토어를 만들 때는 리듀서를 하나만 사용해야 함
  - 따라서 여러 개 만들었던 리듀서를 하나로 합쳐주어야 함
- 리덕스에서 제공하는 `combineReducers`라는 유틸 함수를 사용하여 처리
```jsx
import {combineReducers} from 'redux';
import counter from './counter';
import todos from './todos';
const rootReducer = combineReducers({
  counter,
  todos,
});
export default rootReducer;
```

## 리액트 애플리케이션에 리덕스 적용하기
- 스토어를 만들고 리액트 애플리케이션에 리덕스를 적용하는 작업은 src/index.js에서 이루어짐
1. 스토어 만들기
2. Provider 컴포넌트를 사용하여 프로젝트에 리덕스 사용하기
- 리액트 컴포넌트에서 스토어를 사용할 수 있도록 App 컴포넌트를 react-redux에서 제공하는 Provider 컴포넌트로 감싸기
  - store를 props로 전달해주어야 함
3. Redux DevTools의 설치 및 적용
- Redux DevTools 크롬 확장 프로그램설치
- `yarn add redux-devtools-extension` 설치하여 크롬 개발자 도구에서 리덕스 내부의 상태확인
```jsx
(...)
// 해당 설명과 관련 없는 코드 생략
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './modules';
const store = createStore(rootReducer, composeWithDevTools());
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
(...)
```