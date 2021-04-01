import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const CHANGE_INPUT = 'todos/CHANGE_INPUT'; // 인풋 값을 변경함
const INSERT = 'todos/INSERT'; // 새로운 todo를 등록함
const TOGGLE = 'todos/TOGGLE'; // todo를 체크/체크 해제함
const REMOVE = 'todos/REMOVE'; // todo를 제거함

export const changeInput = createAction(CHANGE_INPUT, (input) => input);

let id = 3; // insert가 호출될 때마다 1씩 더해짐(todo 객체 두개를 사전에 미리 넣어둘 것이므로)
export const insert = createAction(INSERT, (text) => ({
  // todo 객체를 액션 객체 안에 넣어 주어야 하기 때문에 text를 넣으면 todo 객체가 반환되는 함수를 넣음
  id: id++,
  text,
  done: false,
}));
export const toggle = createAction(TOGGLE, (id) => id);
export const remove = createAction(REMOVE, (id) => id);

const initialState = {
  input: '',
  todos: [
    {
      id: 1,
      text: '리덕스 기초 배우기',
      done: true,
    },
    {
      id: 2,
      text: '리액트와 리덕스 사용하기',
      done: false,
    },
  ],
};

const todos = handleActions(
  {
    // action.payload로 받아와서 사용하는데 객체 비구조화 할당 문법으로 action 값의 payload 이름을 새로 설정해주면 어떤 값을 의미하는지 쉽게 파악할 수 있음
    [CHANGE_INPUT]: (state, { payload: input }) => ({ ...state, input }),
    [INSERT]: (state, { payload: todo }) => ({
      ...state,
      todos: state.todos.concat(todo),
    }),
    // 현재 코드에서는 TOGGLE을 제외한 업데이트 함수들은 immer를 쓰지 않는 코드가 더 짧기에 TOGGLE만 바꿔줌(나머지 주석처리 ㅎㅎ)
    [TOGGLE]: (state, { payload: id }) =>
      produce(state, (draft) => {
        const todo = draft.todos.find((todo) => todo.id === id);
        todo.done = !todo.done;
      }),
    // [TOGGLE]: (state, { payload: id }) => ({
    //   ...state,
    //   todos: state.todos.map((todo) =>
    //     todo.id === id ? { ...todo, done: !todo.done } : todo,
    //   ),
    // }),
    [REMOVE]: (state, { payload: id }) => ({
      ...state,
      todos: state.todos.filter((todo) => todo.id !== id),
    }),
    // immer 사용 예
    // [CHANGE_INPUT]: (state, { payload: input }) =>
    //   produce(state, (draft) => {
    //     draft.input = input;
    //   }),
    // [INSERT]: (state, { payload: todo }) =>
    //   produce(state, (draft) => {
    //     draft.todos.push(todo);
    //   }),
    // [REMOVE]: (state, { payload: id }) =>
    //   produce(state, (draft) => {
    //     const index = draft.todos.findIndex((todo) => todo.id === id);
    //     draft.todos.splice(index, 1);
    //   }),
  },
  initialState,
);

export default todos;
