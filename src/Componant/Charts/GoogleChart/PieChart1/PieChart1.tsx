import Chart from 'react-google-charts'
import { Card, CardBody, Col } from 'reactstrap'
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader'
import { PieChartOne } from '../../../../utils/Constant'
import { pieOneChartData, pieOneChartDataOption } from '../../../../Data/Charts/GoogleChart/GoogleChartData'

const PieChart1 = () => {
  return (
    <Col sm="12" xl="6" className="box-col-6">
      <Card>
        <CommonCardHeader title={PieChartOne} />
        <CardBody className="chart-block">
          <div className="chart-overflow" id="pie-chart1">
            <Chart chartType="PieChart" width="100%" height="300px" data={pieOneChartData} options={pieOneChartDataOption} />
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default PieChart1