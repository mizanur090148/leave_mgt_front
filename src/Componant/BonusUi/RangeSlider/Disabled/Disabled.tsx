import { Card, CardBody, Col } from 'reactstrap'
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { Disable } from '../../../../utils/Constant'
import DisabledForm from './DisabledForm'
import { defaultRangeData } from '../../../../Data/BonusUi/RangeSlider/RangeSlider'

const Disabled = () => {
  return (
    <Col lg="6">
      <Card>
        <CardHeaderCommon title={Disable} span={defaultRangeData} />
        <CardBody>
          <DisabledForm />
        </CardBody>
      </Card>
    </Col>
  )
}

export default Disabled