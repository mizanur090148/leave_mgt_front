import { Card, CardBody, Col, Container, Row } from "reactstrap"
import CommonCardHeader from "../../../CommonElements/CommonCardHeader/CommonCardHeader"
import { whetherIconsWithAnimations } from "../../../utils/Constant"
import { weatherIconList } from "../../../Data/Icons/WhetherIcon"


const WhetherIconContainer = () => {
  return (
    <Container fluid>
      <Row>
        <Col sm="12">
          <Card>
            <CommonCardHeader title={whetherIconsWithAnimations} />
            <CardBody>
              <Row className="icon-lists whether-icon">
                {weatherIconList.map((icon, i) => (
                  <Col lg="2" xs="3" key={i}>
                    {icon.icon}
                  </Col>
                ))}
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default WhetherIconContainer