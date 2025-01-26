import { useState } from "react";
import { NavOrgPropType } from "../../../../../Types/Application/Contacts";
import { organizationList } from "../../../../../Data/Application/Contacts/Contacts";
import { Col, Nav, NavItem, NavLink } from "reactstrap";
import { Href } from "../../../../../utils/Constant";
import { H6, Image, P } from "../../../../../AbstractElements";
import { dynamicImage } from "../../../../../Service";

const NavOrganization = ({ callback }: NavOrgPropType) => {
  const [organizationTab, setOrganizationTab] = useState("1");
  const handleTabs = (tab: string) => {
    setOrganizationTab(tab);
    callback(tab);
  };
  return (
    <Col xl="4" md="5" className="xl-50">
      <Nav pills className="flex-column">
        {organizationList.map((item: any) => (
          <NavItem id="myTab" key={item.id}>
            <NavLink
              href={Href}
              className={organizationTab === item.activeTab ? "active" : ""}
              onClick={() => handleTabs(item.activeTab)}
            >
              <div className="d-flex">
                <Image
                  className="p-0 img-50 img-fluid m-r-20 rounded-circle"
                  src={dynamicImage(`${item.image}`)}
                  alt="Image"
                />
                <div className="flex-grow-1">
                  <H6>{item.name}</H6>
                  <P>{item.email}</P>
                </div>
              </div>
            </NavLink>
          </NavItem>
        ))}
      </Nav>
    </Col>
  );
};

export default NavOrganization;
