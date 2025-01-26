import { Card, CardBody, Container, Row } from 'reactstrap'
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader'
import { BillingDetails } from '../../../../utils/Constant'
import CheckoutForm from './CheckoutForm/CheckoutForm'
import ProductCheckout from './ProductCheckout/ProductCheckout'

const CheckoutContainer = () => {
  return (
    <Container fluid>
        <Card>
          <CommonCardHeader title={BillingDetails} />
          <CardBody>
            <Row>
              <CheckoutForm />
              <ProductCheckout />
            </Row>
          </CardBody>
        </Card>
    </Container>
  )
}

export default CheckoutContainer