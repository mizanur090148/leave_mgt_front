import { Card, CardBody, Col } from 'reactstrap'
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { WithIndicator } from '../../../../utils/Constant'
import CommonCarousel from '../Common/CommonCarousel'
import { withIndicatorData, withIndicatorDataList } from '../../../../Data/BonusUi/OwlCarousel'

const WithIndicators = () => {
  return (
    <Col xl="6" xs="12">
      <Card>
        <CardHeaderCommon title={WithIndicator} span={withIndicatorData} />
        <CardBody>
          <CommonCarousel data={withIndicatorDataList} control indecators />
        </CardBody>
      </Card>
    </Col>
  )
}

export default WithIndicators