import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { ImageGallery } from '../../../../utils/Constant'
import MyGallery from './MyGallery'

const GalleryGridContainer = () => {
  return (
    <Container fluid>
      <Row>
        <Col sm="12">
          <Card>
            <CardHeaderCommon title={ImageGallery} />
            <CardBody className="gallery my-gallery">
              <Row>
                <MyGallery />
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default GalleryGridContainer