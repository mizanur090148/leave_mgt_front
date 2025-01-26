import { Card, CardBody, Col } from 'reactstrap'
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader'
import { BarChartTwo } from '../../../../utils/Constant'
import Chart from 'react-google-charts'
import { barOneChartData, barOneChartDataOption } from '../../../../Data/Charts/GoogleChart/GoogleChartData'

const BarChart2 = () => {
  return (
    <Col sm="12" xl="6" className="box-col-12">
      <Card>
        <CommonCardHeader title={BarChartTwo} />
        <CardBody className="chart-block">
          <div className="chart-overflow" id="bar-chart2">
            <Chart chartType="BarChart" width="100%" height="400px" data={barOneChartData} options={barOneChartDataOption} />
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default BarChart2