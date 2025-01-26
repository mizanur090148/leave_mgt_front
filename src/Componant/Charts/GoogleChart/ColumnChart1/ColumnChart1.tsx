import { Card, CardBody, Col } from "reactstrap";
import CommonCardHeader from "../../../../CommonElements/CommonCardHeader/CommonCardHeader";
import { ColumnChartOne } from "../../../../utils/Constant";
import Chart from 'react-google-charts'
import { columnChartData, columnChartDataOption } from "../../../../Data/Charts/GoogleChart/GoogleChartData";

const ColumnChart1 = () => {
  return (
    <Col sm="12" xl="6" className="box-col-6">
      <Card>
        <CommonCardHeader title={ColumnChartOne} />
        <CardBody className="chart-block">
          <div className="chart-overflow" id="column-chart1">
            <Chart
              chartType="Bar"
              width="100%"
              height="400px"
              data={columnChartData}
              options={columnChartDataOption}
            />
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ColumnChart1;
