import { Card, Col } from 'reactstrap'
import CardHeaderCommon from '../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { basicHTMLSubTitle } from '../../../../../Data/Forms/FormsControl/BaseInput/BaseInput'
import { BasicHtmlInputControls } from '../../../../../utils/Constant'
import BasicHTMLInputControlForm from './BasicHTMLInputControlForm'

const BasicHTMLInputControl = () => {
  return (
    <Col xl="6">
      <Card className="height-equal">
        <CardHeaderCommon title={BasicHtmlInputControls} span={basicHTMLSubTitle}/>
        <BasicHTMLInputControlForm />
      </Card>
    </Col>
  )
}

export default BasicHTMLInputControl