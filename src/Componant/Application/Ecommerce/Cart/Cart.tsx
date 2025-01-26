import { Card, CardBody, Col, Container } from 'reactstrap'
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader'
import { Carts } from '../../../../utils/Constant'
import CartData from './CartData'

const CartContainer = () => {
  return (
    <Container fluid>
        <Col sm="12">
          <Card>
            <CommonCardHeader title={Carts} />
            <CardBody>
              <CartData />
            </CardBody>
          </Card>
        </Col>
    </Container>
  )
}

export default CartContainer