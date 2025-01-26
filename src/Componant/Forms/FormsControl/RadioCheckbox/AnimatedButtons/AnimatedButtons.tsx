import { Card, CardBody, Col, Row } from 'reactstrap'
import CardHeaderCommon from '../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { AnimatedButton } from '../../../../../utils/Constant'
import AnimatedRadio from './AnimatedRadio'
import AnimatedCheckbox from './AnimatedCheckbox'
import { animatedButtonData } from '../../../../../Data/Forms/FormsControl/RadioCheckbox/RadioCheckbox'

const AnimatedButtons = () => {
  return (
    <Col xl="6">
      <Card className="height-equal">
        <CardHeaderCommon title={AnimatedButton} span={animatedButtonData} />
        <CardBody>
          <Row className="g-3">
            <AnimatedRadio />
            <AnimatedCheckbox />
          </Row>
        </CardBody>
      </Card>
    </Col>
  )
}

export default AnimatedButtons