import React, { useState } from "react"; //react에서 useState 불러오기 (상태관리가 필요)
import styled, { css } from "styled-components";
import { MdAdd } from 'react-icons/md';
import { useTodoDispatch, useTodoNextId } from "../TodoContext";

const CircleButton = styled.button`
	display: flex;
	align-items: center;
  justify-content: center;
	
	position: absolute;
	left: 50%;
	bottom: 0;
	transform: translate(-50%, 50%);
	width: 80px;
	height: 80px;
	border-radius: 50%;
	font-size: 60px; //아이콘 크기
	outline: none;
	border: none;
	color: white;
	cursor: pointer;
	z-index: 5;
	transition: 0.125s all ease-in;

	background: #38d9a9;
	&:hover {	
		background: #63e6be;
	}
	&:active {
		background: #20c997;
	}

	${props =>
		props.open &&
		css`
			background: #ff6b6b;
			&:hover {
				background: #ff8787;
			}
			&:active {
				background: #fa5252;
			}
			transform: translate(-50%, 50%) rotate(45deg);
		`
	}
`;

const InsertFormPositioner = styled.div`
	position: absolute;
	width: 100%;
	bottom: 0;
	left: 0;
`;

const InsertForm = styled.form`
	background: #f8f9fa;
	padding: 32px 32px 72px;
	border-radius: 0 0 16px 16px;
	border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
	width: 100%;
	padding: 12px;
	border: 1px solid #dee2e6;

	border-radius: 4px;
	outline: none;
	font-size: 18px;
	box-sizing: border-box;
`;

function TodoCreate() {
	const [open, setOpen] = useState(false); //open의 기본값은 false로 하겠다, setOpen은 현재 상태를 업데이트해주는 함수!! ('배열 비구조 할당, 구조분해'를 이용)
	//useState는 배열을 반환하게 됨.

	const [value, setValue] = useState('');

	const dispatch = useTodoDispatch();
	const nextId = useTodoNextId();

	const onToggle = () => setOpen(!open); //기존의 값을 반전
	const onChange = e => setValue(e.target.value);
	const onSubmit = e => {
		e.preventDefault(); //새로고침 방지
		dispatch({
			type: 'CREATE',
			todo: {
				id: nextId.current,
				text: value,
				done: false
			}
		});
		setValue('');
		setOpen(false);
		nextId.current += 1;
	}

	return (
		<>
			{open && (
				<InsertFormPositioner>
					<InsertForm onSubmit={onSubmit}>
						<Input 
							autoFocus 
							placeholder="할 일을 입력 후, Enter를 누르세요" 
							onChange={onChange}
							value={value}
							/>
					</InsertForm>
				</InsertFormPositioner>
			)}
			<CircleButton onClick={onToggle} open={open}>
				<MdAdd />
			</CircleButton>
		</>
	);
}

export default React.memo(TodoCreate);
