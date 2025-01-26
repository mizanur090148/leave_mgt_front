import Chart from 'react-google-charts'
import { Card, CardBody, Col } from 'reactstrap'
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader'
import { PieChartFour } from '../../../../utils/Constant'
import { pieChartForthData, pieChartForthDataOption } from '../../../../Data/Charts/GoogleChart/GoogleChartData'

const PieChart4 = () => {
  return (
    <Col sm="12" xl="6" className="box-col-6">
      <Card>
        <CommonCardHeader title={PieChartFour} />
        <CardBody className="chart-block">
          <div className="chart-overflow" id="pie-chart2">
            <Chart chartType="PieChart" width="100%" height="300px" data={pieChartForthData} options={pieChartForthDataOption} />
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default PieChart4