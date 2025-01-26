import { Card, CardBody, Col, Row } from "reactstrap";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";

const PractitionerProfileLeft = ({
  setProfileType,
  profileType,
}: {
  setProfileType: (type: string) => void;
  profileType: string;
}) => {
  return (
    <Col xl="3">
      <Card className="profile-left">
        <CardHeaderCommon title={"Profiles"} tagClass="card-title mb-0" />
        <CardBody>
          <Row
            className={`${profileType === "practitionerProfile" && "active"}`}
            onClick={() => setProfileType("practitionerProfile")}
          >
            <div className="title">Company Profile</div>
            <div className="sub-title">Modify your practitioner data</div>
          </Row>
          <Row
            className={`${profileType === "authorization" && "active"}`}
            onClick={() => setProfileType("authorization")}
          >
            <div className="title">Authorization</div>
            <div className="sub-title">Modify your authorization data</div>
          </Row>
          <Row
            className={`${profileType === "servicePlan" && "active"}`}
            onClick={() => setProfileType("servicePlan")}
          >
            <div className="title">Service Plans</div>
            <div className="sub-title">Modify your service plan data</div>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default PractitionerProfileLeft;
