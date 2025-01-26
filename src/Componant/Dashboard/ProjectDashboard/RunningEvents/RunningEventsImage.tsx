import { Col } from "reactstrap";
import { Image } from "../../../../AbstractElements";
import { dynamicImage } from "../../../../Service";

const RunningEventsImage = () => {
  return (
    <Col xs="6" className="running-events">
      <Image src={dynamicImage("dashboard-2/round.png")} alt="dashboard" />
      <div>
        <Image className="running-events-image" src={dynamicImage("dashboard-2/events-bg.png")} alt="dashboard"/>
      </div>
    </Col>
  );
};

export default RunningEventsImage;
