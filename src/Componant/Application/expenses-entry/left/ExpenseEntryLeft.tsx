import { Card, CardBody, Col, Row } from "reactstrap";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";

const ExpenseEntryLeft = ({
  setProfileType,
  profileType,
}: {
  setProfileType: (type: string) => void;
  profileType: string;
}) => {
  return (
    <Col xl="3">
      <Card className="profile-left">
        <CardHeaderCommon title={"Expenses Entry"} tagClass="card-title mb-0" />
        <CardBody>
          <Row
            className={`${profileType === "selfFamilyExpense" && "active"}`}
            onClick={() => setProfileType("selfFamilyExpense")}
          >
            <div className="title">Self & Family Expenses</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>
          <Row
              className={`${profileType === "housingExpense" && "active"}`}
              onClick={() => setProfileType("housingExpense")}
          >
            <div className="title">Housing Expenses</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>
          <Row
              className={`${profileType === "transportExpense" && "active"}`}
              onClick={() => setProfileType("transportExpense")}
          >
            <div className="title">Transport Expenses</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>
          <Row
              className={`${profileType === "utilityExpense" && "active"}`}
              onClick={() => setProfileType("utilityExpense")}
          >
            <div className="title">Utility Expenses</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>
          <Row
              className={`${profileType === "educationExpense" && "active"}`}
              onClick={() => setProfileType("educationExpense")}
          >
            <div className="title">Education Expense</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>
          <Row
              className={`${profileType === "vacationFestivalExpense" && "active"}`}
              onClick={() => setProfileType("vacationFestivalExpense")}
          >
            <div className="title">Vacation & Festival Expenses</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>
          <Row
              className={`${profileType === "financeExpense" && "active"}`}
              onClick={() => setProfileType("financeExpense")}
          >
            <div className="title">Financial Expenses</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>
          <Row
              className={`${profileType === "taxPaidRefund" && "active"}`}
              onClick={() => setProfileType("taxPaidRefund")}
          >
            <div className="title">Tax Paid/Refund</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>


        </CardBody>
      </Card>
    </Col>
  );
};

export default ExpenseEntryLeft;
