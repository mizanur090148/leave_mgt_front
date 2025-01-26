import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { GalleryGridWithDescriptionCap } from '../../../../utils/Constant'
import DescriptionMyGallery from './DescriptionMyGallery'

const GalleryGridDescContainer = () => {
  return (
    <Container fluid>
      <Row>
        <Col sm="12">
          <Card>
            <CardHeaderCommon title={GalleryGridWithDescriptionCap} />
            <CardBody className="my-gallery gallery-with-description">
              <Row>
                <DescriptionMyGallery />
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default GalleryGridDescContainer