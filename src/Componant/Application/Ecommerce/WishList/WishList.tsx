import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { Wishlist } from '../../../../utils/Constant'
import WishlistData from './WishlistData'

const WishListContainer = () => {
  return (
    <Container fluid>
        <Row>
            <Col sm="12">
                <Card>
                    <CardHeaderCommon title={Wishlist} />
                    <CardBody>
                        <WishlistData />
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </Container>
  )
}

export default WishListContainer