import { Card, CardBody, Col } from 'reactstrap'
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader'
import { PieCharts } from '../../../../utils/Constant'
import ReactApexChart from 'react-apexcharts'
import { pieChartData } from '../../../../Data/Charts/ApexChart/ApexChartData'

const PieChart = () => {
  return (
    <Col sm="12" xl="6" className="box-col-6">
      <Card>
        <CommonCardHeader title={PieCharts} />
        <CardBody>
          <div id="piechart">
            <ReactApexChart options={pieChartData} series={pieChartData.series} type="pie" height={300} />
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default PieChart