import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
	const [src, setSrc] = useState<string>('');
	const handleClick = async (event: any) => {
		const isTextClipBoardItem = await navigator.clipboard.readText();
		if (isTextClipBoardItem) {
			console.log(isTextClipBoardItem);
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
		<>
			<button onClick={handleClick}>테스트</button>
			<img src={src} />
		</>
	);
}

export default App;
