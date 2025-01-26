import { Card, CardBody, Col, Row } from "reactstrap";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";

const IncomeEntryLeft = ({
  setProfileType,
  profileType,
}: {
  setProfileType: (type: string) => void;
  profileType: string;
}) => {
  return (
    <Col xl="3">
      <Card className="profile-left">
        <CardHeaderCommon title={"Income Entry"} tagClass="card-title mb-0" />
        <CardBody>
          <Row
            className={`${profileType === "salaryIncome" && "active"}`}
            onClick={() => setProfileType("salaryIncome")}
          >
            <div className="title title-green">Salary Income</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>
          <Row
            className={`${profileType === "rentalIncome" && "active"}`}
            onClick={() => setProfileType("rentalIncome")}
          >
            <div className="title">Rental Income</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>
          <Row
            className={`${profileType === "agricultureIncome" && "active"}`}
            onClick={() => setProfileType("agricultureIncome")}
          >
            <div className="title">Agricultural Income</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>
          <Row
            className={`${profileType === "businessIncome" && "active"}`}
            onClick={() => setProfileType("businessIncome")}
          >
            <div className="title">Business Income</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>
          <Row
            className={`${profileType === "capitalGain" && "active"}`}
            onClick={() => setProfileType("capitalGain")}
          >
            <div className="title">Capital Gain</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>

          <Row
            className={`${profileType === "financialAssetIncome" && "active"}`}
            onClick={() => setProfileType("financialAssetIncome")}
          >
            <div className="title title-green">Financial Assets Income</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>

          <Row
            className={`${profileType === "partnershipFirmIncome" && "active"}`}
            onClick={() => setProfileType("partnershipFirmIncome")}
          >
            <div className="title">PartnerShip Firm Income</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>

          <Row
            className={`${profileType === "incomeFromMinorSpouse" && "active"}`}
            onClick={() => setProfileType("incomeFromMinorSpouse")}
          >
            <div className="title">Income From Minor/Spouse</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>
          <Row
            className={`${profileType === "foreignIncome" && "active"}`}
            onClick={() => setProfileType("foreignIncome")}
          >
            <div className="title">Foreign Income</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>
          <Row
            className={`${profileType === "otherSourceOfIncome" && "active"}`}
            onClick={() => setProfileType("otherSourceOfIncome")}
          >
            <div className="title title-green">Other Sources Of Income</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>

          <Row
            className={`${profileType === "giftReward" && "active"}`}
            onClick={() => setProfileType("giftReward")}
          >
            <div className="title">Gift/Reward</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default IncomeEntryLeft;
