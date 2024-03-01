import { useState, useEffect } from 'react'

import '../../reset.css'
import styled from 'styled-components'
import SizedBox from '../components/common/SizedBox'
import FullLine from '../components/common/Line'

export const Popup = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [count, setCount] = useState(0)
  const link = `chrome-extension://${chrome.runtime.id}/options.html`
  const [recentData, setRecentData] = useState(['사과', '바나나', '딸기', '포도'])
  const [storedData, setStoredData] = useState([
    '오렌지',
    '수박',
    '메론',
    '복숭아',
    '키위',
    '망고',
    '체리',
    '블루베리',
  ])
  // recentData를 업데이트하는 함수
  const updateRecentData = (newItem: any) => {
    setRecentData((prevRecentData) => {
      const existingIndex = prevRecentData.findIndex((item) => item === newItem)

      let updatedRecentData = []
      if (existingIndex !== -1) {
        updatedRecentData = [
          newItem,
          ...prevRecentData.slice(0, existingIndex),
          ...prevRecentData.slice(existingIndex + 1),
        ]
      } else {
        // 새 항목을 배열의 맨 앞에 추가합니다.
        updatedRecentData = [newItem, ...prevRecentData]
      }

      return updatedRecentData.slice(0, 4)
    })
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      updateRecentData(text)

      chrome.runtime.sendMessage({ type: 'NEW_CLIPBOARD_CONTENT', content: text })
    } catch (err) {
      console.error('클립보드 복사에 실패했습니다.', err)
    }
  }

  return (
    <Wrapper>
      <ClipBox />
      <SizedBox height={40} />
      {!isLogin ? (
        <NonLoginWrapper>
          <Title>ClipBoarder</Title>
          <SizedBox height={20} />
          <Description>지금 바로 시작해보세요</Description>
          <SizedBox height={20} />
          <LoginButton>
            <LoginButtonText href={link} target="_blank" rel="noopener noreferrer">
              로그인 하러 가기
            </LoginButtonText>
            {/* <LoginButtonText
              onClick={() => setIsLogin(true)}
              target="_blank"
              rel="noopener noreferrer"
            >
              로그인 하러 가기
            </LoginButtonText> */}
          </LoginButton>
          <SizedBox height={80} />
          <Description>ClipBoarder가 뭔가요?</Description>
          <SizedBox height={20} />
          <DescriptionLink>ClipBoarder 안내 보러가기</DescriptionLink>
        </NonLoginWrapper>
      ) : (
        <>
          <Recent.Wrapper>
            <Recent.Title>Recently Used</Recent.Title>
            <SizedBox height={20} />
            <Recent.BoxContainer>
              {recentData.map((item, index) => (
                <Recent.Box key={index} onClick={() => copyToClipboard(item)}>
                  {item}
                </Recent.Box>
              ))}
            </Recent.BoxContainer>
          </Recent.Wrapper>
          <SizedBox height={10} />
          <FullLine />
          <SizedBox height={10} />
          <Stored.Wrapper>
            <Stored.Title>Stored Data</Stored.Title>
            <SizedBox height={20} />
            <Stored.BoxContainer>
              {storedData.map((item, index) => (
                <Stored.Box key={index} onClick={() => copyToClipboard(item)}>
                  {item}
                </Stored.Box>
              ))}
            </Stored.BoxContainer>
          </Stored.Wrapper>
          {/* <div className="calc">
            <button onClick={minus} disabled={count <= 0}>
              -
            </button>
            <label>{count}</label>
            <button onClick={add}>+</button>
          </div>
          <a href={link} target="_blank" rel="noopener noreferrer">
            generated by create-chrome-ext
          </a> */}
        </>
      )}
    </Wrapper>
  )
}

export default Popup

const Wrapper = styled.div`
  position: relative;
  width: 500px;
  height: 400px;
  border: 4px solid black;
  display: flex;
  flex-direction: column;
  background-color: white;
`

const ClipBox = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -4px);
  width: 50%;
  height: 16px;
  border: 4px solid black;
  border-radius: 0 0 10px 10px;
  background-color: white;
`

const Title = styled.p`
  font-size: 2rem;
  font-weight: 600;
`

const Description = styled.p`
  font-size: 1rem;
`
const DescriptionLink = styled.p`
  font-size: 0.8rem;
  text-decoration: underline;
  cursor: pointer;
`

const LoginButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: white;
  background-color: black;
  border: none;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #333;
  }
`

const LoginButtonText = styled.a`
  text-decoration: none;
  color: white;
`

const NonLoginWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const Recent = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 20px;
  `,
  Title: styled.p`
    font-weight: 700;
    font-size: 1.2rem;
  `,
  BoxContainer: styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 10px;
    overflow-x: auto;
    padding: 10px 0;
  `,
  Box: styled.div`
    width: 80px;
    height: 80px;
    background-color: #f0f0f0;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 5px;

    &:hover {
      background-color: #e0e0e0;
      transform: scale(1.05);
      transition:
        transform 0.2s ease-in-out,
        background-color 0.2s ease-in-out;
    }
  `,
}
const Stored = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    overflow: hidden;
  `,
  Title: styled.p`
    font-weight: 700;
    font-size: 1.2rem;
  `,
  BoxContainer: styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 10px;
    overflow-x: auto;
    padding: 10px 0;
    margin-right: -20px;
    &::-webkit-scrollbar {
      height: 8px;
    }
    &::-webkit-scrollbar-thumb {
      background: #ccc;
      border-radius: 4px;
    }
    &::-webkit-scrollbar-track {
      background: #f0f0f0;
    }
  `,
  Box: styled.div`
    width: 80px;
    height: 80px;
    background-color: #f0f0f0;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: #e0e0e0;
      transform: scale(1.05);
      transition:
        transform 0.2s ease-in-out,
        background-color 0.2s ease-in-out;
    }
  `,
}
