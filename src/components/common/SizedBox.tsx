import styled from 'styled-components'

// 너비와 높이 타입 정의
interface Size {
  width?: number
  height?: number
}

// Box 컴포넌트에 적용할 스타일 정의
// 너비와 높이를 props로 받아서 처리
const Box = styled.div<Size>`
  width: ${(props) => (props.width ? `${props.width}px` : 'auto')};
  height: ${(props) => (props.height ? `${props.height}px` : 'auto')};
  background-color: transparent;
`

// SizedBox 컴포넌트 정의
// Size 인터페이스를 props로 받음
const SizedBox = ({ width, height }: Size) => {
  return <Box width={width} height={height} />
}

export default SizedBox
