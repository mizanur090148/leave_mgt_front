import { useState } from 'react'
import { Col } from 'reactstrap'
import { Btn } from '../../../../AbstractElements'
import { Href, TaskFilter } from '../../../../utils/Constant'
import { TasksPropsTypes } from '../../../../Types/Application/Tasks'
import ViewsLeftSidebar from './ViewsLeftSidebar'

const NavClass = ({ activeToggle}: TasksPropsTypes) => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  return (
    <Col xl="3" className="box-col-3">
      <div className="md-sidebar">
        <Btn
          color="primary"
          className="md-sidebar-toggle"
          onClick={() => setSideBarOpen(!sideBarOpen)}
        >
          {TaskFilter}
        </Btn>
        <div
          className={`md-sidebar-aside job-left-aside custom-scrollbar ${
            sideBarOpen ? "open" : ""
          }`}
        >
          <div className="email-left-aside">
            <ViewsLeftSidebar activeToggle={activeToggle} />
          </div>
        </div>
      </div>
    </Col>
  )
}

export default NavClass