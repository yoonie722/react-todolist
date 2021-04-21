import React, { useReducer, createContext, useContext, useRef } from 'react';

const initialTodos = [
	{
		id: 1,
		text: '프로젝트 생성하기',
		done: false
	},
	{
		id: 2,
		text: '컴포넌트 스타일링하기',
		done: false
	},
	{
		id: 3,
		text: 'Context 만들기',
		done: false
	},
	{
		id: 4,
		text: '기능 구현하기',
		done: false
	},
];

function todoReducer(state, action) { //state와 action을 가져와서 그 다음 상태를 리턴
	switch (action.type) {
		case 'CREATE' : //새로운 항목 추가
			return state.concat(action.todo); //action 안에 todo 항목 넣어 dispatch 하기
		case 'TOGGLE' : // 껐다 켰다
			return state.map(todo => // 모든 todo에 대하여 변환 
				todo.id === action.id ? { ...todo, done: !todo.done } : todo  // todo.id가 action.id와 같다면, 해당 todo를 업데이트 해줍니다, done 값에  todo.done 값의 반대 / 다르다면 todo를 유지
			);
		case 'REMOVE' : // 지우는거
			return state.filter(todo => todo.id !== action.id );

		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
}
const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({ children }) {
	const [state, dispath] = useReducer(todoReducer, initialTodos);
	const nextId = useRef(5); //useRef?

	return (
		<TodoStateContext.Provider value={state}>
			<TodoDispatchContext.Provider value={dispath}>
				<TodoNextIdContext.Provider value={nextId}>
					{children}
				</TodoNextIdContext.Provider>
			</TodoDispatchContext.Provider>
		</TodoStateContext.Provider>
	);
}
// 커스텀 Hook - 최적화를 위해서 나눔 (state, dispatch)
export function useTodoState() {
	const context = useContext(TodoStateContext);
	if (!context) { //실수를 하였을때 빨리 알수 있도록 에러처리를 습관화 하는 것이 좋음
		throw new Error('cannot find TodoProvider');
	}
	return context;
}

export function useTodoDispatch() {
	const context = useContext(TodoDispatchContext);
	if (!context) {
		throw new Error('cannot find TodoProvider');
	}
	return context;
}

export function useTodoNextId() {
	const context = useContext(TodoNextIdContext);
	if (!context) {
		throw new Error('cannot find TodoProvider');
	}
	return context;
}