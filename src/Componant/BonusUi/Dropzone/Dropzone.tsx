import { Container, Row } from 'reactstrap'
import DefaultDropzone from './DefaultDropzone/DefaultDropzone'
import ImagePreview from './ImagePreview/ImagePreview'
import SingleFileUpload from './SingleFileUpload/SingleFileUpload'
import MultiFileUpload from './MultiFileUpload/MultiFileUpload'

const DropzoneContainer = () => {
  return (
    <Container fluid>
      <Row>
        <DefaultDropzone />
        <ImagePreview/>
        <SingleFileUpload/>
        <MultiFileUpload/>
      </Row>
    </Container>
  )
}

export default DropzoneContainer