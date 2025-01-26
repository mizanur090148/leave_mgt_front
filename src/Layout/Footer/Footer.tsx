import { Col, Container, Row } from "reactstrap";
import { P, SVG } from "../../AbstractElements";

const Footer = () => {
  return (
    <footer className="footer">
      <Container fluid>
        <Row>
          <Col
            md="12"
            className="footer-copyright d-flex flex-wrap align-items-center justify-content-between"
          >
            <P className="mb-0 f-w-600">Gentle Solutions 2024 ©</P>
            <P className="mb-0 f-w-600">
              Hand crafted &amp; made with
              <SVG iconId="footer-heart" className="footer-icon" />
            </P>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
