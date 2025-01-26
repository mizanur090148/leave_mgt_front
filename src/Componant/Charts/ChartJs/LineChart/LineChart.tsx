import { Line } from "react-chartjs-2";
import { Card, CardBody, Col } from 'reactstrap'
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader'
import { ChatJSLineChart } from '../../../../utils/Constant'
import { lineChartData, lineChartDataOption } from "../../../../Data/Charts/ChartJs/ChartJs";

const LineChart = () => {
  return (
    <Col xl="6" ms="12" className="box-col-6">
      <Card>
        <CommonCardHeader title={ChatJSLineChart} />
        <CardBody className="chart-block">
          <Line id="myLineCharts" data={lineChartData} options={lineChartDataOption} width={778} height={400} />
        </CardBody>
      </Card>
    </Col>
  )
}

export default LineChart