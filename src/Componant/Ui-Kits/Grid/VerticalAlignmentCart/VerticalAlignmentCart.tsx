import { Card, CardBody, Col, Row } from 'reactstrap'
import StaticVerticalAlignment from './StaticVerticalAlignment'
import DynamicVerticalAlignment from './DynamicVerticalAlignment'
import GridCommonCardFooter from '../Common/GridCommonCardFooter'
import { VerticalAlignment, VerticalAlignmentClass, VerticalAlignmentValueClass } from '../../../../utils/Constant'
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { alignmentData } from '../../../../Data/Ui-Kits/Grid/GridData'

const VerticalAlignmentCart = () => {
  return (
    <Col sm="12">
      <Card>
        <CardHeaderCommon title={VerticalAlignment} span={alignmentData} />
        <CardBody className="grid-showcase mb-0">
          <Row>
            <StaticVerticalAlignment />
            <DynamicVerticalAlignment />
          </Row>
        </CardBody>
        <GridCommonCardFooter className={VerticalAlignmentClass} valueClass={VerticalAlignmentValueClass} />
      </Card>
    </Col>
  )
}

export default VerticalAlignmentCart