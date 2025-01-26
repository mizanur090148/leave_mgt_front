import { Card, CardBody, Col, Form } from 'reactstrap'
import CardHeaderCommon from '../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { Typeahead } from 'react-bootstrap-typeahead'
import { RTLSupportHeading } from '../../../../../utils/Constant'
import { countryDataList, rtlSupportData } from '../../../../../Data/Forms/FormsWidgets/Typeahead/Typeahead'

const RtlSupport = () => {
  return (
    <Col sm="12" md="6">
      <Card>
        <CardHeaderCommon title={RTLSupportHeading} span={rtlSupportData} />
        <CardBody>
          <div id="scrollable-dropdown-menu">
            <Form className="theme-form">
              <div>
                <Typeahead align="right" options={countryDataList} placeholder="Countries" id="RTL Support" />
              </div>
            </Form>
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default RtlSupport