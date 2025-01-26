import { Container, Row } from "reactstrap";
import PersonalProfile from "./PersonalProfile";
import { useState } from "react";
import ContactProfile from "./ContactProfile";
import EtinProfile from "./EtinProfile";
import ProfileLeft from "./ProfileLeft";
import FamilyProfile from "./FamilyProfile";
import EmploymentProfile from "./EmploymentProfile";

const Index = () => {
  const [profileType, setProfileType] = useState("personal");

  return (
    <Container fluid>
      <div className="edit-profile">
        <Row className="profile">
          <ProfileLeft
            profileType={profileType}
            setProfileType={setProfileType}
          />
          {profileType === "personal" && <PersonalProfile />}
          {profileType === "contact" && <ContactProfile />}
          {profileType === "etin" && <EtinProfile />}
          {profileType === "family" && <FamilyProfile />}
          {profileType === "employment" && <EmploymentProfile />}
        </Row>
      </div>
    </Container>
  );
};

export default Index;
