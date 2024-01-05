import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
	const [src, setSrc] = useState<string>('');
	const handleClick = async () => {
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

	useEffect(() => {
		const handleKeyDown = (event: {
			preventDefault: () => void;
			which: any;
			keyCode: any;
			ctrlKey: any;
			metaKey: any;
		}) => {
			event.preventDefault();
			const code = event.which || event.keyCode;

			let charCode = String.fromCharCode(code).toLowerCase();
			if ((event.ctrlKey || event.metaKey) && charCode === 'c') {
				handleClick();
			}
		};
		window.addEventListener('keydown', handleKeyDown);

		return () => window.removeEventListener('keydown', handleKeyDown);
	}, []);
	return (
		<>
			<button onClick={handleClick}>테스트</button>
			<div>테스트2</div>
			<img src={src} />
		</>
	);
}

export default App;
