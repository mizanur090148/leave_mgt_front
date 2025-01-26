import { Container, Row } from 'reactstrap'
import NumberingWizard from './NumberingWizard/NumberingWizard'
import StudentValidationForm from './StudentValidationForm/StudentValidationForm'
import VerticalValidationWizard from './VerticalValidationWizard/VerticalValidationWizard'
import ShippingForm from './ShippingForm/ShippingForm'

const FormWizardOneContainer = () => {
  return (
    <Container fluid>
      <Row>
        <NumberingWizard />
        <StudentValidationForm />
        <VerticalValidationWizard />
        <ShippingForm />
      </Row>
    </Container>
  )
}

export default FormWizardOneContainer