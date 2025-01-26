import { Nav, NavItem, NavLink } from "reactstrap";
import { BusinessFormCommonProps } from "../../../../../Types/Forms/FormsLayout/FormsWizardTwo/FormsWizardTwo";
import { customHorizontalData } from "../../../../../Data/Forms/FormsLayout/FormsWizardTwo/FormsWizardTwo";
import { H6 } from "../../../../../AbstractElements";

const NavComponent: React.FC<BusinessFormCommonProps> = ({
  callbackActive,
  activeTab,
}) => {
  const handleTab = (id: number | undefined) => {
    if (id !== undefined) {
      callbackActive(id);
    }
  };
  return (
    <Nav
      className="nav-pills horizontal-options shipping-options"
      id="horizontal-wizard-tab"
    >
      {customHorizontalData.map((data: any, index: any) => (
        <NavItem key={index}>
          <NavLink
            className={`${activeTab === index + 1 ? "active" : ""}`}
            onClick={() => handleTab(data.activeTab)}
          >
            <div className="horizontal-wizard">
              <div className="stroke-icon-wizard">
                <i className={`fa ${data.iconName}`} />
              </div>
              <div className="horizontal-wizard-content">
                <H6>{data.tittle}</H6>
              </div>
            </div>
          </NavLink>
        </NavItem>
      ))}
    </Nav>
  );
};

export default NavComponent;
