import { Card, Col } from 'reactstrap'
import CardHeaderCommon from '../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { basicFloatSubTitle } from '../../../../../Data/Forms/FormsControl/BaseInput/BaseInput'
import { BasicFloatingInputControls } from '../../../../../utils/Constant'
import BasicFloatingInputControlForm from './BasicFloatingInputControlForm'

const BasicFloatingInputControl = () => {
  return (
    <Col xl="6">
      <Card className="height-equal">
        <CardHeaderCommon title={BasicFloatingInputControls} span={basicFloatSubTitle}/>
        <BasicFloatingInputControlForm />
      </Card>
    </Col>
  )
}

export default BasicFloatingInputControl