import { Container, Row } from "reactstrap";
import { useState } from "react";
import ClientLeft from "../left/ClientLeft";
import List from "./List";

const Index = () => {
  const [activeMenu, setActiveMenu] = useState("client");

  return (
    <Container fluid>
      <div className="edit-profile">
        <Row className="settings">
          <ClientLeft activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
          {activeMenu === "client" && <List type="client" />}
        </Row>
      </div>
    </Container>
  );
};

export default Index;
