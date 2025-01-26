import { Col, Container, Row } from 'reactstrap'
import CardViewSidebar from '../Common/CardViewSidebar/CardViewSidebar'
import CardsClass from './CardsClass/CardsClass'
import CardsPagination from '../Common/CardViewSidebar/CardsPagination/CardsPagination'

const CardViewContainer = () => {
  return (
    <Container fluid>
      <Row>
        <Col xxl="3" xl="4" className="box-col-4-end">
          <div className="md-sidebar">
            <CardViewSidebar />
          </div>
        </Col>
        <Col xxl="9" xl="8" className="box-col-8">
          <Row>
            <CardsClass />
            <CardsPagination />
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default CardViewContainer