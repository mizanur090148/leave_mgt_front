import { Card, CardHeader, Col } from "reactstrap";
import ShiftsOverviewBody from "./ShiftsOverviewBody";
import { ShiftsOverviews } from "../../../../utils/Constant";
import CardHeaderDropDown from "../../../../CommonElements/CommonCardHeader/CardHeaderDropDown";
import { H4 } from "../../../../AbstractElements";

const ShiftsOverview = () => {
  return (
    <Col xl="4" md="5" className="proorder-xl-3 proorder-md-3">
      <Card className="shifts-char-box">
        <CardHeader className="card-no-border pb-0" >
          <div className="header-top"> 
            <H4>{ShiftsOverviews}</H4>
            <div className="d-flex align-items-center gap-3">
              <CardHeaderDropDown firstItem={"Address Selection"} secondItem={"Geo-Menu"} thirdItem={"Place Picker"} mainTitle={false} menuTitle={"Location"}/>
              <CardHeaderDropDown firstItem={"Weekly"} secondItem={"Monthly"} thirdItem={"Yearly"} mainTitle={true} />
            </div>
          </div>
        </CardHeader>
        <ShiftsOverviewBody />
      </Card>
    </Col>
  );
};

export default ShiftsOverview;
