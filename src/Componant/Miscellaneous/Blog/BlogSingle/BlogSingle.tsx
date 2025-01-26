import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import SingleBlogData from './SingleBlogData/SingleBlogData'
import CommentSection from './CommentSection/CommentSection'

const BlogSingleContainer = () => {
  return (
    <Container fluid>
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              <div className="blog-single">
                <SingleBlogData />
                <CommentSection />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default BlogSingleContainer