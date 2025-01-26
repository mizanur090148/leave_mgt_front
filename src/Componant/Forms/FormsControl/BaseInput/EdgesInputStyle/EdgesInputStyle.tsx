import { Card, Col } from 'reactstrap'
import CardHeaderCommon from '../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { edgesInputStyleSubTitle } from '../../../../../Data/Forms/FormsControl/BaseInput/BaseInput'
import { EdgesInputStyles } from '../../../../../utils/Constant'
import EdgesInputStyleForm from './EdgesInputStyleForm'

const EdgesInputStyle = () => {
  return (
    <Col md="6">
      <Card>
        <CardHeaderCommon title={EdgesInputStyles} span={edgesInputStyleSubTitle}/>
        <EdgesInputStyleForm />
      </Card>
    </Col>
  )
}

export default EdgesInputStyle