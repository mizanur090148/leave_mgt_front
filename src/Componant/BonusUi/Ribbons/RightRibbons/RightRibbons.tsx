import { Card, CardBody, Col, Row } from 'reactstrap'
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { VariationsOfRightRibbons } from '../../../../utils/Constant'
import { rightRibbonData } from '../../../../Data/BonusUi/Ribbons/Ribbons'
import StaticRightRibbons from './StaticRightRibbons'
import DynamicRightRibbons from './DynamicRightRibbons'

const RightRibbons = () => {
  return (
    <Row>
      <Col sm="12" xl="12">
        <Card>
          <CardHeaderCommon title={VariationsOfRightRibbons} span={rightRibbonData} />
          <CardBody>
            <Row className="g-3">
              <StaticRightRibbons />
              <DynamicRightRibbons />
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default RightRibbons