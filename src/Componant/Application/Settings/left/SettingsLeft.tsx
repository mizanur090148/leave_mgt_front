import { Card, CardBody, Col, Row } from "reactstrap";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";

const PastReturnLeft = ({
  setActiveMenu,
  activeMenu,
}: {
  setActiveMenu: (type: string) => void;
  activeMenu: string;
}) => {
  return (
    <Col xl="3">
      <Card className="settings-left">
        <CardHeaderCommon
          title={"Tax Return Summary"}
          tagClass="card-title mb-0"
        />
        <CardBody>
          <Row
            className={`${activeMenu === "users" && "active"}`}
            onClick={() => setActiveMenu("users")}
          >
            <div className="title">Users</div>
          </Row>
          <Row
            className={`${activeMenu === "groups" && "active"}`}
            onClick={() => setActiveMenu("groups")}
          >
            <div className="title">Groups</div>
          </Row>
          <Row
            className={`${activeMenu === "companies" && "active"}`}
            onClick={() => setActiveMenu("companies")}
          >
            <div className="title">Companies</div>
          </Row>
          <Row
            className={`${
              activeMenu === "leaves" && "active"
            }`}
            onClick={() => setActiveMenu("leaves")}
          >
            <div className="title">Leaves</div>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default PastReturnLeft;
