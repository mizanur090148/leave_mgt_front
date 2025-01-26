import { Container, Row } from "reactstrap";
import EditMyProfile from "./EditMyProfile/EditMyProfile";
import PersonalProfile from "./EditProfileForm/PersonalProfile";
import { useState } from "react";
import ContactProfile from "../ContactProfile";

const EditProfileContainer = () => {
  const [profileType, setProfileType] = useState("personal");
  const handleProfile = () => {};

  return (
    <Container fluid>
      <div className="edit-profile">
        <Row className="profile">
          <EditMyProfile
            profileType={profileType}
            setProfileType={setProfileType}
          />
          {profileType === "personal" && <PersonalProfile />}
          {profileType === "contact" && <ContactProfile />}
        </Row>
      </div>
    </Container>
  );
};

export default EditProfileContainer;
