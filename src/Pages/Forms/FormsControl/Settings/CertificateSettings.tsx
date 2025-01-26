import { Card, CardBody, Col, Container, Row } from "reactstrap";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import CertificateSettingsForm from "../../../../Componant/Forms/Settings/CertificateSettingsForm";
import { useLocation } from "react-router-dom";

const CertificateSettings = () => {
  const location = useLocation();
  const union = location?.state?.union;

  return (
    <div className="page-body">
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeaderCommon title={`সনদ সেটিংস [${union?.name}]`} />{" "}
              <CardBody>
                <CertificateSettingsForm />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CertificateSettings;
