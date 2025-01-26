import { Container, Row } from 'reactstrap'
import CustomScrollbar from './CustomScrollbar/CustomScrollbar'
import SmallSizeScrollbar from './SmallSizeScrollbar/SmallSizeScrollbar'
import BadgesScrollbar from './BadgesScrollbar/BadgesScrollbar'
import ProfileScrollable from './ProfileScrollable/ProfileScrollable'
import ScrollableContent from './ScrollableContent/ScrollableContent'
import HorizontalScrollbar from './HorizontalScrollbar/HorizontalScrollbar'
import BothSideVisibleScrollbar from './BothSideVisibleScrollbar/BothSideVisibleScrollbar'

const ScrollableContainer = () => {
  return (
    <>
      <Container fluid>
        <Row>
          <CustomScrollbar />
          <SmallSizeScrollbar />
          <BadgesScrollbar />
          <ProfileScrollable />
          <ScrollableContent />
          <HorizontalScrollbar />
          <BothSideVisibleScrollbar />
        </Row>
      </Container>
    </>
  )
}

export default ScrollableContainer