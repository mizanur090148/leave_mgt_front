import { Card, CardBody, Col, Form } from 'reactstrap'
import CardHeaderCommon from '../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { MultipleSectionWithHeader } from '../../../../../utils/Constant'
import { multiWithHeaderData, multipleSectionHeaderData } from '../../../../../Data/Forms/FormsWidgets/Typeahead/Typeahead'
import { Typeahead } from 'react-bootstrap-typeahead'

const MultipleSectionsWithHeaders = () => {
  return (
    <Col sm="12" md="6">
      <Card>
        <CardHeaderCommon  title={MultipleSectionWithHeader} span={multipleSectionHeaderData}/>
        <CardBody>
          <div id="multiple-datasets">
            <Form className="theme-form">
              <div>
                <Typeahead  options={multiWithHeaderData} multiple clearButton placeholder="NBA and NHL teams" labelKey="name" id="1" />
              </div>
            </Form>
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default MultipleSectionsWithHeaders