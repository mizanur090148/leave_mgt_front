import { Card, CardBody, Col, Form } from 'reactstrap'
import CardHeaderCommon from '../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { basicTypeHeadData, stateOfUsa } from '../../../../../Data/Forms/FormsWidgets/Typeahead/Typeahead'
import { BasicTypeaheadHeading } from '../../../../../utils/Constant'
import { Typeahead } from 'react-bootstrap-typeahead'

const BasicTypeAhead = () => {
  return (
    <Col sm="12" md="6">
      <Card>
        <CardHeaderCommon title={BasicTypeaheadHeading} span={basicTypeHeadData} />
        <CardBody>
          <div id="the-basics">
            <Form className="theme-form">
              <div>
                <Typeahead options={stateOfUsa} placeholder="States of USA" id="Basic TypeAhead" />
              </div>
            </Form>
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default BasicTypeAhead