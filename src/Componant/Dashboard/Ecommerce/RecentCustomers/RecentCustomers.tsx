import { Card, CardBody, Col } from "reactstrap";
import CommonCardHeader from "../../../../CommonElements/CommonCardHeader/CommonCardHeader";
import { RecentCustomer } from "../../../../utils/Constant";
import RecentCustomersBody from "./RecentCustomersBody";

const RecentCustomers = () => {
  return (
    <Col xl="3" lg="5" sm="6">
      <Card>
        <CommonCardHeader headClass="card-no-border pb-0" mainTitle={true} title={RecentCustomer} firstItem="Weekly" secondItem="Monthly" thirdItem="Yearly"/>
        <CardBody className="pt-0">
          <RecentCustomersBody />
        </CardBody>
      </Card>
    </Col>
  );
};

export default RecentCustomers;
