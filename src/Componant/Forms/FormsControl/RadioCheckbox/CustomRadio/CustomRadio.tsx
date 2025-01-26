import { Card, CardBody, Col, Row } from 'reactstrap'
import CardHeaderCommon from '../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { CustomRadios } from '../../../../../utils/Constant'
import BorderedRadio from './BorderedRadio'
import IconsRadio from './IconsRadio'
import FilledRadio from './FilledRadio'
import { customRadioData } from '../../../../../Data/Forms/FormsControl/RadioCheckbox/RadioCheckbox'

const CustomRadio = () => {
  return (
    <Col sm="12">
      <Card>
        <CardHeaderCommon title={CustomRadios} span={customRadioData} />
        <CardBody>
          <Row className="g-3">
            <BorderedRadio />
            <IconsRadio />
            <FilledRadio />
          </Row>
        </CardBody>
      </Card>
    </Col>
  )
}

export default CustomRadio