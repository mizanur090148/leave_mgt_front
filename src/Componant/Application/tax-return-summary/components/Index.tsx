import { Container, Row } from "reactstrap";
import { useState } from "react";
import TaxReturnSummaryLeft from "../left/TaxReturnSummaryLeft";
import TaxReturnSummary from "./TaxReturnSummary";
import PrintTaxSummary from "./PrintTaxSummary";




const Index = () => {
  const [profileType, setProfileType] = useState("taxReturnSummary");

  return (
    <Container fluid>
      <div className="edit-profile">
        <Row className="profile">
          <TaxReturnSummaryLeft
            profileType={profileType}
            setProfileType={setProfileType}
          />
          {profileType === "taxReturnSummary" && <TaxReturnSummary />}
          {profileType === "printReturnSummary" && <PrintTaxSummary />}


        </Row>
      </div>
    </Container>
  );
};

export default Index;
