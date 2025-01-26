import { Container, Row } from "reactstrap";
import TooltipFormValidation from "./TooltipFormValidation/TooltipFormValidation";
// import BrowserDefault from './BrowserDefault/BrowserDefault'
// import ValidationForm from './ValidationForm/ValidationForm'

const FormsValidationContainer = () => {
  return (
    <Container fluid>
      <Row>
        <TooltipFormValidation />
        {/* <BrowserDefault />
          <ValidationForm/> */}
      </Row>
    </Container>
  );
};

export default FormsValidationContainer;
