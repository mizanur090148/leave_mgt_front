import { Card, CardBody, Col } from 'reactstrap'
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { Prefixs } from '../../../../utils/Constant'
import PrefixForm from './PrefixForm'
import { defaultRangeData } from '../../../../Data/BonusUi/RangeSlider/RangeSlider'

const Prefix = () => {
  return (
    <Col lg="6">
      <Card>
        <CardHeaderCommon title={Prefixs} span={defaultRangeData}/>
        <CardBody className="mt-3 mb-3">
          <PrefixForm />
        </CardBody>
      </Card>
    </Col>
  )
}

export default Prefix