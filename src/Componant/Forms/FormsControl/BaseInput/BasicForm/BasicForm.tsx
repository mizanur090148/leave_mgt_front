import { Card, CardBody, Col } from 'reactstrap'
import CardHeaderCommon from '../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { basicFormSubTitle } from '../../../../../Data/Forms/FormsControl/BaseInput/BaseInput'
import { FormBasics } from '../../../../../utils/Constant'
import FormBasic from './FormBasic'

const BasicForm = () => {
  return (
    <Col md="6">
      <Card>
        <CardHeaderCommon title={FormBasics} span={basicFormSubTitle} />
        <CardBody>
          <div className="card-wrapper border rounded-3">
            <FormBasic />
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default BasicForm