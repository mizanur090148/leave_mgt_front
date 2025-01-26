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
          title={"My Clients"}
          tagClass="card-title mb-0"
        />
        <CardBody>
          <Row
            className={`${activeMenu === "client" && "active"}`}
            onClick={() => setActiveMenu("client")}
          >
            <div className="title">Clients</div>
          </Row>

        </CardBody>
      </Card>
    </Col>
  );
};

export default PastReturnLeft;
