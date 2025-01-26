import { Card, CardBody, Col, Row } from 'reactstrap'
import CardHeaderCommon from '../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { BasicRadioAndCheckboxHeading } from '../../../../../utils/Constant'
import { basicRadioCheckboxData } from '../../../../../Data/Forms/FormsControl/RadioCheckbox/RadioCheckbox'
import SimpleCheckbox from './SimpleCheckbox'
import SimpleRadio from './SimpleRadio'

const BasicRadioAndCheckbox = () => {
  return (
    <Col xl="6">
      <Card className="height-equal">
        <CardHeaderCommon title={BasicRadioAndCheckboxHeading} span={basicRadioCheckboxData} />
        <CardBody className="mb-4">
          <Row className="g-3">
            <SimpleCheckbox />
            <SimpleRadio />
          </Row>
        </CardBody>
      </Card>
    </Col>
  )
}

export default BasicRadioAndCheckbox