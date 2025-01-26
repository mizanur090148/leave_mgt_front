import { Card, Col, Nav, NavItem, NavLink, Row } from "reactstrap";
import { All, Doing, Done, Href } from "../../../../utils/Constant";
import { CheckCircle, Info, Target } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../../../../Store/Slices/ProjectSlice";
import CreateNewProject from "./CreateNewProject";

const ProjectListHead = () => {
  const { activeTab } = useSelector((state: any) => state.project);
  const dispatch = useDispatch();
  return (
    <Card>
      <Row>
        <Col md="6">
          <Nav tabs className="border-tab">
            <NavItem>
              <NavLink
                className={activeTab === "1" ? "active" : ""}
                onClick={() => dispatch(setActiveTab("1"))}
                href={Href}
              >
                <Target />
                {All}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === "2" ? "active" : ""}
                onClick={() => dispatch(setActiveTab("2"))}
                href={Href}
              >
                <Info />
                {Doing}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === "3" ? "active" : ""}
                onClick={() => dispatch(setActiveTab("3"))}
                href={Href}
              >
                {" "}
                <CheckCircle /> {Done}
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
        <CreateNewProject />
      </Row>
    </Card>
  );
};

export default ProjectListHead;
