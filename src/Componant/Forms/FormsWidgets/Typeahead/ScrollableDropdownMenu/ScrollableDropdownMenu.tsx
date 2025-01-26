import { Card, CardBody, Col, Form } from 'reactstrap'
import CardHeaderCommon from '../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { Typeahead } from 'react-bootstrap-typeahead'
import { countryDataList, scrollableDropdownData } from '../../../../../Data/Forms/FormsWidgets/Typeahead/Typeahead'
import { ScrollableDropDownMenuHeading } from '../../../../../utils/Constant'

const ScrollableDropdownMenu = () => {
  return (
    <Col sm="12" md="6">
      <Card>
        <CardHeaderCommon title={ScrollableDropDownMenuHeading} span={scrollableDropdownData} />
        <CardBody>
          <div id="scrollable-dropdown-menu">
            <Form className="theme-form">
              <div>
                <Typeahead options={countryDataList} placeholder="Countries" id="Scrollable DropdownMenu"/>
              </div>
            </Form>
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default ScrollableDropdownMenu