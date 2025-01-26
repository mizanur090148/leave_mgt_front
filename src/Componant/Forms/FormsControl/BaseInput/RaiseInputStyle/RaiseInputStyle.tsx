import { Card, Col } from 'reactstrap'
import CardHeaderCommon from '../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { raiseInputStyleSubTitle } from '../../../../../Data/Forms/FormsControl/BaseInput/BaseInput'
import { RaiseInputStyles } from '../../../../../utils/Constant'
import RaiseInputStyleForm from './RaiseInputStyleForm'

const RaiseInputStyle = () => {
  return (
    <Col md="6">
      <Card>
        <CardHeaderCommon title={RaiseInputStyles} span={raiseInputStyleSubTitle} />
        <RaiseInputStyleForm />
      </Card>
    </Col>
  )
}

export default RaiseInputStyle