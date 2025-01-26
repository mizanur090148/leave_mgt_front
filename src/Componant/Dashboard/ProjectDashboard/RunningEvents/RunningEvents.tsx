import { Card, CardBody, Col, Row } from "reactstrap";
import CommonCardHeader from "../../../../CommonElements/CommonCardHeader/CommonCardHeader";
import { RunningEvent } from "../../../../utils/Constant";
import UserEvents from "./UserEvents";
import RunningEventsImage from "./RunningEventsImage";

const RunningEvents = () => {
  return (
    <Col xl="5" className="col-xl-70 proorder-md-13">
      <Card>
        <CommonCardHeader headClass="card-no-border pb-0" title={RunningEvent} mainTitle={true} firstItem="Weekly" secondItem="Monthly" thirdItem="Yearly" />
        <CardBody className="rinning-col">
          <Row>
            <UserEvents />
            <RunningEventsImage />
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default RunningEvents;
