import { Col, Container, Row } from 'reactstrap'
import CardViewSidebar from '../Common/CardViewSidebar/CardViewSidebar'
import MainCard from './MainCard/MainCard'

const JobDetailsContainer = () => {
  return (
    <Container fluid>
      <Row>
        <Col xl="3" className="xl-40 box-col-4-end">
          <div className="md-sidebar">
            <CardViewSidebar />
          </div>
        </Col>
        <Col xl="9" className="xl-60  box-col-8">
          <MainCard />
        </Col>
      </Row>
    </Container>
  )
}

export default JobDetailsContainer