import { Card, CardBody, Col, Container, Row } from "reactstrap";
import InvoiceSixPrint from "./InvoiceSixPrint";
import InvoiceSixHeader from "./InvoiceSixHeader";
import UserDetails from "./UserDetails";
import InvoiceSixTable from "./InvoiceSixTable";

const InvoiceSixContainer = () => {
  return (
    <Container>
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              <div className="invoice">
                <div>
                    <InvoiceSixHeader />
                    <hr />
                    <UserDetails />
                    <InvoiceSixTable />
                </div>
                <InvoiceSixPrint />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default InvoiceSixContainer;
