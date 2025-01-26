import { Card, CardBody, Col } from "reactstrap";
import CommonCardHeader from "../../../../CommonElements/CommonCardHeader/CommonCardHeader";
import { Topsellermonth } from "../../../../utils/Constant";
import TopSellerTable from "./TopSellerTable";

const TopSeller = () => {
  return (
    <Col xl="6" lg="12">
      <Card>
        <CommonCardHeader headClass="card-no-border pb-0" mainTitle={true} title={Topsellermonth} firstItem="Weekly" secondItem="Monthly" thirdItem="Yearly" subClass="top-sellers" />
        <CardBody className="pt-0 seller-month px-0">
          <TopSellerTable />
        </CardBody>
      </Card>
    </Col>
  );
};

export default TopSeller;
