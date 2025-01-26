import { Container, Row } from "reactstrap";
import NavClass from "./NavClass/NavClass";
import { useDispatch } from "react-redux";
import TabClass from "./TabClass/TabClass";
import { setActiveTab } from "../../../Store/Slices/TasksSlice";

const TasksContainer = () => {
  const dispatch = useDispatch();
  const activeToggle = (tab: string) => {
    dispatch(setActiveTab(tab));
  };
  return (
    <Container fluid>
      <div className="email-wrap bookmark-wrap tasks-items">
        <Row>
          <NavClass activeToggle={activeToggle} />
          <TabClass />
        </Row>
      </div>
    </Container>
  );
};

export default TasksContainer;
