import React, { useState } from 'react'; // useState 라는 함수 불러오기

function Counter() {
	const [number, setNumber] = useState(0); 
	//number의 기본값은 0 으로 하겠다, setNumber은 현재 상태를 업데이트해주는 함수!! ('배열 비구조 할당, 구조분해'를 이용)

	const onIncrease = () => {
		setNumber(number + 1);
	}

	const onDecrease = () => {
		setNumber(number - 1);
	}

	return (
		<div>
			<h1>{number}</h1>
			<button onClick={onIncrease}>+1</button>
			<button onClick={onDecrease}>-1</button>
		</div>
	)
}

export default Counter;
