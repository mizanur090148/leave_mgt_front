import { Card, CardBody, Col, Row } from "reactstrap";
import CardHeaderCommon from "../../../CommonElements/CardHeaderCommon/CardHeaderCommon";

const ProfileLeft = ({
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
            className={`${profileType === "personal" && "active"}`}
            onClick={() => setProfileType("personal")}
          >
            <div className="title">Personal Profile</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>
          <Row
            className={`${profileType === "contact" && "active"}`}
            onClick={() => setProfileType("contact")}
          >
            <div className="title">Contact Profile</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>
          <Row
            className={`${profileType === "etin" && "active"}`}
            onClick={() => setProfileType("etin")}
          >
            <div className="title">ETIN Profile</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>
          <Row
            className={`${profileType === "family" && "active"}`}
            onClick={() => setProfileType("family")}
          >
            <div className="title">Family Profile</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>
          <Row
            className={`${profileType === "employment" && "active"}`}
            onClick={() => setProfileType("employment")}
          >
            <div className="title">Employment Profile</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ProfileLeft;
