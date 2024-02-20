import { useState, useEffect } from 'react'
import '../../reset.css'
import styled from 'styled-components'
import SizedBox from '../components/common/SizedBox'
import Title from './Title'

export const Options = () => {
  const [countSync, setCountSync] = useState(0)
  const link = 'https://github.com/guocaoyi/create-chrome-ext'
  useEffect(() => {
    chrome.storage.sync.get(['count'], (result) => {
      setCountSync(result.count || 0)
    })

    chrome.runtime.onMessage.addListener((request) => {
      if (request.type === 'COUNT') {
        setCountSync(request.count || 0)
      }
    })
  }, [])
  const REDIRECT_URL = chrome.identity.getRedirectURL()
  const handleLogin = () => {
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=token&scope=email profile`

    chrome.identity.launchWebAuthFlow(
      {
        url: authUrl,
        interactive: true,
      },
      (redirectUrl) => {
        if (chrome.runtime.lastError || !redirectUrl) {
          console.log('인증에 실패했습니다.')
          return
        }
        const url = new URL(redirectUrl)
        const accessToken = url.hash
          .substring(1)
          .split('&')
          .find((param) => param.startsWith('access_token'))
          ?.split('=')[1]

        if (accessToken) {
          console.log('Access Token:', accessToken)
        } else {
          console.log('Access Token을 찾을 수 없습니다.')
        }
      },
    )
  }

  return (
    <Wrapper>
      <Title />
      <SizedBox height={40} />
      <SubTitle>
        <Highlight>더</Highlight> 빠르게, <Highlight>더</Highlight> 편리하게
      </SubTitle>
      <SizedBox height={60} />
      <Description onClick={handleLogin}>지금 바로 시작해보세요</Description>
      {/* <h4>Count from Popup: {countSync}</h4>
      <a href={link} target="_blank" rel="noopener noreferrer">
        generated by create-chrome-ext
      </a> */}
    </Wrapper>
  )
}

export default Options

const Wrapper = styled.div`
  background: rgba(0, 0, 0, 0.8);
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const SubTitle = styled.h2`
  color: white;
  font-size: 2rem;
`

const Description = styled.p`
  color: white;
  font-size: 1.5rem;
`

const Highlight = styled.span`
  font-size: 2.5rem;
`
