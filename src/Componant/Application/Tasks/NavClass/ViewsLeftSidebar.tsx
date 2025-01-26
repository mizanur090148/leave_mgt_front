import { Card, CardBody, Nav, NavItem } from "reactstrap";
import { Href, Views } from "../../../../utils/Constant";
import { taskData } from "../../../../Data/Application/Tasks/Tasks";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { TasksPropsTypes } from "../../../../Types/Application/Tasks";
import HeaderProfile from "./HeaderProfile";
import NewTaskClass from "./NewTaskClass";
import TagsLeftSidebar from "./TagsLeftSidebar";

const ViewsLeftSidebar = ({ activeToggle }: TasksPropsTypes) => {
  const { activeTab } = useSelector((state: any) => state.tasks);
  return (
    <Card>
      <CardBody>
        <div className="email-app-sidebar left-bookmark task-sidebar">
          <HeaderProfile />
          <Nav className="main-menu">
            <NavItem>
              <NewTaskClass />
            </NavItem>
            <NavItem>
              <span className="main-title">{Views}</span>
            </NavItem>
            {taskData.map((item: any) => (
              <NavItem key={item.id}>
                <Link
                  to={Href}
                  className={activeTab === item.activeTab ? "active" : ""}
                  onClick={() => {
                    activeToggle(item.activeTab);
                  }}
                >
                  <span className="title"> {item.title}</span>
                </Link>
              </NavItem>
            ))}
            <NavItem>
              <hr />
            </NavItem>
            <TagsLeftSidebar
              activeTab={activeTab}
              activeToggle={activeToggle}
            />
          </Nav>
        </div>
      </CardBody>
    </Card>
  );
};

export default ViewsLeftSidebar;
