import { Card, CardBody, Col } from "reactstrap";
import CommonCardHeader from "../../../../CommonElements/CommonCardHeader/CommonCardHeader";
import { UserContinent } from "../../../../utils/Constant";
import UserByContinentBody from "./UserByContinentBody";

const UserByContinent = () => {
  return (
    <Col xl="6" lg="7" sm="12">
      <Card className="overflow-hidden">
        <CommonCardHeader headClass="card-no-border pb-0" title={UserContinent} mainTitle={true} firstItem="Weekly" secondItem="Monthly" thirdItem="Yearly"  />
        <CardBody className="user-continent pb-0">
          <UserByContinentBody />
        </CardBody>
      </Card>
    </Col>
  );
};

export default UserByContinent;
