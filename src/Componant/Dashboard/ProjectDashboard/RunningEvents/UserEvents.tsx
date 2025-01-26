import { Link } from "react-router-dom";
import { Col } from "reactstrap";
import { Href } from "../../../../utils/Constant";
import { H5, P } from "../../../../AbstractElements";
import UserPlans from "./UserPlans";
import CustomersSocial from "./CustomersSocial";

const UserEvents = () => {
  return (
    <Col xs="6">
      <div className="running-box">
        <div className="d-flex align-items-center justify-content-between gap-2">
          <div className="flex-grow-1">
            <Link to={Href}>
              <H5>{"Brooklyn Simmons"}</H5>
            </Link>
            <P>{"Web Manager"} </P>
          </div>
          <CustomersSocial />
        </div>
        <P>
          {"With Asana, you can bring your teams, work, and apps from everywhere in one tool. Workflows can be modified."}
        </P>
        <UserPlans />
      </div>
    </Col>
  );
};

export default UserEvents;
