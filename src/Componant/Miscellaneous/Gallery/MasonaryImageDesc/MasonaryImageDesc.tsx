import { Card, Col, Container, Row } from 'reactstrap'
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { MasonryGalleryDescriptionCap } from '../../../../utils/Constant'
import MasonryGalleryWithDescCardBody from './MasonryGalleryWithDescCardBody'

const MasonryImageDescContainer = () => {
  return (
    <Container fluid>
      <Row>
        <Col sm="12" className="box-col-12">
          <Card>
            <CardHeaderCommon title={MasonryGalleryDescriptionCap} />
            <MasonryGalleryWithDescCardBody />
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default MasonryImageDescContainer