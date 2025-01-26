import { Container, Row } from 'reactstrap'
import BasicPopover from './BasicPopover/BasicPopover'
import PopoverDirection from './PopoverDirection/PopoverDirection'
import PopoverOffset from './PopoverOffset/PopoverOffset'

const PopoverContainer = () => {
  return (
    <Container fluid>
      <Row>
        <BasicPopover />
        <PopoverDirection />
        <PopoverOffset />
      </Row>
    </Container>
  )
}

export default PopoverContainer