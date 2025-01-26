import { Col, Container, Row } from 'reactstrap'
import NewOrders from './NewOrders'
import ShippedOrders from './ShippedOrders'
import CancelledOrders from './CancelledOrders'
import DataTableOrderHistory from './DataTableOrderHistory'

const OrderHistoryContainer = () => {
  return (
    <Container fluid>
      <Row>
        <Col sm="12">
          <NewOrders />
          <ShippedOrders />
          <CancelledOrders />
          <DataTableOrderHistory />
        </Col>
      </Row>
    </Container>
  )
}

export default OrderHistoryContainer