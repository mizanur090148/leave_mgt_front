import { Card, CardBody, Col } from 'reactstrap'
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { WithControl } from '../../../../utils/Constant'
import CommonCarousel from '../Common/CommonCarousel'
import { withControlData, withControlDataList } from '../../../../Data/BonusUi/OwlCarousel'

const WithControls = () => {
  return (
    <Col xl="6" xs="12">
      <Card>
        <CardHeaderCommon title={WithControl} span={withControlData} />
        <CardBody>
          <CommonCarousel data={withControlDataList} control interval="2000" />
        </CardBody>
      </Card>
    </Col>
  )
}

export default WithControls