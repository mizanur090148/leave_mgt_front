import { Card, CardBody, Col } from "reactstrap";
import CommonCardHeader from "../../../../CommonElements/CommonCardHeader/CommonCardHeader";
import { ProjectsOverviews } from "../../../../utils/Constant";
import ReactApexChart from "react-apexcharts";
import { orderChart, projectChart } from "../../../../Data/Dashboard/DefaultChartData";

const ProjectsOverview = () => {
  return (
    <Col xl="5" className="col-xl-50 proorder-md-5">
      <Card>
        <CommonCardHeader headClass="card-no-border pb-0" title={ProjectsOverviews} mainTitle={true} firstItem="Weekly" secondItem="Monthly" thirdItem="Yearly" />
        <CardBody className="pb-0">
          <div className="current-sale-container order-container">
            <ReactApexChart className="overview-wrapper" id="orderoverview" options={projectChart} series={projectChart.series} />
            <div className="back-bar-container">
              <ReactApexChart id="order-bar" options={orderChart} series={orderChart.series} height={180} type="bar" />
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ProjectsOverview;
