import { Container, Row } from "reactstrap";
import { useState } from "react";
import IncomeEntryLeft from "../left/LiabilitiesEntryLeft";
import LiabilitiesEntryLeft from "../left/LiabilitiesEntryLeft";
import InstitutionalLiabilities from "./InstitutionalLiabilities";
import NonInstitutionalLiabilities from "./NonInstitutionalLiabilities";
import OtherLiabilities from "./OtherLiabilities";



const Index = () => {
  const [profileType, setProfileType] = useState("institutionalLiabilities");

  return (
    <Container fluid>
      <div className="edit-profile">
        <Row className="profile">
          <LiabilitiesEntryLeft
            profileType={profileType}
            setProfileType={setProfileType}
          />
          {profileType === "institutionalLiabilities" && <InstitutionalLiabilities />}
          {profileType === "nonInstitutionalLiabilities" && <NonInstitutionalLiabilities />}
          {profileType === "otherLiabilities" && <OtherLiabilities />}
        </Row>
      </div>
    </Container>
  );
};

export default Index;
