import { Card, CardBody, Col } from 'reactstrap'
import CardHeaderCommon from '../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { StudentValidationFormHeading } from '../../../../../utils/Constant'
import { studentValidationData } from '../../../../../Data/Forms/FormsLayout/FormWizardOne/FormWizardOne'
import StudentValidationFormCardBody from './StudentValidationFormCardBody'

const StudentValidationForm = () => {
  return (
    <Col xl="6">
      <Card className="height-equal">
        <CardHeaderCommon title={StudentValidationFormHeading} span={studentValidationData}/>
        <CardBody className="custom-input">
          <StudentValidationFormCardBody />
        </CardBody>
      </Card>
    </Col>
  )
}

export default StudentValidationForm