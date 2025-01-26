import { Card, CardBody, Col, Row } from "reactstrap";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";

const TaxReturnSummaryLeft = ({
  setProfileType,
  profileType,
}: {
  setProfileType: (type: string) => void;
  profileType: string;
}) => {
  return (
    <Col xl="3">
      <Card className="profile-left">
        <CardHeaderCommon title={"Tax Return Summary"} tagClass="card-title mb-0" />
        <CardBody>
          <Row
            className={`${profileType === "taxReturnSummary" && "active"}`}
            onClick={() => setProfileType("taxReturnSummary")}
          >
            <div className="title">Tax Return Summary</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>
          <Row
            className={`${profileType === "printReturnSummary" && "active"}`}
            onClick={() => setProfileType("printReturnSummary")}
          >
            <div className="title">Print Return Summary</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>


        </CardBody>
      </Card>
    </Col>
  );
};

export default TaxReturnSummaryLeft;
