import { Card, CardBody, Col, Row } from 'reactstrap'
import AdditiveBorders from './AdditiveBorders'
import SubtractiveBorders from './SubtractiveBorders'
import AdditiveRadius from './AdditiveRadius'
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { BordersAndDisplays } from '../../../../utils/Constant'
import { borderData } from '../../../../Data/Ui-Kits/HelperClasses/HelperClassesData'

const BorderCart = () => {
  return (
    <Col xs="12">
      <Card>
        <CardHeaderCommon title={BordersAndDisplays} span={borderData} headClass="card-no-border pb-0"/>
        <CardBody>
          <Row className="g-3">
            <AdditiveBorders />
            <SubtractiveBorders />
            <AdditiveRadius />
          </Row>
        </CardBody>
      </Card>
    </Col>
  )
}

export default BorderCart