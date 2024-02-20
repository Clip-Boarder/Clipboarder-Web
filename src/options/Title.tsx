import { useEffect, useState } from 'react'
import styled from 'styled-components'

export default function Title() {
  const [color, setColor] = useState('hsl(0, 100%, 50%)')

  useEffect(() => {
    let hue = 0

    const updateColor = () => {
      hue = (hue + 1) % 2000
      setColor(`hsl(${hue}, 100%, 50%)`)

      requestAnimationFrame(updateColor)
    }

    requestAnimationFrame(updateColor)

    return () => cancelAnimationFrame(0)
  }, [])

  return <TitleWrapper style={{ color: color }}>ClipBoarder</TitleWrapper>
}

const TitleWrapper = styled.p`
  font-size: 7rem;
  color: white;
`
