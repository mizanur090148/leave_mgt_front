import { Card, CardBody, Col } from "reactstrap";
import CardHeaderCommon from "../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import { BrowserDefaults } from "../../../../../utils/Constant";
//import { browserDefaultSubTitle } from '../../../../../Data/Forms/FormsControl/FormsValidation/FormsValidation'
import BrowserDefaultForm from "./BrowserDefaultForm";

const BrowserDefault = () => {
  return (
    <Col xl="6">
      {/* <Card className="height-equal">
        <CardHeaderCommon title={BrowserDefaults} span={browserDefaultSubTitle}/>
        <CardBody className="custom-input">
          <BrowserDefaultForm />
        </CardBody>
      </Card> */}
    </Col>
  );
};

export default BrowserDefault;
