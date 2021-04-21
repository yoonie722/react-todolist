import React from "react";
import styled from "styled-components";
import { useTodoState } from "../TodoContext";
import TodoItem from "./TodoItem";

const TodoListBlock = styled.div`
	flex: 1;
	padding: 20px 32px 48px 32px;
	border-top: 1px solid #e9ecef;
	box-sizing: border-box;
	overflow-y: auto;
`;

function TodoList() {
	const todos = useTodoState();

	return (
		<TodoListBlock>
			{todos.map(todo => (
				<TodoItem 
					key={todo.id}
					id={todo.id}
					text={todo.text}
					done={todo.done}
				/>
			))}
		</TodoListBlock>
	) 
}

export default TodoList;