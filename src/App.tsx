import React, { useEffect, useState } from "react";
import "./App.css";
import styled from "styled-components";

function App() {
	const [src, setSrc] = useState<string>("");
	const [copyText, setCopyText] = useState<string>("");
	const handleClick = async () => {
		const isTextClipBoardItem = await navigator.clipboard.readText();
		if (isTextClipBoardItem) {
			setCopyText(isTextClipBoardItem);
		} else {
			const clipboardItems = await navigator.clipboard.read();
			for (const item of clipboardItems) {
				if (!item.types.includes("image/png")) {
					throw new Error("Clipboard contains non-image data.");
				} else {
					const blob = await item.getType("image/png");
					setSrc(URL.createObjectURL(blob));
				}
			}
		}
	};

	return (
		<Wrapper>
			<button onClick={handleClick}>테스트</button>
			<div>{copyText}</div>
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
