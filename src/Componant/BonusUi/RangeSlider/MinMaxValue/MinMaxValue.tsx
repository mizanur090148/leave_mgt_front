import { Card, CardBody, Col } from 'reactstrap'
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { MinMaxValues } from '../../../../utils/Constant'
import MinMaxValueForm from './MinMaxValueForm'
import { defaultRangeData } from '../../../../Data/BonusUi/RangeSlider/RangeSlider'

const MinMaxValue = () => {
  return (
    <Col lg="6">
      <Card>
        <CardHeaderCommon title={MinMaxValues} span={defaultRangeData}/>
        <CardBody>
          <MinMaxValueForm />
        </CardBody>
      </Card>
    </Col>
  )
}

export default MinMaxValue