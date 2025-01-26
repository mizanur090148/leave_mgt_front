import { Container, Row } from "reactstrap";
import { useState } from "react";
import EtinProfile from "../EtinProfile";

import CompanyProfile from "./CompanyProfile";
import CorporateProfileLeft from "./CorporateProfileLeft";
import Authorizattion from "./Authorizattion";
import ServicePlan from "./ServicePlan";
import PcProfile from "../practitioner/PcProfile";

const CorporateProfile = () => {
  const [profileType, setProfileType] = useState("companyProfile");

  return (
    <Container fluid>
      <div className="edit-profile">
        <Row className="profile">
          <CorporateProfileLeft
            profileType={profileType}
            setProfileType={setProfileType}
          />
          {profileType === "companyProfile" && <CompanyProfile />}
          {profileType === "authorization" && <Authorizattion />}
          {profileType === "servicePlan" && <ServicePlan />}
        </Row>
      </div>
    </Container>
  );
};

export default CorporateProfile;
