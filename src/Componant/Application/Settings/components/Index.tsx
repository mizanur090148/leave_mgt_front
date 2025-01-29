import { Container, Row } from "reactstrap";
import { useState } from "react";
import SettingsLeft from "../left/SettingsLeft";
import List from "./List";
import Leaves from "./Leaves";
import CompanyLeaves from "./CompanyLeaves";

const Index = () => {
  const [activeMenu, setActiveMenu] = useState("groups");

  return (
    <Container fluid>
      <div className="edit-profile">
        <Row className="settings">
          <SettingsLeft activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
          {activeMenu === "users" && <List type="users" />}
          {activeMenu === "groups" && <List type="groups" />}
          {activeMenu === "companies" && <List type="companies" />}
          {activeMenu === "leaves" && (
            <Leaves />
          )}
           {activeMenu === "companyLeaves" && (
            <CompanyLeaves />
          )}
        </Row>
      </div>
    </Container>
  );
};

export default Index;
