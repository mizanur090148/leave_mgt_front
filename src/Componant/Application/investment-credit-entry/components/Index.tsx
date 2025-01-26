import { Container, Row } from "reactstrap";
import { useState } from "react";
import InvestmentCreditLeft from "../left/InvestmentCreditLeft";
import SavingsPlan from "./SavingsPlan";
import GovSecurities from "./GovSecurities";
import ListedSecurities from "./ListedSecurities";
import RetirementPlan from "./RetirementPlan";
import OtherInvestment from "./OtherInvestment";


const Index = () => {
  const [profileType, setProfileType] = useState("savingsPlan");

  return (
    <Container fluid>
      <div className="edit-profile">
        <Row className="profile">
          <InvestmentCreditLeft
            profileType={profileType}
            setProfileType={setProfileType}
          />
          {profileType === "savingsPlan" && <SavingsPlan />}
          {profileType === "govSecurities" && <GovSecurities />}
          {profileType === "listedSecurities" && <ListedSecurities />}
          {profileType === "retirementPlan" && <RetirementPlan />}
          {profileType === "otherInvestment" && <OtherInvestment />}
        </Row>
      </div>
    </Container>
  );
};

export default Index;
