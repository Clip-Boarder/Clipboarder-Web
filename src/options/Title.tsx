import { useEffect, useState } from 'react'
import styled from 'styled-components'

export default function Title() {
  const [color, setColor] = useState('#FFFFFF') // 초기 색상 설정
  useEffect(() => {
    const intervalId = setInterval(() => {
      // 랜덤 색상 생성
      const newColor = '#' + Math.floor(Math.random() * 16777215).toString(16)
      setColor(newColor)
    }, 200)

    return () => clearInterval(intervalId)
  }, [])
  return <TitleWrapper style={{ color: color }}>ClipBoarder</TitleWrapper>
}
const TitleWrapper = styled.p`
  font-size: 7rem;
  color: white;
`
