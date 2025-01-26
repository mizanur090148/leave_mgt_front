import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { BlogDiscardButton, BlogPostButton, PostEdit } from '../../../../utils/Constant'
import { Btn } from '../../../../AbstractElements'
import FormPost from './FormPost'
import DropzoneFile from './DropzoneFile'

const AddPostContainer = () => {
  return (
    <Container fluid>
      <Row>
        <Col sm="12">
          <Card>
            <CardHeaderCommon title={PostEdit} />
            <CardBody className="add-post">
              <FormPost />
              <DropzoneFile />
              <div className="btn-showcase text-end">
                <Btn color="primary">{BlogPostButton}</Btn>
                <Btn color="light" type="reset">{BlogDiscardButton}</Btn>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default AddPostContainer