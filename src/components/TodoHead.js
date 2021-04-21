import React from "react";
import styled from "styled-components";
import { useTodoState } from '../TodoContext';

const TodoHeadBlock = styled.div`
	margin: 10px;
	padding: 28px 22px 14px 22px;
	border: 1px solid #e9ecef;
	border-radius: 10px;
	box-sizing: border-box;

	h1 {
		margin: 0;
		font-size: 36px;
		color: #343a40;
	}
	.day {
		margin-top: 4px;
		color: #868e96;
		font-size: 21px;
	}
	.tasks-left {
		color: #20c997;
		font-size: 18px;
		margin-top: 40px;
		font-weight: bold;
	}
`;

function TodoHead() {
	const todos = useTodoState();
	const undoneTasks = todos.filter(todo => !todo.done);

	const today = new Date();
	const dateString = today.toLocaleDateString('ko-KR', {
		year: 'numeric', //DB의 Type - 정수 또는 소수 값을 저장할 수 있다.
		month: 'long',
		day: 'numeric'
	});
	const dayName = today.toLocaleDateString('ko-KR', { weekday: 'long' });

	return (
		<TodoHeadBlock>
			<h1>{dateString}</h1>
			<div className="day">{dayName}</div>
			<div className="tasks-left">할 일 {undoneTasks.length}개 남음</div>
		</TodoHeadBlock>
	);
}

export default TodoHead;