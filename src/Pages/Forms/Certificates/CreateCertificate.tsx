import { Card, CardBody, Container, Row, Col } from "reactstrap";
import CardHeaderCommon from "../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import CertificateForm from "../../../Componant/Forms/Certificates/CertificateForm";

const CreateCertificate = () => {
  return (
    <div className="page-body">
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card className="certificate-form">
              <CardHeaderCommon title={"সনদ ফরম"} />
              <CardBody style={{ paddingTop: "7px" }}>
                <CertificateForm />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CreateCertificate;
