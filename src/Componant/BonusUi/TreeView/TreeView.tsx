import { Col, Container, Row } from 'reactstrap'
import BasicTrees from './BasicTrees/BasicTrees'
import DisabledTree from './DisabledTree/DisabledTree'

const TreeViewContainer = () => {
  return (
    <Container fluid>
      <Row>
        <Col sm="6">
          <BasicTrees />
        </Col>
        <Col sm="6">
          <DisabledTree />
        </Col>
      </Row>
    </Container>
  )
}

export default TreeViewContainer