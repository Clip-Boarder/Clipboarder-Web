import { useEffect, useState } from 'react'
import styled from 'styled-components'

export default function Title() {
  const [color, setColor] = useState('hsl(0, 100%, 50%)') // HSL 색상으로 초기 설정

  useEffect(() => {
    let hue = 0 // 색조 초기값

    const updateColor = () => {
      hue = (hue + 1) % 2000 // 색조를 1도씩 증가시키고 360에 도달하면 0으로 리셋
      setColor(`hsl(${hue}, 100%, 50%)`) // 색상 업데이트

      requestAnimationFrame(updateColor) // 다음 색상 변화 예약
    }

    requestAnimationFrame(updateColor)

    return () => cancelAnimationFrame(0) // 컴포넌트 언마운트 시 애니메이션 취소
  }, [])

  return <TitleWrapper style={{ color: color }}>ClipBoarder</TitleWrapper>
}

const TitleWrapper = styled.p`
  font-size: 7rem;
  color: white;
`
