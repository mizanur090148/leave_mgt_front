import { Container, Row } from 'reactstrap'
import BasicTimeline from './BasicTimeline/BasicTimeline'
import HoveringTimeline from './HoveringTimeline/HoveringTimeline'
import VariationTimeline from './VariationTimeline/VariationTimeline'
import HorizontalTimeline from './HorizontalTimeline/HorizontalTimeline'
import Timelines from './Timelines/Timelines'

const TimelineContainer = () => {
  return (
    <Container fluid>
      <Row>
        <BasicTimeline />
        <HoveringTimeline />
        <VariationTimeline />
        <HorizontalTimeline />
        <Timelines />
      </Row>
    </Container>
  )
}

export default TimelineContainer