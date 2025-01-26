import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { ProductForm } from "../../../../utils/Constant";
import { H5 } from "../../../../AbstractElements";
import ProductBody from "./ProductBody/ProductBody";

const AddProductContainer = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
              <H5>{ProductForm}</H5>
            </CardHeader>
            <CardBody>
              <ProductBody />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddProductContainer;
