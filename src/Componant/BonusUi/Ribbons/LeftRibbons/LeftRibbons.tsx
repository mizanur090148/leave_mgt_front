import { Card, CardBody, Col, Row } from 'reactstrap'
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { VariationsOfLeftRibbons } from '../../../../utils/Constant'
import { leftRibbonsData } from '../../../../Data/BonusUi/Ribbons/Ribbons'
import StaticLeftRibbons from './StaticLeftRibbons'
import DynamicLeftRibbons from './DynamicLeftRibbons'

const LeftRibbons = () => {
  return (
    <Row>
      <Col sm="12" xl="12">
        <Card>
          <CardHeaderCommon title={VariationsOfLeftRibbons} span={leftRibbonsData} />
          <CardBody>
            <Row className="g-3">
              <StaticLeftRibbons />
              <DynamicLeftRibbons />
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default LeftRibbons