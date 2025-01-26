import { Container, Row } from 'reactstrap'
import SizesCart from './SizesCart/SizesCart'
import StatusIndicatorCart from './StatusIndicatorCart/StatusIndicatorCart'
import ShapsCart from './ShapsCart/ShapsCart'
import RatioCart from './RatioCart/RatioCart'
import GroupingCart from './GroupingCart/GroupingCart'

const AvatarsContainer = () => {
  return (
    <Container fluid>
      <div className="user-profile">
        <Row>
          <SizesCart />
          <StatusIndicatorCart />
          <ShapsCart />
          <RatioCart />
          <GroupingCart />
        </Row>
      </div>
    </Container>
  )
}

export default AvatarsContainer