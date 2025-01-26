import { Container, Row } from "reactstrap";
import TotalProject from "./TotalProject/TotalProject";

const ReportContainer = () => {
  return (
    <Container fluid className="dashboard-2">
      <Row>
        <TotalProject />
      </Row>
    </Container>
  );
};

export default ReportContainer;
