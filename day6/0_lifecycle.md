# 6일차

## 라이프사이클(생명주기)
- 컴포넌트 상태에 변화가 있을 때마다 실행하는 메서드
- 이 메서드들은 서드파티 라이브러리를 사용하거나 DOM을 직접 건드려야 하는 상황에서 유용
- 클래스형 컴포넌트에서만 사용(함수형 컴포넌트 - Hooks)

### 라이프사이클 메서드의 이해
- 총 9개
    + **will** 접두사가 붙은 메서드는 어떤 작업을 작동하기 전에 실행되는 메서드
    + **Did** 접두사가 붙은 메서드는 어떤 작업을 작동한 후에 실행되는 메서드
- 라이프사이클은 마운트, 업데이트, 언마운트 세 가지 카테고리로 나눔

### 마운트(mount)
- DOM이 생성되고 웹 브라우저상에 나타나는 것
- `constructor` : 컴포넌트를 새로 만들 때마다 호출되는 클래스 생성자 메서드
- `getDerivedStateFromProps` : props에 있는 값을 state에 넣을 때 사용하는 메서드
- `render` : 우리가 준비한 UI를 렌더링하는 메서드
- `componentDidMount` : 컴포넌트가 웹 브라우저상에 나타난 후 호출하는 메서드

### 업데이트(update)
- 컴포넌트는 총 네 가지 경우에 업데이트함
    1. props가 바뀔 때
    2. state가 바뀔 때
    3. 부모 컴포넌트가 리렌더링될 때
    4. this.forceUpdate로 강제로 렌더링을 트리거할 때
- `getDerivedStateFromProps` : props의 변화에 따라 state 값에도 변화를 주고 싶을 때 사용
- `shouldComponentUpdate` : 컴포넌트가 리렌더링을 해야 할지 말아야 할지를 결정하는 메서드 true 값을 반환하면 라이프사이클 메서드를 계속 실행하고, false 값을 반환하면 작업 중지 (특정 함수에서 this.forceUpdate() 함수를 호출한다면 이 과정 생략 후 render 함수 호출)
- `render` : 컴포넌트를 리렌더링함
- `getSnapshotBeforeUpdate` : 컴포넌트 변화를 DOM에 반영하기 바로 직전에 호출하는 메서드
- `componentDidUpdate` : 컴포넌트의 업데이트 작업이 끝난 후 호출하는 메서드

### 언마운트(unmount)
- 마운트의 반대과정, 즉 컴포넌트를 DOM에서 제거하는 것
- `componentWillUnmount` : 컴포넌트가 웹 브라우저상에서 사라지기 전에 호출하는 메서드
