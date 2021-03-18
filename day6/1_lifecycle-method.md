# 6일차

## 라이프사이클 메서드 살펴보기

### render() 함수
```jsx
render() { ... }
```
- 컴포넌트 모양새를 정의하므로 가장 중요하고, 라이프사이클 메서드 중 유일한 필수 메서드
- 이 메서드 안에서 this.props와 this.state에 접근할 수 있으며 리액트 요소를 반환(아무것도 보여주고 싶지 않다면 null, false 반환)
- 이 메서드 안에서는 이벤트 설정이 아닌 곳에서 setState를 사용하면 안 되며, 브라우저의 DOM에 접근해서도 안됨
    + DOM 정보를 가져오거나 state에 변화를 줄 때는 `componentDidMount` 처리

### constructor 메서드
```jsx
constructor(props) { ... }
```
- 컴포넌트의 생성자 메서드로 컴포넌트를 만들 때 처음으로 실행
- 이 메서드에서는 초기 state를 정할 수 있음

### getDerivedStateFromProps 메서드
```jsx
static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.value !== prevState.value) { // 조건에 따라 특정 값 동기화
        return {value : nextProps.value};
    }
    return null; // state를 변경할 필요가 없다면 null을 반환
}
```
- props로 받아 온 값을 state에 동기화시키는 용도로 사용하며, 컴포넌트가 마운트될 때와 업데이트될 때 호출(v16.3 이후 생긴 메서드)

### componentDidMount 메서드
```jsx
componentDidMount() { ... }
```
- 컴포넌트를 만들고, 첫 렌더링을 다 마친 후 실행
- 이 안에서 다른 자바스크립트 라이브러리 또는 프레임워크의 함수를 호출하거나 이벤트 등록, setTimeout, setInterval, 네트워크 요청 같은 비동기 작업을 처리

### shouldComponentUpdate 메서드
```jsx
shouldComponentUpdate(nextProps, nextState) { ... }
```
- props 또는 state를 변경했을 때, 리렌더링을 시작할지 여부를 지정하는 메서드
- 반드시 true 또는 false 값을 반환해야 함
    + 컴포넌트를 만들 때 이 메서드를 따로 생성하지 않으면 기본적으로 언제나 true 값 반환
    + 이 메서드가 false 값을 반환한다면 업데이트 과정은 중지
- 이 메서드 안에서 현재 props와 state는 this.props와 this.state로 접근하고, 새로 설정될 props 또는 state는 nextProps와 nextState로 접근

### getSnapshotBeforeUpdate 메서드
```jsx
getSnapshotBeforeUpdate(prevProps, prevState){
    if(prevState.array !== this.state.array){
        const {scrollTop, scrollHeight} = this.list
        return {scrollTop, scrollHeight}
    }
}
```
- 이 메서드는 render에서 만들어진 결과물이 브라우저에 실제로 반영되기 직전에 호출(v16.3 이후 생긴 메서드)
- 이 메서드에서 반환하는 값은 componentDidUpdate에서 세번째 파라미터인 snapshot 값으로 전달받을 수 있음
- 주로 업데이트하기 직전의 값을 참고할 일이 있을 때 활용(ex.스크롤바 위치 유지)

### componentDidUpdate 메서드
```jsx
componentDidUpdate(prevProps, prevState, snapshot) { ... }
```
- 리렌더링을 완료한 후 실행
- 업데이트가 끝난 직후이므로, DOM 관련 처리를 해도 무방
- prevProps 또는 prevState를 사용하여 컴포넌트가 이전에 가졌던 데이터에 접근할 수 있음

### componentWillUnmount 메서드
```jsx
componentWillUnmount() { ... }
```
- 컴포넌트를 DOM에서 제거할 때 실행
- componentDidMount에서 등록한 이벤트, 타이머, 직접 생성한 DOM이 있다면 여기서 제거 작업을 해야함

### componentDidCatch 메서드
```jsx
componentDidCatch(error, info){
    this.setState({
        error : true
    })
    console.log({error, info})
}
```
- error 파라미터에 어떤 에러가 발생했는지 알려주며, info 파라미터는 어디에 있는 코드에서 오류가 발생했는지에 대한 정보를 줌
- 실제로 사용할땐 오류가 발생하면 console.log가 아닌 서버 API를 호출하여 따로 수집할 수도 있음
- 그러나 이 메서드를 사용할 때는 컴포넌트 자신에게 발생하는 에러를 잡아낼 순 없고 자신의 this.props.children으로 전달되는 컴포넌트에서 발생하는 에러만 잡아낼 수 있다는 점을 알기

> /hello-react/src/LifeCycleSample.js
- 처음 실행될 때 호출되는 함수 순서
    + constructor -> getDerivedStateFromProps -> render -> componentDidMount
- 버튼 클릭시 호출되는 함수 순서
    + getDerivedStateFromProps -> shouldComponentUpdate -> render -> getSnapshotBeforeUpdate -> componentDidUpdate

> /hello-react/src/ErrorBoundary.js
- 에러가 발생하면 componentDidCatch 메서드가 호출되며, 이 메서드는 this.state.error 값을 true로 업데이트해줌
- render 함수는 this.state.error 값이 true라면 에러가 발생했음을 알려주는 문구를 보여줌