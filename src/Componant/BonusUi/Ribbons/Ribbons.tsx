import { Container } from 'reactstrap'
import LeftRibbons from './LeftRibbons/LeftRibbons'
import RightRibbons from './RightRibbons/RightRibbons'

const RibbonsContainer = () => {
  return (
    <Container fluid>
      <LeftRibbons />
      <RightRibbons />
    </Container>
  )
}

export default RibbonsContainer