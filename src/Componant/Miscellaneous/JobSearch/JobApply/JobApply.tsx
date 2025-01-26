import { Col, Container, Row } from 'reactstrap'
import CardViewSidebar from '../Common/CardViewSidebar/CardViewSidebar'
import JobApplyForms from './JobApplyForms/JobApplyForms'

const JobApplyContainer = () => {
  return (
    <Container fluid>
      <Row>
        <Col xl="3" className="xl-40 box-col-4-end">
          <div className="md-sidebar">
            <CardViewSidebar />
          </div>
        </Col>
        <Col xl="9" className="xl-60 box-col-8">
          <JobApplyForms />
        </Col>
      </Row>
    </Container>
  )
}

export default JobApplyContainer