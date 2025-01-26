import { Card, CardBody, Col } from "reactstrap";
import CardHeaderCommon from "../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import CertificateForm from "./CertificateForm";

const TooltipFormValidation = () => {
  return (
    <Col sm="12">
      <Card className="certificate-form">
        <CardHeaderCommon title={"সনদ ফরম"} />
        <CardBody style={{ paddingTop: "7px" }}>
          <CertificateForm />
        </CardBody>
      </Card>
    </Col>
  );
};

export default TooltipFormValidation;
