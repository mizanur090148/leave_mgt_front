import { Card, CardBody, Col, Row } from 'reactstrap'
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { CheckBoxButtonGroups } from '../../../../utils/Constant'
import { checkboxButtonGroupData } from '../../../../Data/Buttons/ButtonGroup'
import StaticCheckBoxButtonGroup from './StaticCheckBoxButtonGroup'
import DynamicCheckBoxButtonGroup from './DynamicCheckBoxButtonGroup'

const CheckBoxButtonGroup = () => {
  return (
    <Col sm="12">
      <Card>
        <CardHeaderCommon title={CheckBoxButtonGroups} span={checkboxButtonGroupData} />
        <CardBody className="btn-group-showcase">
          <Row>
            <StaticCheckBoxButtonGroup />
            <DynamicCheckBoxButtonGroup />
          </Row>
        </CardBody>
      </Card>
    </Col>
  )
}

export default CheckBoxButtonGroup