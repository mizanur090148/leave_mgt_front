import { Card, CardBody, Col } from 'reactstrap'
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { DisableTouchSwipings } from '../../../../utils/Constant'
import CommonCarousel from '../Common/CommonCarousel'
import { disableTouchData, disableTouchDataList } from '../../../../Data/BonusUi/OwlCarousel'

const DisableTouchSwiping = () => {
  return (
    <Col xl="6" xs="12">
      <Card>
        <CardHeaderCommon title={DisableTouchSwipings} span={disableTouchData} />
        <CardBody>
          <CommonCarousel data={disableTouchDataList} control/>
        </CardBody>
      </Card>
    </Col>
  )
}

export default DisableTouchSwiping