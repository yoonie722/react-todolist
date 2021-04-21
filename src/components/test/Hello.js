import React from 'react';

function Hello({ color, name, isSpecial }) {
	return (
		<div style={{
			color
		}}>
			{/* bloolean(참/거짓)의 기본값은 참 이다 */}
			{isSpecial ? <b>*</b> : null} {/* 사망연산자 : isSpecial이  true면 *를 렌더링 할것이고, 아니면 null를 렌더링 할것이다. */}
			{isSpecial && <b>*</b>} {/* and 연산자 : 어떤 값을 숨기고 할때에는 and연산자가 사망연산자보다 더 적합하다. */}
			안녕하세요 {name}
		</div>
	)
}

Hello.defaultProps = {
	//만약에 특정값을 빠트렸을때 기본값으로 쓸 값
	name: '이름없음'
}

export default Hello;