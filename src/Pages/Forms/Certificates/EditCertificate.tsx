import { Card, CardBody, Container, Row, Col } from "reactstrap";
import CardHeaderCommon from "../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import CertificateEditForm from "../../../Componant/Forms/Certificates/CertificateEditForm";

const EditCertificate = () => {
  return (
    <div className="page-body">
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card className="certificate-form">
              <CardHeaderCommon title={"সনদ ফরম"} />
              <CardBody style={{ paddingTop: "7px" }}>
                <CertificateEditForm />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EditCertificate;
