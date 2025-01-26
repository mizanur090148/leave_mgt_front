import { Card, Col } from 'reactstrap'
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { badgesContext, badgeData } from '../../../../Data/Ui-Kits/TagAndPills/TagAndPills'
import { BadgesContextualVariations } from '../../../../utils/Constant'
import CommonTagAndPillsCardBody from '../Common/CommonTagAndPillsCardBody'

const BadgesContextualVariationsCart = () => {
  return (
    <Col sm="12" xl="6">
      <Card>
        <CardHeaderCommon title={BadgesContextualVariations} span={badgeData} />
        <CommonTagAndPillsCardBody data={badgesContext} />
      </Card>
    </Col>
  )
}

export default BadgesContextualVariationsCart