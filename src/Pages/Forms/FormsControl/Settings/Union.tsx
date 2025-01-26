import { Card, CardBody, Col, Container, Row } from "reactstrap";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import UnionForm from "../../../../Componant/Forms/Settings/UnionForm";

const Union = () => {
  return (
    <div className="page-body">
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeaderCommon title={"ইউনিয়ন ফরম"} />
              <CardBody>
                <UnionForm />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Union;
