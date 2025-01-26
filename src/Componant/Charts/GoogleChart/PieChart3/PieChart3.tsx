import Chart from 'react-google-charts'
import { Card, CardBody, Col } from 'reactstrap'
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader'
import { PieChartThree } from '../../../../utils/Constant'
import { pieChartThreeData, pieChartThreeDataOption } from '../../../../Data/Charts/GoogleChart/GoogleChartData'

const PieChart3 = () => {
  return (
    <Col sm="12" xl="6" className="box-col-6">
      <Card>
        <CommonCardHeader title={PieChartThree} />
        <CardBody className="chart-block">
          <div className="chart-overflow" id="pie-chart4">
            <Chart chartType="PieChart" width="100%" height="300px" data={pieChartThreeData} options={pieChartThreeDataOption} />
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default PieChart3