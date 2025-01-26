import { Card, Col, Container, Row } from 'reactstrap'
import { MasonryGalleryCap } from '../../../../utils/Constant'
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import MasonryGalleryBody from './MasonryGalleryBody'

const MasonryGalleryContainer = () => {
  return (
    <Container fluid>
      <Row>
        <Col sm="12" className="box-col-12">
          <Card className="pb-5">
            <CardHeaderCommon title={MasonryGalleryCap} />
            <MasonryGalleryBody />
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default MasonryGalleryContainer