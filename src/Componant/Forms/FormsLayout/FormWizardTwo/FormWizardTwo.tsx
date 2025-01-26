import { Container, Row } from 'reactstrap'
import CustomHorizontalWizard from './CustomHorizontalWizard/CustomHorizontalWizard'
import { BusinessHorizontalWizardHeading, BusinessVerticalWizardHeading, CustomHorizontalWizardHeading, CustomVerticalWizardHeading } from '../../../../utils/Constant'
import BusinessVerticalWizard from './BusinessVerticalWizard/BusinessVerticalWizard'

const FormWizardTwoContainer = () => {
  return (
    <Container fluid>
      <Row>
        <CustomHorizontalWizard heading={CustomHorizontalWizardHeading} xs={12} />
        <BusinessVerticalWizard heading={BusinessVerticalWizardHeading} firstXl={3} secondXl={9} horizontalWizardClass="vertical-options" />
        <CustomHorizontalWizard differentId heading={CustomVerticalWizardHeading} horizontalWizardClass="vertical-options vertical-variations" firstXl={3} secondXl={9} />
        <BusinessVerticalWizard heading={BusinessHorizontalWizardHeading} xs={12} />
      </Row>
    </Container>
  )
}

export default FormWizardTwoContainer