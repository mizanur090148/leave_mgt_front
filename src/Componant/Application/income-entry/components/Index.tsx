import { Container, Row } from "reactstrap";
import { useState } from "react";
import IncomeEntryLeft from "../left/IncomeEntryLeft";
import SalaryIncome from "./SalaryIncome";
import RentalIncome from "./RentalIncome";
import AgricultureIncome from "./AgricultureIncome";
import BusinessIncome from "./BusinessIncome";
import CapitalGain from "./CapitalGain";
import FinancialAssetIncome from "./FinancialAssetIncome";
import PartnerShipFirmIncome from "./PartnerShipFirmIncome";
import IncomeFromMinorSpouse from "./IncomeFromMinorSpouse";
import ForeignIncome from "./ForeignIncome";
import OtherSourcesOfIncome from "./OtherSourcesOfIncome";
import GiftReward from "./GiftReward";

const Index = () => {
  const [profileType, setProfileType] = useState("salaryIncome");

  return (
    <Container fluid>
      <div className="edit-profile">
        <Row className="profile">
          <IncomeEntryLeft
            profileType={profileType}
            setProfileType={setProfileType}
          />
          {profileType === "salaryIncome" && <SalaryIncome />}
          {profileType === "rentalIncome" && <RentalIncome />}
          {profileType === "agricultureIncome" && <AgricultureIncome />}
          {profileType === "businessIncome" && <BusinessIncome />}
          {profileType === "capitalGain" && <CapitalGain />}
          {profileType === "financialAssetIncome" && <FinancialAssetIncome />}
          {profileType === "partnershipFirmIncome" && <PartnerShipFirmIncome />}
          {profileType === "incomeFromMinorSpouse" && <IncomeFromMinorSpouse />}
          {profileType === "foreignIncome" && <ForeignIncome />}
          {profileType === "otherSourceOfIncome" && <OtherSourcesOfIncome />}
          {profileType === "giftReward" && <GiftReward />}


        </Row>
      </div>
    </Container>
  );
};

export default Index;
