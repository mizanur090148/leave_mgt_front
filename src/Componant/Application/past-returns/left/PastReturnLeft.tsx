import { Card, CardBody, Col, Row } from "reactstrap";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";

const PastReturnLeft = ({
  setProfileType,
  profileType,
}: {
  setProfileType: (type: string) => void;
  profileType: string;
}) => {
  return (
    <Col xl="3">
      <Card className="profile-left">
        <CardHeaderCommon
          title={"Tax Return Summary"}
          tagClass="card-title mb-0"
        />
        <CardBody>
          <Row
            className={`${profileType === "netAsset" && "active"}`}
            onClick={() => setProfileType("netAsset")}
          >
            <div className="title">Net Assets As Per Last Return</div>
          </Row>
          <Row
            className={`${profileType === "businessAssets" && "active"}`}
            onClick={() => setProfileType("businessAssets")}
          >
            <div className="title title-green">Business Assets</div>
          </Row>
          <Row
            className={`${profileType === "partnershipBusiness" && "active"}`}
            onClick={() => setProfileType("partnershipBusiness")}
          >
            <div className="title">Partnership Business</div>
          </Row>
          <Row
            className={`${profileType === "directorShare" && "active"}`}
            onClick={() => setProfileType("directorShare")}
          >
            <div className="title">Director Share In Limited Company</div>
          </Row>
          <Row
            className={`${profileType === "nonAgricultureLand" && "active"}`}
            onClick={() => setProfileType("nonAgricultureLand")}
          >
            <div className="title title-green">Non-Agriculture Land</div>
          </Row>
          <Row
            className={`${profileType === "agricultureLand" && "active"}`}
            onClick={() => setProfileType("agricultureLand")}
          >
            <div className="title title-green">Agriculture Land</div>
          </Row>
          <Row
            className={`${profileType === "financialAssets" && "active"}`}
            onClick={() => setProfileType("financialAssets")}
          >
            <div className="title">Financial Assets</div>
          </Row>
          <Row
            className={`${profileType === "motorVehicle" && "active"}`}
            onClick={() => setProfileType("motorVehicle")}
          >
            <div className="title title-green">Motor Vehicles</div>
          </Row>
          <Row
            className={`${profileType === "jewellery" && "active"}`}
            onClick={() => setProfileType("jewellery")}
          >
            <div className="title title-green">Jewellery</div>
          </Row>
          {/* <Row
            className={`${profileType === "tomato" && "active"}`}
            onClick={() => setProfileType("tomato")}
          >
            <div className="title">Tomato</div>
          </Row> */}
          <Row
            className={`${profileType === "furnitureAndEquipment" && "active"}`}
            onClick={() => setProfileType("furnitureAndEquipment")}
          >
            <div className="title title-green">Furniture & Equipment</div>
          </Row>
          <Row
            className={`${profileType === "otherAsset" && "active"}`}
            onClick={() => setProfileType("otherAsset")}
          >
            <div className="title">Other Asset</div>
          </Row>
          <Row
            className={`${profileType === "assetOutSideBD" && "active"}`}
            onClick={() => setProfileType("assetOutSideBD")}
          >
            <div className="title">Asset Outside BD</div>
          </Row>
          <Row
            className={`${profileType === "cashAndFund" && "active"}`}
            onClick={() => setProfileType("cashAndFund")}
          >
            <div className="title title-green">Cash And Fund</div>
          </Row>
          <Row
            className={`${profileType === "liabilities" && "active"}`}
            onClick={() => setProfileType("liabilities")}
          >
            <div className="title">Liabilities</div>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default PastReturnLeft;
