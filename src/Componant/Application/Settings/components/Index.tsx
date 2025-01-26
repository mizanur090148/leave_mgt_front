import { Container, Row } from "reactstrap";
import { useState } from "react";
import SettingsLeft from "../left/SettingsLeft";
import List from "./List";

const Index = () => {
  const [activeMenu, setActiveMenu] = useState("vehicle");

  return (
    <Container fluid>
      <div className="edit-profile">
        <Row className="settings">
          <SettingsLeft activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
          {activeMenu === "vehicle" && <List type="vehicle" />}
          {activeMenu === "capacity" && <List type="capacity" />}
          {activeMenu === "non-agriculture-property" && (
            <List type="non-agriculture-property" />
          )}
          {activeMenu === "agriculture-property" && (
            <List type="agriculture-property" />
          )}
          {activeMenu === "jewellery" && <List type="jewellery" />}
          {activeMenu === "furniture" && <List type="furniture" />}
          {activeMenu === "location" && <List type="location" />}
          {activeMenu === "region" && <List type="region" />}
          {activeMenu === "circle" && <List type="circle" />}
          {activeMenu === "zone" && <List type="zone" />}
          {activeMenu === "assessment-year" && <List type="assessment-year" />}
          {activeMenu === "income-year" && <List type="income-year" />}
          {activeMenu === "tax-payer-location" && (
            <List type="tax-payer-location" />
          )}
          {activeMenu === "country" && <List type="country" />}
        </Row>
      </div>
    </Container>
  );
};

export default Index;
