import { Card, CardBody, Col, Form } from 'reactstrap'
import CardHeaderCommon from '../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { Typeahead } from 'react-bootstrap-typeahead'
import { moviesList, remoteTypeHeadData } from '../../../../../Data/Forms/FormsWidgets/Typeahead/Typeahead'
import { RemotelyAheadHeading } from '../../../../../utils/Constant'

const RemoteTypeAhead = () => {
  return (
    <Col sm="12" md="6">
      <Card>
        <CardHeaderCommon title={RemotelyAheadHeading} span={remoteTypeHeadData} />
        <CardBody>
          <div id="remote">
            <Form className="theme-form">
              <div>
                <Typeahead options={moviesList} placeholder="Choose Option" id="Remote TypeAhead"/>
              </div>
            </Form>
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default RemoteTypeAhead