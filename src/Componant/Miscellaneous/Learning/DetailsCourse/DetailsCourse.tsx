import { Col, Container, Row } from 'reactstrap'
import CourseFilter from '../LearningList/CourseFilter/CourseFilter'
import BlogSingle from './BlogSingle/BlogSingle'

const DetailsCourseContainer = () => {
  return (
    <Container fluid>
      <Row>
        <Col xl="9" className="xl-60 order-xl-0 order-1 box-col-8">
          <BlogSingle />
        </Col>
        <Col xl="3" className="xl-40 box-col-4-end learning-filter">
          <CourseFilter />
        </Col>
      </Row>
    </Container>
  )
}

export default DetailsCourseContainer