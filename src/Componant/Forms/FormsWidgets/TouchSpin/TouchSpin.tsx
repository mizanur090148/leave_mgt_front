import { Container, Row } from 'reactstrap'
import DefaultTouchspin from './DefaultTouchspin/DefaultTouchspin'
import OutlinedTouchspin from './OutlinedTouchspin/OutlinedTouchspin'
import IconsWithPrefixAndPostfix from './IconsWithPrefixAndPostfix/IconsWithPrefixAndPostfix'
import ButtonsWithPrefixAndPostfix from './ButtonsWithPrefixAndPostfix/ButtonsWithPrefixAndPostfix'
import RoundedTouchspins from './RoundedTouchspins/RoundedTouchspins'

const TouchSpinContainer = () => {
  return (
    <Container fluid>
      <div className="bootstrap-touchspin">
        <Row>
          <DefaultTouchspin />
          <OutlinedTouchspin />
          <IconsWithPrefixAndPostfix />
          <ButtonsWithPrefixAndPostfix />
          <RoundedTouchspins />
        </Row>
      </div>
    </Container>
  )
}

export default TouchSpinContainer