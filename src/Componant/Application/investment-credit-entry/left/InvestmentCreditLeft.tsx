import { Card, CardBody, Col, Row } from "reactstrap";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";

const InvestmentCreditLeft = ({
  setProfileType,
  profileType,
}: {
  setProfileType: (type: string) => void;
  profileType: string;
}) => {
  return (
    <Col xl="3">
      <Card className="profile-left">
        <CardHeaderCommon title={"Investment Credit"} tagClass="card-title mb-0" />
        <CardBody>
          <Row
            className={`${profileType === "savingsPlan" && "active"}`}
            onClick={() => setProfileType("savingsPlan")}
          >
            <div className="title">Savings Plan</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>
          <Row
            className={`${profileType === "govSecurities" && "active"}`}
            onClick={() => setProfileType("govSecurities")}
          >
            <div className="title">Gov. Securities</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>
          <Row
            className={`${profileType === "listedSecurities" && "active"}`}
            onClick={() => setProfileType("listedSecurities")}
          >
            <div className="title">Listed Securities</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>
          <Row
            className={`${profileType === "retirementPlan" && "active"}`}
            onClick={() => setProfileType("retirementPlan")}
          >
            <div className="title">Retirement Plans</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>
          <Row
            className={`${profileType === "otherInvestment" && "active"}`}
            onClick={() => setProfileType("otherInvestment")}
          >
            <div className="title">Other Investment</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>


        </CardBody>
      </Card>
    </Col>
  );
};

export default InvestmentCreditLeft;
