import { Container, Row } from "reactstrap";
import { useState } from "react";
import IncomeEntryLeft from "../left/AssetsEntryLeft";
import BusinessAsset from "./BusinessAsset";
import AssetsEntryLeft from "../left/AssetsEntryLeft";
import PartnerShipBusiness from "./PartnerShipBusiness";
import DirectorShare from "./DirectorShare";
import NonAgriculturalLand from "./NonAgriculturalLand";
import AgriculturalLand from "./AgriculturalLand";
import FinancialAssets from "./FinancialAssets";
import MotorVehicle from "./MotorVehicle";
import Jewellery from "./Jewellery";
import FurnitureAndEquipment from "./FurnitureAndEquipment";
import OtherAsset from "./OtherAsset";
import AssetOutSideBD from "./AssetOutSideBD";
import CashAndFund from "./CashAndFund";


const Index = () => {
  const [profileType, setProfileType] = useState("businessAsset");

  return (
    <Container fluid>
      <div className="edit-profile">
        <Row className="profile">
          <AssetsEntryLeft
            profileType={profileType}
            setProfileType={setProfileType}
          />
          {profileType === "businessAsset" && <BusinessAsset />}
          {profileType === "partnerShipBusiness" && <PartnerShipBusiness />}
          {profileType === "directorShare" && <DirectorShare />}
          {profileType === "nonAgriculturalLand" && <NonAgriculturalLand />}
          {profileType === "agriculturalLand" && <AgriculturalLand />}
          {profileType === "financialAssets" && <FinancialAssets />}
          {profileType === "motorVehicle" && <MotorVehicle />}
          {profileType === "jewellery" && <Jewellery />}
          {profileType === "furnitureAndEquipment" && <FurnitureAndEquipment />}
          {profileType === "otherAsset" && <OtherAsset />}
          {profileType === "assetOutSideBD" && <AssetOutSideBD />}
          {profileType === "cashAndFund" && <CashAndFund />}
        </Row>
      </div>
    </Container>
  );
};

export default Index;
