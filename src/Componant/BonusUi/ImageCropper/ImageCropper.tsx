import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import CardHeaderCommon from '../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { ImageCropper } from '../../../utils/Constant'
import ImageCropperBody from './ImageCropperBody'

const ImageCropperContainer = () => {
  return (
    <Container fluid>
      <Row>
        <Col sm="12">
          <Card>
            <CardHeaderCommon title={ImageCropper} span={[{text:"Use The Image Cropper.ts"}]} />
            <CardBody>
              <ImageCropperBody />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default ImageCropperContainer