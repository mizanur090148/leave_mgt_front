import { Card, CardBody, Col } from 'reactstrap'
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { CrossFades } from '../../../../utils/Constant'
import CommonCarousel from '../Common/CommonCarousel'
import { crossFadeData, crossFadeDataList } from '../../../../Data/BonusUi/OwlCarousel'

const CrossFade = () => {
  return (
    <Col xl="6" xs="12">
      <Card>
        <CardHeaderCommon title={CrossFades} span={crossFadeData} />
        <CardBody>
          <CommonCarousel data={crossFadeDataList} control fade interval="2500"/>
        </CardBody>
      </Card>
    </Col>
  )
}

export default CrossFade