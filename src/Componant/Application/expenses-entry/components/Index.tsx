import { Container, Row } from "reactstrap";
import { useState } from "react";
import ExpenseEntryLeft from "../left/ExpenseEntryLeft";
import SelfFamilyExpense from "./SelfFamilyExpense";
import HousingExpense from "./HousingExpense";
import TransportExpense from "./TransportExpense";
import UtilityExpense from "./UtilityExpense";
import EducationExpense from "./EducationExpense";
import VacationFestivalExpense from "./VacationFestivalExpense";
import FinanceExpense from "./FinanceExpense";
import TaxPaidRefund from "./TaxPaidRefund";



const Index = () => {
  const [profileType, setProfileType] = useState("selfFamilyExpense");

  return (
    <Container fluid>
      <div className="edit-profile">
        <Row className="profile">
          <ExpenseEntryLeft
            profileType={profileType}
            setProfileType={setProfileType}
          />
          {profileType === "selfFamilyExpense" && <SelfFamilyExpense />}
          {profileType === "housingExpense" && <HousingExpense />}
          {profileType === "transportExpense" && <TransportExpense />}
          {profileType === "utilityExpense" && <UtilityExpense />}
          {profileType === "educationExpense" && <EducationExpense />}
          {profileType === "vacationFestivalExpense" && <VacationFestivalExpense />}
          {profileType === "financeExpense" && <FinanceExpense />}
          {profileType === "taxPaidRefund" && <TaxPaidRefund />}

        </Row>
      </div>
    </Container>
  );
};

export default Index;
