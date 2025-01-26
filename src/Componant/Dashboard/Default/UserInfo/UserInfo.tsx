import { Card, CardBody, Col } from "reactstrap";
import { H1, P } from "../../../../AbstractElements";
import { Link } from "react-router-dom";
import { GoPremium } from "../../../../utils/Constant";

const UserInfo = () => {
  return (
    <Col xl="5" md="6" className="proorder-xl-1 proorder-md-1">
      <Card className="profile-greeting p-0">
        <CardBody>
          <div className="img-overlay">
            <H1>{"Good day, Lena Miller"}</H1>
            <P>
              {"Welcome to the Mofi family! We are delighted that you have visited our dashboard."}
            </P>
            <Link className="btn" to={`${process.env.PUBLIC_URL}/dashboard/default`}>
              {GoPremium}
            </Link>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default UserInfo;
