import { Container, Row } from "reactstrap";
import PersonalProfile from "./PersonalProfile";
import { useState } from "react";
import ContactProfile from "./ContactProfile";
import EtinProfile from "./EtinProfile";
import ProfileLeft from "./ProfileLeft";

const Index = () => {
  const [profileType, setProfileType] = useState("personal");
  const handleProfile = () => {};

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
        </Row>
      </div>
    </Container>
  );
};

export default Index;
