import { Card, CardBody, Col, Row } from "reactstrap";
import CardHeaderCommon from "../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import { ImagesWitRadio } from "../../../../../utils/Constant";
import CustomImagesWithRadio from "./CustomImagesWithRadio";
import DynamicImagesWithRadio from "./DynamicImagesWithRadio";
import { imageWithRadioData } from "../../../../../Data/Forms/FormsControl/RadioCheckbox/RadioCheckbox";

const ImagesWithRadio = () => {
  return (
    <Col sm="12">
      <Card>
        <CardHeaderCommon title={ImagesWitRadio} span={imageWithRadioData} />
        <CardBody>
          <div className="main-img-checkbox">
            <Row className="g-3">
              <CustomImagesWithRadio />
              <DynamicImagesWithRadio />
            </Row>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ImagesWithRadio;
