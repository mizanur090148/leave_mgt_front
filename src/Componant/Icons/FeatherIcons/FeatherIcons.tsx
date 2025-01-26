import { Card, Col, Container, Row } from 'reactstrap'
import CommonCardHeader from '../../../CommonElements/CommonCardHeader/CommonCardHeader'
import { FeatherIcons } from '../../../utils/Constant'
import FeatherIconCardBody from './FeatherIconCardBody'

const FeatherIconsContainer = () => {
  return (
    <Container fluid>
      <Row>
        <Col sm="12">
          <Card>
            <CommonCardHeader title={FeatherIcons} />
            <FeatherIconCardBody />
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default FeatherIconsContainer