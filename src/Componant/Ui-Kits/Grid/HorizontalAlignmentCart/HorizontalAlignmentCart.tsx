import { Card, CardBody, Col } from 'reactstrap'
import GridCommonCardFooter from '../Common/GridCommonCardFooter'
import { HorizontalAlignment, HorizontalAlignmentClass, HorizontalAlignmentValueClass } from '../../../../utils/Constant'
import StaticHorizontalAlignment from './StaticHorizontalAlignment'
import DynamicHorizontalAlignment from './DynamicHorizontalAlignment'
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { alignmentData } from '../../../../Data/Ui-Kits/Grid/GridData'

const HorizontalAlignmentCart = () => {
  return (
    <Col sm="12">
      <Card>
        <CardHeaderCommon title={HorizontalAlignment} span={alignmentData} />
        <CardBody className="grid-showcase grid-align">
          <StaticHorizontalAlignment />
          <DynamicHorizontalAlignment />
        </CardBody>
        <GridCommonCardFooter className={HorizontalAlignmentClass} valueClass={HorizontalAlignmentValueClass} />
      </Card>
    </Col>
  )
}

export default HorizontalAlignmentCart