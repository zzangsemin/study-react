import React, { Component } from "react";

class Counter extends Component {
  // constructor(props) {
  //   super(props);
  //   // state의 초깃값 설정하기
  //   this.state = {
  //     number: 0,
  //     fixedNumber: 0
  //   };
  // }
  /* state를 constructor에서 꺼내기 */
  state = {
    number: 0,
    fixedNumber: 0
  };
  render() {
    const {number, fixedNumber} = this.state; // state를 조회할 때는 this.state로 조회
    return (
      <div>
        <h1>{number}</h1>
        <h2>바뀌지 않는 값 : {fixedNumber}</h2>
        <button
          // onClick을 통해 버튼이 클릭되었을 때 호출할 함수를 지정
          onClick = {() => {
            // this.setState를 사용하여 state에 새로운 값을 넣을 수 있다
            // this.setState({number : number+1});

            /* this.setState에 객체 대신 함수 인자 전달하기 */
            // this.setState(prevState => {
            //   return {
            //     number: prevState.number+1
            //   }
            // })
            // // 위 코드와 아래 코드는 완전히 똑같은 기능을 합니다
            // // 아래 코드는 함수에서 바로 객체를 반환한다는 의미
            // this.setState(prevState => ({
            //   number: prevState.number+1
            // }));

            /* this.setState가 끝난 후 특정 작업 실행하기 */
            this.setState(
              {
                number: number+1
              },
              () => {
                console.log('방금 setState가 호출되었습니다.')
                console.log(this.state);
              }
            );
          }}
        >
          +1
        </button>
      </div>
    );
  }
}
export default Counter;