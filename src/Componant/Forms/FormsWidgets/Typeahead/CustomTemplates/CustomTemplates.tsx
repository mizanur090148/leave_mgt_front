import { Card, CardBody, Col, Form } from 'reactstrap'
import CardHeaderCommon from '../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { Typeahead } from 'react-bootstrap-typeahead'
import { customTemplateData, oscarWinnerData } from '../../../../../Data/Forms/FormsWidgets/Typeahead/Typeahead'
import { CustomTemplate } from '../../../../../utils/Constant'

const CustomTemplates = () => {
  return (
    <Col sm="12" md="6">
      <Card>
        <CardHeaderCommon title={CustomTemplate} span={customTemplateData} />
        <CardBody>
          <div id="custom-templates">
            <Form className="theme-form">
              <div>
                <Typeahead options={oscarWinnerData} placeholder="Oscar winners" id="Custom Templates"/>
              </div>
            </Form>
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default CustomTemplates