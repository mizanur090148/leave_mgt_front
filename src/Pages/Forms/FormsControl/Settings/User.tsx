import { Card, CardBody, Col, Container, Row } from "reactstrap";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import UserForm from "../../../../Componant/Forms/Settings/UserForm";

const User = () => {
  return (
    <div className="page-body">
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeaderCommon title={"ইউজার ফরম"} />
              <CardBody>
                <UserForm />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default User;
