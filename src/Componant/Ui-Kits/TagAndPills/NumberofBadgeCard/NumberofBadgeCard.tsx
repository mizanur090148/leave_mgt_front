import { Card, Col } from 'reactstrap'
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { NumberOfBadge } from '../../../../utils/Constant'
import { numberContext, numberData } from '../../../../Data/Ui-Kits/TagAndPills/TagAndPills'
import CommonTagAndPillsCardBody from '../Common/CommonTagAndPillsCardBody'

const NumberOfBadgeCard = () => {
  return (
    <Col sm="12" xl="6">
      <Card>
        <CardHeaderCommon title={NumberOfBadge} span={numberData} />
        <CommonTagAndPillsCardBody number={numberContext} />
      </Card>
    </Col>
  )
}

export default NumberOfBadgeCard