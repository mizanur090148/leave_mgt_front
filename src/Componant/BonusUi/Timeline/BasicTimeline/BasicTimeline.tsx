import { Card, CardBody, Col } from 'reactstrap'
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { BasicTimelines } from '../../../../utils/Constant'
import { basicTimeLineData } from '../../../../Data/BonusUi/Timeline/Timeline'
import StaticBasicTimeline from './StaticBasicTimeline'
import DynamicBasicTimeline from './DynamicBasicTimeline'
import { UL } from '../../../../AbstractElements'

const BasicTimeline = () => {
  return (
    <Col xl="6" sm="6" className="notification main-timeline">
      <Card>
        <CardHeaderCommon title={BasicTimelines} span={basicTimeLineData} />
        <CardBody className="dark-timeline mb-0">
          <UL className='simple-list'>
            <StaticBasicTimeline />
            <DynamicBasicTimeline />
          </UL>
        </CardBody>
      </Card>
    </Col>
  )
}

export default BasicTimeline
