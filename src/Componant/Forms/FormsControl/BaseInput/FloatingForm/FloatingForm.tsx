import { Card, CardBody, Col } from 'reactstrap'
import CardHeaderCommon from '../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { FormFloatingHeading } from '../../../../../utils/Constant'
import { floatingFormSubTitle } from '../../../../../Data/Forms/FormsControl/BaseInput/BaseInput'
import FormFloating from './FormFloating'

const FloatingForm = () => {
  return (
    <Col md="6">
      <Card>
        <CardHeaderCommon title={FormFloatingHeading} span={floatingFormSubTitle}/>
        <CardBody>
          <div className="card-wrapper border rounded-3">
            <FormFloating />
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default FloatingForm