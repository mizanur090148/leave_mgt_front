import { Card, CardBody, Col, Container, Row } from "reactstrap";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import BalanceForm from "../../../../Componant/Forms/Settings/BalanceForm";

const Balance = () => {
  return (
    <div className="page-body">
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeaderCommon title={"ইউজার ব্যালেন্স"} />
              <CardBody>
                <BalanceForm />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Balance;
