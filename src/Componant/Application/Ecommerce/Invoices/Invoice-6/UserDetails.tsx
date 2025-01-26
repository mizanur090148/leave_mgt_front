import { Col, Row } from "reactstrap";
import { H4, H6, Image, P } from "../../../../../AbstractElements";
import { ProjectDescription } from "../../../../../utils/Constant";
import { dynamicImage } from "../../../../../Service";

const UserDetails = () => {
  return (
    <Row>
      <Col md="4">
        <div className="d-flex">
          <div className="media-left">
            <Image className="media-object rounded-circle img-60" src={dynamicImage("user/1.jpg")} alt="user" />
          </div>
          <div className="flex-grow-1 m-l-20">
            <H4 className="media-heading">Johan Deo</H4>
            <P>
              JohanDeo@gmail.com
              <br />
              <span>555-555-5555</span>
            </P>
          </div>
        </div>
      </Col>
      <Col md="8">
        <div className="text-md-end" id="project">
          <H6>{ProjectDescription}</H6>
          <P>
            You're Only As Good As Your Last Collection, Which Is An Enormous
            Pressure. Jeans Represent Democracy In Fashion.Fashion Is About
            Dressing According To What's Fashionable.
          </P>
        </div>
      </Col>
    </Row>
  );
};

export default UserDetails;
