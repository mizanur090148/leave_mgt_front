import { Container, Row } from 'reactstrap'
import LeftSidebar from '../PrivateChat/LeftSidebar/LeftSidebar'
import UserGroupChat from './UserGroupChat/UserGroupChat'

const GroupChatContainer = () => {
  return (
    <Container fluid>
      <Row className='g-0'>
        <LeftSidebar />
        <UserGroupChat   />
      </Row>
    </Container>
  )
}

export default GroupChatContainer