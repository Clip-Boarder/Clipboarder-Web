import { useState, useEffect } from 'react'

import '../../reset.css'
import styled from 'styled-components'
import SizedBox from '../components/common/SizedBox'

export const Popup = () => {
  const [isLogin, setIsLogin] = useState(false)
  const [count, setCount] = useState(0)
  const link = 'chrome-extension://pepblbdmofiohhhfmdhmngfdhjdmcnhc/options.html'

  const minus = () => {
    if (count > 0) setCount(count - 1)
  }

  const add = () => setCount(count + 1)

  useEffect(() => {
    chrome.storage.sync.get(['count'], (result) => {
      setCount(result.count || 0)
    })
  }, [])

  useEffect(() => {
    chrome.storage.sync.set({ count })
    chrome.runtime.sendMessage({ type: 'COUNT', count })
  }, [count])

  return (
    <Wrapper>
      <ClipBox />
      <SizedBox height={60} />
      {!isLogin ? (
        <>
          <Title>ClipBoarder</Title>
          <SizedBox height={20} />
          <Description>지금 바로 시작해보세요</Description>
          <SizedBox height={20} />
          <LoginButton>
            <LoginButtonText href={link} target="_blank" rel="noopener noreferrer">
              로그인 하러 가기
            </LoginButtonText>
          </LoginButton>
          <SizedBox height={80} />
          <Description>Clip-Boarder가 뭔가요?</Description>
          <SizedBox height={20} />
          <DescriptionLink>Clip-Boarder 안내 보러가기</DescriptionLink>
        </>
      ) : (
        <>
          <h3>ss Page</h3>
          <div className="calc">
            <button onClick={minus} disabled={count <= 0}>
              -
            </button>
            <label>{count}</label>
            <button onClick={add}>+</button>
          </div>
          <a href={link} target="_blank" rel="noopener noreferrer">
            generated by create-chrome-ext
          </a>
        </>
      )}
    </Wrapper>
  )
}

export default Popup

const Wrapper = styled.div`
  position: relative;
  width: 286px;
  height: 380px;
  border: 4px solid black;
  display: flex;
  align-items: center;
  flex-direction: column;
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
