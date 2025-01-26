import { Bar } from "react-chartjs-2";
import { Card, CardBody, Col } from 'reactstrap'
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader'
import { ChartJSBarChart } from '../../../../utils/Constant'
import { chartJsBarChartData, chartJsBarChartDataOption } from "../../../../Data/Charts/ChartJs/ChartJs";

const BarChart = () => {
  return (
    <Col xl="6" ms="12" className="box-col-6">
      <Card>
        <CommonCardHeader title={ChartJSBarChart} />
        <CardBody className="chart-block">
            <Bar id="myBarGraph" data={chartJsBarChartData} options={chartJsBarChartDataOption} width={778} height={400} />
        </CardBody>
      </Card>
    </Col>
  )
}

export default BarChart