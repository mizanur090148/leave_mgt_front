import { Card, CardBody, Col } from "reactstrap";
import CommonCardHeader from "../../../../CommonElements/CommonCardHeader/CommonCardHeader";
import { RevenueByCategorys } from "../../../../utils/Constant";
import ReactApexChart from "react-apexcharts";
import { revenueChartData } from "../../../../Data/Dashboard/DefaultChartData";

const RevenueByCategory = () => {
  return (
    <Col xl="3" lg="5" sm="6">
      <Card>
        <CommonCardHeader headClass="card-no-border pb-0" mainTitle={true} firstItem="Weekly" secondItem="Monthly" thirdItem="Yearly" title={RevenueByCategorys} />
        <CardBody className="revenue-category">
          <ReactApexChart id="chart" options={revenueChartData} series={revenueChartData.series} type="donut" height={350} />
        </CardBody>
      </Card>
    </Col>
  );
};

export default RevenueByCategory;
