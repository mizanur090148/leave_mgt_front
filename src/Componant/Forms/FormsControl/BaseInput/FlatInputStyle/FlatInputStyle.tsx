import { Card, Col } from 'reactstrap'
import CardHeaderCommon from '../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { flatInputStyleSubTitle } from '../../../../../Data/Forms/FormsControl/BaseInput/BaseInput'
import { FlatInputStyles } from '../../../../../utils/Constant'
import FlatInputStyleForm from './FlatInputStyleForm'

const FlatInputStyle = () => {
  return (
    <Col md="6">
      <Card>
        <CardHeaderCommon title={FlatInputStyles} span={flatInputStyleSubTitle} headClass="pb-0" />
        <FlatInputStyleForm />
      </Card>
    </Col>
  )
}

export default FlatInputStyle