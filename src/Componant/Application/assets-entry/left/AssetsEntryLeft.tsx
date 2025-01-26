import { Card, CardBody, Col, Row } from "reactstrap";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";

const AssetsEntryLeft = ({
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
            className={`${profileType === "businessAsset" && "active"}`}
            onClick={() => setProfileType("businessAsset")}
          >
            <div className="title">Business Assets</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>
          <Row
            className={`${profileType === "partnerShipBusiness" && "active"}`}
            onClick={() => setProfileType("partnerShipBusiness")}
          >
            <div className="title">PartnerShip Business</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>
          <Row
            className={`${profileType === "directorShare" && "active"}`}
            onClick={() => setProfileType("directorShare")}
          >
            <div className="title">Director Share In Limited Company</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>
          <Row
            className={`${profileType === "nonAgriculturalLand" && "active"}`}
            onClick={() => setProfileType("nonAgriculturalLand")}
          >
            <div className="title">Non-Agricultural Land</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>
          <Row
            className={`${profileType === "agriculturalLand" && "active"}`}
            onClick={() => setProfileType("agriculturalLand")}
          >
            <div className="title">Agricultural Land</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>
          <Row
            className={`${profileType === "financialAssets" && "active"}`}
            onClick={() => setProfileType("financialAssets")}
          >
            <div className="title">Financial Assets</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>
          <Row
            className={`${profileType === "motorVehicle" && "active"}`}
            onClick={() => setProfileType("motorVehicle")}
          >
            <div className="title">Motor Vehicles</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>
          <Row
            className={`${profileType === "jewellery" && "active"}`}
            onClick={() => setProfileType("jewellery")}
          >
            <div className="title">Jewellery</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>
          <Row
            className={`${profileType === "furnitureAndEquipment" && "active"}`}
            onClick={() => setProfileType("furnitureAndEquipment")}
          >
            <div className="title">Furniture And Equipment</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>
          <Row
            className={`${profileType === "otherAsset" && "active"}`}
            onClick={() => setProfileType("otherAsset")}
          >
            <div className="title">Other Assets</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>
          <Row
            className={`${profileType === "assetOutSideBD" && "active"}`}
            onClick={() => setProfileType("assetOutSideBD")}
          >
            <div className="title"> Assets OutSide BD</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>
          <Row
            className={`${profileType === "cashAndFund" && "active"}`}
            onClick={() => setProfileType("cashAndFund")}
          >
            <div className="title"> Cash & Fund</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>


        </CardBody>
      </Card>
    </Col>
  );
};

export default AssetsEntryLeft;
