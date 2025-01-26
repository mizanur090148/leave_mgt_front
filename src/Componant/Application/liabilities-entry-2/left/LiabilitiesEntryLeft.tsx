import { Card, CardBody, Col, Row } from "reactstrap";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";

const LiabilitiesEntryLeft = ({
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
            className={`${profileType === "institutionalLiabilities" && "active"}`}
            onClick={() => setProfileType("institutionalLiabilities")}
          >
            <div className="title">Institutional Liabilities</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>
          <Row
            className={`${profileType === "nonInstitutionalLiabilities" && "active"}`}
            onClick={() => setProfileType("nonInstitutionalLiabilities")}
          >
            <div className="title">Non Institutional Liabilities</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>
          <Row
            className={`${profileType === "otherLiabilities" && "active"}`}
            onClick={() => setProfileType("otherLiabilities")}
          >
            <div className="title">Other Liabilities</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>


        </CardBody>
      </Card>
    </Col>
  );
};

export default LiabilitiesEntryLeft;
