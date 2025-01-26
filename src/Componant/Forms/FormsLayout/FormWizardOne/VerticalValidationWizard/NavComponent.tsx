import { Nav, NavItem, NavLink } from "reactstrap";
import { verticalWizardTabData } from "../../../../../Data/Forms/FormsLayout/FormWizardOne/FormWizardOne";
import { H6, P } from "../../../../../AbstractElements";
import { VerticalFormPropsType } from "../../../../../Types/Forms/FormsLayout/FormWizardOne";

const NavComponent: React.FC<VerticalFormPropsType> = ({
  callbackActive,
  activeTab,
}) => {
  return (
    <Nav className="flex-column header-vertical-wizard">
      {verticalWizardTabData.map((data: any, index: any) => (
        <NavItem key={index}>
          <NavLink
            className={activeTab === index + 1 ? "active" : ""}
            onClick={() => {
              callbackActive(index + 1);
            }}
          >
            <div className="vertical-wizard">
              <div className="stroke-icon-wizard">
                <i className={`fa ${data.iconClassName}`} />
              </div>
              <div className="vertical-wizard-content">
                <H6>{data.tittle}</H6>
                <P>{data.tittleInforMation}</P>
              </div>
            </div>
          </NavLink>
        </NavItem>
      ))}
    </Nav>
  );
};

export default NavComponent;
