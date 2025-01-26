import { Card, CardBody, Col } from "reactstrap";
import CommonCardHeader from "../../../../CommonElements/CommonCardHeader/CommonCardHeader";
import { ActivelyHour } from "../../../../utils/Constant";
import ReactApexChart from "react-apexcharts";
import { activelyHoursChart } from "../../../../Data/Dashboard/DefaultChartData";

const ActivelyHours = () => {
  return (
    <Col xxl="4" xl="7" md="6" className="box-col-7 proorder-md-3">
      <Card>
        <CommonCardHeader headClass="card-no-border pb-0" mainTitle={true} title={ActivelyHour} firstItem="Weekly" secondItem="Monthly" thirdItem="Yearly" />
        <CardBody>
          <ReactApexChart id="actively-hours" options={activelyHoursChart} series={activelyHoursChart.series} type="bar" height={345} />
        </CardBody>
      </Card>
    </Col>
  );
};

export default ActivelyHours;
