import { Container, Row } from "reactstrap";
import HtmlSourcedData from "./HtmlSourcedData/HtmlSourcedData";
import AjaxSourcedData from "./AjaxSourcedData/AjaxSourcedData";
import JavaScriptSourcedData from "./JavaScriptSourcedData/JavaScriptSourcedData";
import ServerSideProcessing from "./ServerSideProcessing/ServerSideProcessing";

const DataSourceContainer = () => {
  return (
    <Container fluid>
      <Row>
        <HtmlSourcedData />
        {/* <AjaxSourcedData />
        <JavaScriptSourcedData />
        <ServerSideProcessing /> */}
      </Row>
    </Container>
  );
};

export default DataSourceContainer;
