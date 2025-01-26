import { Card, Col, Container, Row } from "reactstrap";
import { hoverData } from "../../../../Data/Gallery/Gallery";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import ImageHoverEffectsCardBody from "./ImageHoverEffectsCardBody";

const HoverEffectContainer = () => {
  return (
    <Container fluid>
      {hoverData.map((data: any, index: any) => (
        <Row key={index}>
          <Col sm="12">
            <Card>
              <CardHeaderCommon title={`Hover Effect ${data}`} />
              <ImageHoverEffectsCardBody data={data} />
            </Card>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default HoverEffectContainer;
