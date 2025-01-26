import { Container, Row } from "reactstrap";
import { useState } from "react";
import PastReturnLeft from "../left/PastReturnLeft";
import NetAsset from "./NetAsset";
import BusinessAssets from "./BusinessAssets";
import DirectorShare from "./DirectorShare";
import NonAgricultureLand from "./NonAgricultureLand";
import AgricultureLand from "./AgricultureLand";
import FinancialAssets from "./FinancialAssets";
import MotorVehicle from "./MotorVehicle";
import Tomato from "./Tomato";
import FurnitureAndEquipment from "./FurnitureAndEquipment";
import OtherAsset from "./OtherAsset";
import AssetOutSideBD from "./AssetOutSideBD";
import CashAndFund from "./CashAndFund";
import Liabilities from "./Liabilities";
import Jewellery from "./Jewellery";
import PartnershipBusiness from "./PartnershipBusiness";

const Index = () => {
  const [profileType, setProfileType] = useState("netAsset");

  return (
    <Container fluid>
      <div className="edit-profile">
        <Row className="profile">
          <PastReturnLeft
            profileType={profileType}
            setProfileType={setProfileType}
          />
          {profileType === "netAsset" && <NetAsset />}
          {profileType === "businessAssets" && <BusinessAssets />}
          {profileType === "partnershipBusiness" && <PartnershipBusiness />}
          {profileType === "directorShare" && <DirectorShare />}
          {profileType === "nonAgricultureLand" && <NonAgricultureLand />}
          {profileType === "agricultureLand" && <AgricultureLand />}
          {profileType === "financialAssets" && <FinancialAssets />}
          {profileType === "motorVehicle" && <MotorVehicle />}
          {profileType === "tomato" && <Tomato />}
          {profileType === "jewellery" && <Jewellery />}
          {profileType === "furnitureAndEquipment" && <FurnitureAndEquipment />}
          {profileType === "otherAsset" && <OtherAsset />}
          {profileType === "assetOutSideBD" && <AssetOutSideBD />}
          {profileType === "cashAndFund" && <CashAndFund />}
          {profileType === "liabilities" && <Liabilities />}
        </Row>
      </div>
    </Container>
  );
};

export default Index;
