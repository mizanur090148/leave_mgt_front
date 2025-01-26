import { Card, CardBody, Col } from "reactstrap";
import CommonCardHeader from "../../../../CommonElements/CommonCardHeader/CommonCardHeader";
import { Schedules } from "../../../../utils/Constant";
import ReactApexChart from "react-apexcharts";
import { scheduleChart } from "../../../../Data/Dashboard/DefaultChartData";

const Schedule = () => {
  return (
    <Col xxl="5" xl="6" className="box-col-6 proorder-md-9">
      <Card>
        <CommonCardHeader headClass="card-no-border pb-0" mainTitle={true} title={Schedules} firstItem="Weekly" secondItem="Monthly" thirdItem="Yearly" />
        <CardBody className="schedult-calendar pt-0">
          <div className="schedule-container">
            <ReactApexChart id="schedulechart" options={scheduleChart} series={scheduleChart.series} type="rangeBar" height={355} />
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default Schedule;
