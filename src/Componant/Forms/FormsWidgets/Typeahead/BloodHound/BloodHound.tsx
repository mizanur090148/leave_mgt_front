import { Card, CardBody, Col, Form } from 'reactstrap'
import CardHeaderCommon from '../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { Typeahead } from 'react-bootstrap-typeahead'
import { bloodHoundData, stateOfUsa } from '../../../../../Data/Forms/FormsWidgets/Typeahead/Typeahead'
import { BloodHoundHeading } from '../../../../../utils/Constant'

const BloodHound = () => {
  return (
    <Col sm="12" md="6">
      <Card>
        <CardHeaderCommon title={BloodHoundHeading} span={bloodHoundData} />
        <CardBody>
          <div id="bloodhound">
            <Form className="theme-form">
              <div>
                <Typeahead options={stateOfUsa} placeholder="States of USA" id="BloodHound" />
              </div>
            </Form>
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default BloodHound