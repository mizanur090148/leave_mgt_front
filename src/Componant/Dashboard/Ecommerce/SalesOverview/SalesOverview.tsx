import { Card, CardBody, Col } from "reactstrap";
import CommonCardHeader from "../../../../CommonElements/CommonCardHeader/CommonCardHeader";
import { SalesOverviews } from "../../../../utils/Constant";
import ReactApexChart from "react-apexcharts";
import { salesOverviewChart } from "../../../../Data/Dashboard/DefaultChartData";

const SalesOverview = () => {
  return (
    <Col xxl="5" xl="4" lg="7" sm="12">
      <Card>
        <CommonCardHeader headClass="card-no-border pb-0" title={SalesOverviews} mainTitle={true} firstItem="Weekly" secondItem="Monthly" thirdItem="Yearly" /> 
        <CardBody className="pt-0">
          <ReactApexChart id="salse-overview" options={salesOverviewChart} series={salesOverviewChart.series} type="rangeBar" height={350} />
        </CardBody>
      </Card>
    </Col>
  );
};

export default SalesOverview;
