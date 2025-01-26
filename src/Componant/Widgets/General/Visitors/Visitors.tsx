import { Card, CardBody, CardHeader, Col } from "reactstrap";
import { H5, SVG } from "../../../../AbstractElements";
import { Visitor } from "../../../../utils/Constant";
import CardHeaderDropDown from "../../../../CommonElements/CommonCardHeader/CardHeaderDropDown";
import VisitorChart from "./VisitorChart";

const Visitors = () => {
  return (
    <Col xxl="6" xl="4" md="12">
      <Card className="visitor-card">
        <CardHeader className="card-no-border pb-0">
          <div className="header-top">
            <H5 className="f-w-600 m-0">{Visitor}
              <span className="f-14 font-primary f-w-500 ms-1">
                <SVG className="svg-fill me-1" iconId="user-visitor" /> (+2.8)
              </span>
            </H5>
            <div className="card-header-right-icon">
              <CardHeaderDropDown mainTitle={true} firstItem="Today" secondItem="Tomorrow" thirdItem="Yesterday" />
            </div>
          </div>
        </CardHeader>
        <CardBody className="pt-3">
            <VisitorChart />
        </CardBody>
      </Card>
    </Col>
  );
};

export default Visitors;
