import { CardBody, Col, Row } from "reactstrap";
import { shiftsOverviewData } from "../../../../Data/Dashboard/DefaultData";
import { H6 } from "../../../../AbstractElements";
import ReactApexChart from "react-apexcharts";
import { shiftsOptionChart } from "../../../../Data/Dashboard/DefaultChartData";

const ShiftsOverviewBody = () => {
  return (
    <CardBody>
      <Row>
        <Col xs="5">
          <ReactApexChart
            className="overview"
            id="shifts-overview"
            options={shiftsOptionChart}
            series={shiftsOptionChart.series}
            height={200}
            type="donut"
          />
        </Col>
        <Col xs="7" className="shifts-overview">
          {shiftsOverviewData.map((data: any, i: number) => (
            <div className="d-flex gap-2" key={i}>
              <div className="flex-shrink-0">
                <span className={`bg-${data.color}`}> </span>
              </div>
              <div className="flex-grow-1">
                <H6>{data.title}</H6>
              </div>
              <span>{data.count}</span>
            </div>
          ))}
        </Col>
      </Row>
    </CardBody>
  );
};

export default ShiftsOverviewBody;
