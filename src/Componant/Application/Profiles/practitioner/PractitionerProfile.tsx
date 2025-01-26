
import { Container, Row } from "reactstrap";
import { useState } from "react";
import Authorizattion from "./Authorizattion";
import ServicePlan from "./ServicePlan";
import PractitionerProfileLeft from "./PractitionerProfileLeft";
import PcProfile from "./PcProfile";

const CorporateProfile = () => {
  const [profileType, setProfileType] = useState("practitionerProfile");

  return (
    <Container fluid>
      <div className="edit-profile">
        <Row className="profile">
          <PractitionerProfileLeft
            profileType={profileType}
            setProfileType={setProfileType}
          />
          {profileType === "practitionerProfile" && <PcProfile />}
          {profileType === "authorization" && <Authorizattion />}
          {profileType === "servicePlan" && <ServicePlan />}

        </Row>
      </div>
    </Container>
  );
};

export default CorporateProfile;
