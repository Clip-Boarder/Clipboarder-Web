import React, { useEffect, useState } from 'react';
import './App.css';
import styled from 'styled-components';

function App() {
	const [src, setSrc] = useState<string>('');
	const [copyText, setCopyText] = useState<string>('');
	const [isCopied, setIsCopied] = useState(false);
	const [testText, setTestText] = useState<string>('');

	useEffect(() => {
		chrome.runtime.sendMessage('message');
		// 메시지 수신 리스너
		const handleMessage = async (
			message: { copied: any },
			sender: any,
			sendResponse: any
		) => {
			if (message.copied) {
				console.log('T');
				const isTextClipBoardItem = await navigator.clipboard.readText();
				if (isTextClipBoardItem) {
					setCopyText(isTextClipBoardItem);
				}

				setIsCopied(true);
			}
		};
		const timer = setTimeout(() => {
			setTestText('테스트입니다.');
		}, 3000);

		// 리스너 등록
		chrome.runtime.onMessage.addListener(handleMessage);

		// 컴포넌트 언마운트 시 리스너 제거
		return () => {
			clearTimeout(timer);
			chrome.runtime.onMessage.removeListener(handleMessage);
		};
	}, []);
	const handleClick = async () => {
		const isTextClipBoardItem = await navigator.clipboard.readText();
		if (isTextClipBoardItem) {
			setCopyText(isTextClipBoardItem);
		} else {
			const clipboardItems = await navigator.clipboard.read();
			for (const item of clipboardItems) {
				if (!item.types.includes('image/png')) {
					throw new Error('Clipboard contains non-image data.');
				} else {
					const blob = await item.getType('image/png');
					setSrc(URL.createObjectURL(blob));
				}
			}
		}
	};

	return (
		<Wrapper>
			<div>
				{isCopied && <h1>입력됨</h1>}
				{/* 기타 컴포넌트 코드 */}
			</div>
			<button onClick={handleClick}>테스트</button>
			<div>{copyText}</div>
			<div className="test"></div>
			<img src={src} alt="test" />
		</Wrapper>
	);
}

export default App;
const Wrapper = styled.div`
	width: 286px;
	height: 380px;
	background-color: #d9d9d9;
	border-radius: 0 0 10px 10px;
	border: 2px solid black;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;
