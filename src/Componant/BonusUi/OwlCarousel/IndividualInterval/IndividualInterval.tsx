import { Card, CardBody, Col } from 'reactstrap'
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { IndividualCarouselItemIntervals } from '../../../../utils/Constant'
import { itemIntervalData } from '../../../../Data/BonusUi/OwlCarousel'
import IndividualIntervalBody from './IndividualIntervalBody'

const IndividualInterval = () => {
  return (
    <Col xl="6" xs="12">
      <Card>
        <CardHeaderCommon title={IndividualCarouselItemIntervals} span={itemIntervalData} />
        <CardBody>
          <IndividualIntervalBody />
        </CardBody>
      </Card>
    </Col>
  )
}

export default IndividualInterval