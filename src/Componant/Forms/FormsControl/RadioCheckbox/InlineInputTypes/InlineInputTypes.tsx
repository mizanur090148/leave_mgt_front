import { Card, CardBody, Col, Row } from 'reactstrap'
import CardHeaderCommon from '../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { InlineInputType } from '../../../../../utils/Constant'
import InlineCheckbox from './InlineCheckbox'
import InlineRadios from './InlineRadios'
import InlineSwitch from './InlineSwitch'
import { inlineInputData } from '../../../../../Data/Forms/FormsControl/RadioCheckbox/RadioCheckbox'

const InlineInputTypes = () => {
  return (
    <Col sm="12">
      <Card>
        <CardHeaderCommon title={InlineInputType} span={inlineInputData} />
        <CardBody>
          <Row className="g-3">
            <InlineCheckbox />
            <InlineRadios />
            <InlineSwitch />
          </Row>
        </CardBody>
      </Card>
    </Col>
  )
}

export default InlineInputTypes