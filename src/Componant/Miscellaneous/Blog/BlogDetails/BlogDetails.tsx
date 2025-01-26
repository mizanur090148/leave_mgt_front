import { Container, Row } from 'reactstrap'
import UserBlog from './UserBlog/UserBlog'
import BlogWithDetails from './BlogWithDetails/BlogWithDetails'
import BlogWithoutDetails from './BlogWithoutDetails/BlogWithoutDetails'

const BlogDetailsContainer = () => {
  return (
    <Container fluid>
      <Row>
        <UserBlog />
        <BlogWithDetails />
        <BlogWithoutDetails />
      </Row>
    </Container>
  )
}

export default BlogDetailsContainer