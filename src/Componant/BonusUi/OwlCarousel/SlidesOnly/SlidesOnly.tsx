import { Card, CardBody, Col } from 'reactstrap'
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { SlideOnly } from '../../../../utils/Constant'
import { sliesOnlyData, sliesOnlyDataList } from '../../../../Data/BonusUi/OwlCarousel'
import CommonCarousel from '../Common/CommonCarousel'

const SlidesOnly = () => {
  return (
    <Col xl="6" xs="12">
      <Card>
        <CardHeaderCommon title={SlideOnly} span={sliesOnlyData} />
        <CardBody>
          <CommonCarousel data={sliesOnlyDataList} interval="2000"  />
        </CardBody>
      </Card>
    </Col>
  )
}

export default SlidesOnly