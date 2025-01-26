import { Card, CardBody, Col } from 'reactstrap'
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader'
import { LineCharts } from '../../../../utils/Constant'
import Chart from 'react-google-charts'
import { lineChartData, lineChartDataOption } from '../../../../Data/Charts/GoogleChart/GoogleChartData'

const LineChart = () => {
  return (
    <Col sm="12" className="box-col-12">
      <Card>
        <CommonCardHeader title={LineCharts} />
        <CardBody className="chart-block">
          <div className="chart-overflow" id="line-chart">
            <Chart chartType="Line" width="100%" height="500px" data={lineChartData} options={lineChartDataOption} />
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default LineChart