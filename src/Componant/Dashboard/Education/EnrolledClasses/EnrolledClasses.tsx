import { Card, CardBody, Col } from "reactstrap";
import CommonCardHeader from "../../../../CommonElements/CommonCardHeader/CommonCardHeader";
import { EnrolledClass } from "../../../../utils/Constant";
import EnrolledClassesBody from "./EnrolledClassesBody";

const EnrolledClasses = () => {
  return (
    <Col xxl="3" xl="5" md="6" className="box-col-5 proorder-md-6">
      <Card>
        <CommonCardHeader headClass="card-no-border pb-0" mainTitle={true} title={EnrolledClass} firstItem="Weekly" secondItem="Monthly" thirdItem="Yearly" />
        <CardBody className="pt-0 pb-1">
          <EnrolledClassesBody />
        </CardBody>
      </Card>
    </Col>
  );
};

export default EnrolledClasses;
